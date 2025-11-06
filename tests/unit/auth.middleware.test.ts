import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, UserRole } from '@prisma/client';
import {
  authenticate,
  authorize,
  authorizeOwnerOrAdmin,
  optionalAuth,
} from '../../src/middleware/auth.middleware';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      findUnique: jest.fn(),
    },
    holiday: {
      findUnique: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
    UserRole: {
      USER: 'USER',
      PARTNER: 'PARTNER',
      ADMIN: 'ADMIN',
    },
  };
});

// Mock jsonwebtoken
jest.mock('jsonwebtoken');

const prisma = new PrismaClient();

describe('Authentication Middleware Unit Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
      params: {},
      user: undefined,
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('should authenticate valid token', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        role: UserRole.USER,
        isActive: true,
        partner: null,
      };

      mockRequest.headers = {
        authorization: 'Bearer valid-token',
      };

      (jwt.verify as jest.Mock).mockReturnValue({
        userId: 'user-123',
        email: 'test@example.com',
        role: UserRole.USER,
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(jwt.verify).toHaveBeenCalled();
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        include: { partner: { select: { id: true } } },
      });
      expect(mockRequest.user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        role: UserRole.USER,
        partnerId: undefined,
      });
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should reject missing authorization header', async () => {
      mockRequest.headers = {};

      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: expect.stringContaining('Authentication required'),
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject invalid token format', async () => {
      mockRequest.headers = {
        authorization: 'InvalidFormat token',
      };

      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject expired token', async () => {
      mockRequest.headers = {
        authorization: 'Bearer expired-token',
      };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new jwt.TokenExpiredError('Token expired', new Date());
      });

      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token expired.',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject invalid token', async () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid-token',
      };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new jwt.JsonWebTokenError('Invalid token');
      });

      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid token.',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject inactive user', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        role: UserRole.USER,
        isActive: false,
        partner: null,
      };

      mockRequest.headers = {
        authorization: 'Bearer valid-token',
      };

      (jwt.verify as jest.Mock).mockReturnValue({
        userId: 'user-123',
        email: 'test@example.com',
        role: UserRole.USER,
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid or expired token.',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should attach partnerId for partner users', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'partner@example.com',
        role: UserRole.PARTNER,
        isActive: true,
        partner: { id: 'partner-456' },
      };

      mockRequest.headers = {
        authorization: 'Bearer valid-token',
      };

      (jwt.verify as jest.Mock).mockReturnValue({
        userId: 'user-123',
        email: 'partner@example.com',
        role: UserRole.PARTNER,
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockRequest.user?.partnerId).toBe('partner-456');
      expect(nextFunction).toHaveBeenCalled();
    });
  });

  describe('authorize', () => {
    it('should allow user with correct role', () => {
      mockRequest.user = {
        id: 'user-123',
        email: 'admin@example.com',
        role: UserRole.ADMIN,
      };

      const middleware = authorize(UserRole.ADMIN);
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should allow user with one of multiple allowed roles', () => {
      mockRequest.user = {
        id: 'user-123',
        email: 'partner@example.com',
        role: UserRole.PARTNER,
      };

      const middleware = authorize(UserRole.ADMIN, UserRole.PARTNER);
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should reject user without authentication', () => {
      mockRequest.user = undefined;

      const middleware = authorize(UserRole.ADMIN);
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Authentication required.',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject user with insufficient permissions', () => {
      mockRequest.user = {
        id: 'user-123',
        email: 'user@example.com',
        role: UserRole.USER,
      };

      const middleware = authorize(UserRole.ADMIN);
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Insufficient permissions.',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });
  });

  describe('authorizeOwnerOrAdmin', () => {
    it('should allow admin to access any resource', async () => {
      mockRequest.user = {
        id: 'admin-123',
        email: 'admin@example.com',
        role: UserRole.ADMIN,
      };
      mockRequest.params = { id: 'holiday-123' };

      const middleware = authorizeOwnerOrAdmin('partnerId');
      await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect(prisma.holiday.findUnique).not.toHaveBeenCalled();
    });

    it('should allow partner to access own resource', async () => {
      mockRequest.user = {
        id: 'partner-user-123',
        email: 'partner@example.com',
        role: UserRole.PARTNER,
        partnerId: 'partner-456',
      };
      mockRequest.params = { id: 'holiday-123' };

      (prisma.holiday.findUnique as jest.Mock).mockResolvedValue({
        id: 'holiday-123',
        partnerId: 'partner-456',
      });

      const middleware = authorizeOwnerOrAdmin('partnerId');
      await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(prisma.holiday.findUnique).toHaveBeenCalledWith({
        where: { id: 'holiday-123' },
        select: { partnerId: true },
      });
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should reject partner accessing another partner\'s resource', async () => {
      mockRequest.user = {
        id: 'partner-user-123',
        email: 'partner@example.com',
        role: UserRole.PARTNER,
        partnerId: 'partner-456',
      };
      mockRequest.params = { id: 'holiday-123' };

      (prisma.holiday.findUnique as jest.Mock).mockResolvedValue({
        id: 'holiday-123',
        partnerId: 'different-partner-789',
      });

      const middleware = authorizeOwnerOrAdmin('partnerId');
      await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'You can only modify your own holidays.',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject regular user', async () => {
      mockRequest.user = {
        id: 'user-123',
        email: 'user@example.com',
        role: UserRole.USER,
      };
      mockRequest.params = { id: 'holiday-123' };

      const middleware = authorizeOwnerOrAdmin('partnerId');
      await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Insufficient permissions.',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 404 for non-existent resource', async () => {
      mockRequest.user = {
        id: 'partner-user-123',
        email: 'partner@example.com',
        role: UserRole.PARTNER,
        partnerId: 'partner-456',
      };
      mockRequest.params = { id: 'non-existent' };

      (prisma.holiday.findUnique as jest.Mock).mockResolvedValue(null);

      const middleware = authorizeOwnerOrAdmin('partnerId');
      await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Holiday not found.',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });
  });

  describe('optionalAuth', () => {
    it('should attach user if valid token provided', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        role: UserRole.USER,
        isActive: true,
        partner: null,
      };

      mockRequest.headers = {
        authorization: 'Bearer valid-token',
      };

      (jwt.verify as jest.Mock).mockReturnValue({
        userId: 'user-123',
        email: 'test@example.com',
        role: UserRole.USER,
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await optionalAuth(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockRequest.user).toBeDefined();
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should continue without user if no token provided', async () => {
      mockRequest.headers = {};

      await optionalAuth(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockRequest.user).toBeUndefined();
      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should continue without user if invalid token', async () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid-token',
      };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new jwt.JsonWebTokenError('Invalid token');
      });

      await optionalAuth(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockRequest.user).toBeUndefined();
      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
