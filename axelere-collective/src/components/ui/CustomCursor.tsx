'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useMotionValue(-100);
  const followerY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const followerSpringX = useSpring(followerX, { damping: 35, stiffness: 120 });
  const followerSpringY = useSpring(followerY, { damping: 35, stiffness: 120 });

  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [data-cursor="hover"]');
      if (isInteractive && followerRef.current && dotRef.current) {
        followerRef.current.style.transform = 'scale(2)';
        followerRef.current.style.borderColor = 'rgba(201, 185, 154, 0.6)';
        dotRef.current.style.opacity = '0';
      }
    };

    const handleMouseOut = () => {
      if (followerRef.current && dotRef.current) {
        followerRef.current.style.transform = 'scale(1)';
        followerRef.current.style.borderColor = 'rgba(201, 185, 154, 0.4)';
        dotRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <>
      {/* Main dot cursor */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] transition-opacity duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#c9b99a',
        }}
      />
      {/* Follower ring */}
      <motion.div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9998] transition-all duration-200"
        style={{
          x: followerSpringX,
          y: followerSpringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'rgba(201, 185, 154, 0.4)',
        }}
      />
    </>
  );
}
