'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Carbon Credit และ Sustainability symbols
const sustainabilitySymbols = [
  // Leaf
  'M5,25 Q25,5 45,25 Q35,35 25,30 Q15,35 5,25 Z M25,30 Q25,15 35,20',
  // Tree
  'M25,45 L25,25 M15,25 Q25,15 35,25 M10,30 Q25,20 40,30 M8,35 Q25,25 42,35',
  // Recycling arrows
  'M15,10 Q5,15 10,25 L15,20 M35,10 Q45,15 40,25 L35,20 M25,35 Q15,40 20,50 L25,45 M25,35 Q35,40 30,50 L25,45',
  // CO2 molecule with reduction arrow
  'M10,20 L20,20 L30,20 M20,10 L20,30 M35,15 L45,25 L35,35',
  // Globe/Earth
  'M25,5 Q45,25 25,45 Q5,25 25,5 Z M25,5 Q35,15 25,25 Q15,35 25,45 M5,25 L45,25',
  // Wind turbine
  'M25,45 L25,25 M25,15 L20,10 M25,15 L30,10 M25,15 L25,5',
  // Solar panel
  'M10,20 L40,20 L40,30 L10,30 Z M15,22 L20,22 M25,22 L30,22 M35,22 L35,22 M15,26 L35,26',
  // Carbon footprint
  'M20,30 Q15,25 20,20 Q25,25 30,20 Q35,25 30,30 Q25,35 20,30 Z M25,20 L25,30'
];

export default function CarbonCreditBackground() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // จำนวน elements ที่เหมาะสม
  const elementCount = Math.min(Math.floor((windowSize.width * windowSize.height) / 85000), 14);
  
  const elements = useMemo(() => {
    if (elementCount <= 0) return [];
    
    return Array.from({ length: elementCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.4,
      rotation: Math.random() * 360,
      duration: Math.random() * 60 + 40,
      delay: Math.random() * 15,
      path: sustainabilitySymbols[i % sustainabilitySymbols.length],
      // Professional green color palette for carbon credit theme
      color: i % 4 === 0 ? '#166534' : // Dark green
             i % 4 === 1 ? '#059669' : // Emerald
             i % 4 === 2 ? '#0d9488' : // Teal
             '#15803d', // Green
      opacity: Math.random() * 0.12 + 0.04,
    }));
  }, [elementCount]);

  // Floating particles (representing carbon molecules being captured)
  const particles = useMemo(() => {
    const count = Math.min(Math.floor((windowSize.width * windowSize.height) / 45000), 18);
    return Array.from({ length: count }).map((_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 25 + 25,
      delay: Math.random() * 8,
      color: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#06b6d4' : '#14b8a6',
    }));
  }, [windowSize.width, windowSize.height]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40" />
      
      {/* Sustainability symbols */}
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            opacity: element.opacity,
          }}
          initial={{ 
            scale: element.scale, 
            rotate: element.rotation,
          }}
          animate={{
            x: [
              0,
              Math.random() * 30 - 15,
              Math.random() * 30 - 15,
              0,
            ],
            y: [
              0,
              Math.random() * 30 - 15,
              Math.random() * 30 - 15,
              0,
            ],
            rotate: [element.rotation, element.rotation + 8, element.rotation - 8, element.rotation],
            scale: [element.scale, element.scale * 1.1, element.scale * 0.9, element.scale],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={element.path} stroke={element.color} strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>
        </motion.div>
      ))}
      
      {/* Carbon particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            backgroundColor: particle.color,
            opacity: 0.15,
          }}
          animate={{
            x: [
              0,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              0,
            ],
            y: [
              0,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              0,
            ],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Subtle grid pattern for professional look */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(5, 150, 105, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5, 150, 105, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Professional overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-emerald-100/10" />
      
      {/* Bottom fade for content readability */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/30 to-transparent" />
    </div>
  );
}