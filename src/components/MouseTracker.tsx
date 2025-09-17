import { useEffect, useState } from 'react';

export const MouseTracker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-screen opacity-60"
      style={{
        left: mousePosition.x - 75,
        top: mousePosition.y - 75,
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.3), rgba(0, 0, 0, 0) 70%)',
        borderRadius: '50%',
        transform: 'translate3d(0, 0, 0)',
        transition: 'opacity 0.3s ease',
        animation: 'pulse 2s infinite'
      }}
    />
  );
};