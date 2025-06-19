import { useState } from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends ButtonProps {
  children: React.ReactNode;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function RippleButton({ children, className, onClick, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    // Call original onClick if provided
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button
      {...props}
      className={cn("relative overflow-hidden", className)}
      onClick={createRipple}
    >
      {children}
      
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </Button>
  );
}