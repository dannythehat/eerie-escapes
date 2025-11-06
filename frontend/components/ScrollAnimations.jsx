'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Parallax scroll effect component
 * Wraps content and applies parallax transformation based on scroll position
 */
export function ParallaxSection({ children, speed = 0.5, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Fade in on scroll component
 * Fades in and moves up when element enters viewport
 */
export function FadeInOnScroll({ children, delay = 0, duration = 0.6, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale on scroll component
 * Scales up when element enters viewport
 */
export function ScaleOnScroll({ children, delay = 0, duration = 0.6, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide in from side component
 * Slides in from left or right when entering viewport
 */
export function SlideInOnScroll({ 
  children, 
  direction = 'left', 
  delay = 0, 
  duration = 0.6, 
  className = '' 
}) {
  const x = direction === 'left' ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger children animation
 * Animates children with staggered delays
 */
export function StaggerContainer({ children, staggerDelay = 0.1, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Rotate on scroll component
 * Rotates element based on scroll progress
 */
export function RotateOnScroll({ children, rotation = 360, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotation]);

  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Blur on scroll component
 * Applies blur effect based on scroll position
 */
export function BlurOnScroll({ children, maxBlur = 10, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, maxBlur, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ filter: blur.get() ? `blur(${blur.get()}px)` : 'none' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Reveal on scroll component
 * Reveals content with a sliding mask effect
 */
export function RevealOnScroll({ children, direction = 'up', className = '' }) {
  const clipPath = {
    up: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0 0 0 0)',
    },
    down: {
      hidden: 'inset(0 0 100% 0)',
      visible: 'inset(0 0 0 0)',
    },
    left: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0 0 0)',
    },
    right: {
      hidden: 'inset(0 0 0 100%)',
      visible: 'inset(0 0 0 0)',
    },
  };

  return (
    <motion.div
      initial={{ clipPath: clipPath[direction].hidden }}
      whileInView={{ clipPath: clipPath[direction].visible }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
