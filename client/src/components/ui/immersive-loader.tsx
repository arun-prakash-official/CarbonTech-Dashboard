import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ImmersiveLoaderProps {
  onComplete: () => void;
}

export default function ImmersiveLoader({ onComplete }: ImmersiveLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);

  const loadingTexts = [
    "Initializing Carbon Analytics...",
    "Loading Sustainability Data...",
    "Optimizing Dashboard...",
    "Ready to Transform",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setLoadingStage((prev) => (prev + 1) % loadingTexts.length);
    }, 1000);

    return () => clearInterval(stageInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20"
          style={{
            backgroundSize: "400% 400%",
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute w-2 h-2 bg-primary/30 rounded-full blur-sm"
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-blue-500 rounded-2xl flex items-center justify-center relative">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-2xl border-2 border-primary/30"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-white text-2xl font-bold"
            >
              CT
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
        >
          CarbonTech
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          key={loadingStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-muted-foreground mb-8"
        >
          {loadingTexts[loadingStage]}
        </motion.p>

        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full relative"
            >
              <motion.div
                animate={{
                  x: [-20, 300],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 h-full w-20 bg-white/30 rounded-full blur-sm"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-muted-foreground mt-2"
          >
            {progress}%
          </motion.div>
        </div>

        {/* Pulse Effect */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-3xl -z-10"
        />
      </div>
    </motion.div>
  );
}