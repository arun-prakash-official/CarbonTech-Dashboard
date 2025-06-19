import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export default function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className={cn("h-2 rounded-full transition-all duration-500", className)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
