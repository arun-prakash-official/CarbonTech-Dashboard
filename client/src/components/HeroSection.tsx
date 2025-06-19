import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Carbon Analytics
          </span>
          <br />
          Dashboard
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8"
        >
          Transform your sustainability journey with intelligent carbon tracking and portfolio management
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-2xl transition-all transform hover:scale-105 ripple-container"
          >
            Start Tracking
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            View Demo
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="h-6 w-6 text-primary" />
      </motion.div>
    </section>
  );
}
