import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ImmersiveLoaderProps {
  onComplete: () => void;
}

export default function ImmersiveLoader({ onComplete }: ImmersiveLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);

  const stages = [
    { text: "CARBON", subtext: "Initializing Analytics" },
    { text: "TECH", subtext: "Loading Data Systems" },
    { text: "DASHBOARD", subtext: "Optimizing Interface" },
    { text: "READY", subtext: "Launching Experience" },
  ];

  useEffect(() => {
    // Initial delay before showing content
    setTimeout(() => setShowMainContent(true), 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 1500);
          return 100;
        }
        return prev + 1.2;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        const next = (prev + 1) % stages.length;
        return next;
      });
    }, 1200);

    return () => clearInterval(stageInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)"
      }}
      transition={{ duration: 1.2, ease: [0.6, 0, 0.4, 1] }}
      className="fixed inset-0 z-50 bg-background overflow-hidden"
    >
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, hsl(263, 85%, 68%, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, hsl(217, 91%, 60%, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, hsl(339, 82%, 65%, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, hsl(263, 85%, 68%, 0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        />

        {/* Floating Geometric Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 0.6, 0],
              rotate: [0, 180, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            className={`absolute w-3 h-3 ${
              i % 3 === 0 ? 'bg-primary/40' : 
              i % 3 === 1 ? 'bg-blue-500/40' : 'bg-purple-500/40'
            } ${
              i % 4 === 0 ? 'rounded-full' :
              i % 4 === 1 ? 'rounded-none rotate-45' :
              i % 4 === 2 ? 'rounded-sm' : 'rounded-full'
            } blur-sm`}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {showMainContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8, ease: [0.6, 0, 0.4, 1] }}
              className="text-center max-w-2xl mx-auto px-6"
            >
              {/* Large Typography */}
              <div className="mb-16">
                <motion.div
                  key={currentStage}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 1.2 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.6, 0, 0.4, 1],
                    type: "spring",
                    stiffness: 100
                  }}
                  className="mb-4"
                >
                  <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {stages[currentStage].text}
                    </span>
                  </h1>
                </motion.div>

                <motion.p
                  key={`${currentStage}-sub`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg md:text-xl text-muted-foreground font-light tracking-wide"
                >
                  {stages[currentStage].subtext}
                </motion.p>
              </div>

              {/* Progress Section */}
              <div className="space-y-8">
                {/* Minimal Progress Bar */}
                <div className="relative">
                  <div className="w-full h-0.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ 
                        width: `${progress}%`,
                        opacity: 1
                      }}
                      transition={{ 
                        width: { duration: 0.5, ease: "easeOut" },
                        opacity: { duration: 0.3 }
                      }}
                      className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full relative"
                    >
                      {/* Glowing Effect */}
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-full blur-sm"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Progress Percentage */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex justify-center"
                >
                  <span className="text-sm font-mono text-muted-foreground tracking-wider">
                    {Math.floor(progress).toString().padStart(2, '0')}%
                  </span>
                </motion.div>

                {/* Loading Dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="flex justify-center space-x-2"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                      className="w-1 h-1 bg-primary rounded-full"
                    />
                  ))}
                </motion.div>
              </div>

              {/* Ambient Glow Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-blue-500/20 rounded-full blur-3xl -z-10"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-8 left-8 w-16 h-16 border border-primary/30 rounded-lg"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 right-8 w-12 h-12 border border-blue-500/30 rounded-full"
      />
    </motion.div>
  );
}