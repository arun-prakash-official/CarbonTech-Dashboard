import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const nextRippleId = useRef(0);
  const hoverIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const createRipple = useCallback((x: number, y: number) => {
    if (disabled || !containerRef.current) return;

    const size = intensity === "light" ? 60 : intensity === "medium" ? 100 : 140;
    
    const newRipple: Ripple = {
      id: nextRippleId.current++,
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1500);
  }, [disabled, intensity]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    handleMouseMove(event);
    
    // Create continuous ripples during hover
    hoverIntervalRef.current = setInterval(() => {
      const randomOffset = 25;
      const offsetX = (Math.random() - 0.5) * randomOffset;
      const offsetY = (Math.random() - 0.5) * randomOffset;
      createRipple(mousePos.x + offsetX, mousePos.y + offsetY);
    }, 300);
  }, [createRipple, mousePos.x, mousePos.y, handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current);
      hoverIntervalRef.current = null;
    }
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Create burst of ripples for click
    createRipple(x, y);
    setTimeout(() => createRipple(x, y), 80);
    setTimeout(() => createRipple(x, y), 160);
  }, [createRipple]);

  useEffect(() => {
    return () => {
      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ position: "relative" }}
    >
      {children}
      
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              border: `2px solid ${color}`,
              backgroundColor: `${color}20`,
            }}
            initial={{
              scale: 0,
              opacity: 0.8,
            }}
            animate={{
              scale: [0, 1, 2.5],
              opacity: [0.8, 0.5, 0],
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.2, 1],
            }}
          />
        ))}
      </AnimatePresence>

      {/* Real-time hover glow effect */}
      {isHovering && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, ${color} 0%, transparent 50%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}