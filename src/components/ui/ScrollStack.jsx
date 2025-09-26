import React, { useEffect, useRef } from 'react';

const ScrollStack = ({ children, offset = 50 }) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      itemRefs.current.forEach((item, index) => {
        if (item) {
          const y = index * offset - progress * offset * (itemRefs.current.length - 1);
          item.style.transform = `translateY(${y}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return (
    <div ref={containerRef} className="relative h-screen">
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          className="absolute inset-0"
          style={{ zIndex: React.Children.count(children) - index }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;