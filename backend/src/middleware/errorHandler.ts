import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Handle AppError (custom errors)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    });
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    
    // Unique constraint violation
    if (prismaError.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: {
          message: 'A record with this value already exists',
          code: 'DUPLICATE_ENTRY',
          field: prismaError.meta?.target?.[0],
        },
      });
    }

    // Record not found
    if (prismaError.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Record not found',
          code: 'NOT_FOUND',
        },
      });
    }

    // Foreign key constraint violation
    if (prismaError.code === 'P2003') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid reference to related record',
          code: 'INVALID_REFERENCE',
        },
      });
    }
  }

  // Handle validation errors (Joi)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: (err as any).details,
      },
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid token',
        code: 'INVALID_TOKEN',
      },
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Token expired',
        code: 'TOKEN_EXPIRED',
      },
    });
  }

  // Default error response
  const statusCode = 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
