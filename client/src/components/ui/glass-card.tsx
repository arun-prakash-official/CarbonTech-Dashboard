import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn("glass-effect rounded-xl hover:shadow-2xl transition-all duration-300", className)}>
      {children}
    </div>
  );
}
