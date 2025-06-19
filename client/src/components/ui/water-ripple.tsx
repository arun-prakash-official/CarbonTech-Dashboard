import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaterRippleProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  intensity?: "light" | "medium" | "strong";
  color?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function WaterRipple({ 
  children, 
  className, 
  disabled = false, 
  intensity = "medium",
  color = "rgba(139, 92, 246, 0.4)"
}: WaterRippleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const intensityConfig = {
    light: { maxRipples: 3, duration: 1500, maxSize: 100 },
    medium: { maxRipples: 5, duration: 2000, maxSize: 150 },
    strong: { maxRipples: 8, duration: 2500, maxSize: 200 }
  };

  const config = intensityConfig[intensity];

  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const size = Math.random() * (config.maxSize - 50) + 50;
    
    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };
    
    setRipples(prev => {
      const updated = [...prev, newRipple];
      // Limit number of ripples for performance
      return updated.slice(-config.maxRipples);
    });
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, config.duration);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={createRipple}
      style={{ isolation: "isolate" }}
    >
      {children}
      
      {/* Water Ripple Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ 
              scale: 0, 
              opacity: 0.8,
              rotate: 0,
            }}
            animate={{ 
              scale: [0, 1, 1.5, 2],
              opacity: [0.8, 0.6, 0.3, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: config.duration / 1000,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.3, 0.7, 1]
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              boxShadow: `0 0 ${ripple.size * 0.3}px ${color}`,
              filter: "blur(1px)",
            }}
          />
        ))}
        
        {/* Secondary Wave Effect */}
        {ripples.map((ripple) => (
          <motion.div
            key={`wave-${ripple.id}`}
            initial={{ 
              scale: 0, 
              opacity: 0.4,
            }}
            animate={{ 
              scale: [0, 0.8, 1.8, 3],
              opacity: [0.4, 0.2, 0.1, 0],
            }}
            transition={{ 
              duration: (config.duration / 1000) * 1.5,
              ease: "easeOut",
              delay: 0.1,
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - (ripple.size * 1.5) / 2,
              top: ripple.y - (ripple.size * 1.5) / 2,
              width: ripple.size * 1.5,
              height: ripple.size * 1.5,
              border: `1px solid ${color}`,
              filter: "blur(2px)",
            }}
          />
        ))}
      </div>
    </div>
  );
}