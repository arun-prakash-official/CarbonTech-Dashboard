import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";

interface Work {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  isNew?: boolean;
  color: string;
}

export default function WorksShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const works: Work[] = [
    {
      id: "1",
      title: "Carbon Analytics Platform",
      category: "Sustainability Tech",
      description: "Advanced carbon tracking system with real-time monitoring and predictive analytics for enterprise sustainability management.",
      image: "/api/placeholder/600/400",
      isNew: true,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "2",
      title: "EcoMetrics Dashboard",
      category: "Data Visualization",
      description: "Comprehensive environmental impact dashboard featuring interactive charts and renewable energy tracking systems.",
      image: "/api/placeholder/600/400",
      isNew: true,
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "3",
      title: "Smart Energy Monitor",
      category: "IoT Solution",
      description: "Intelligent energy consumption monitoring with AI-powered optimization recommendations for commercial buildings.",
      image: "/api/placeholder/600/400",
      color: "from-purple-500 to-violet-600"
    },
    {
      id: "4",
      title: "Climate Impact Tracker",
      category: "Mobile App",
      description: "Personal carbon footprint tracking application with gamification elements and community challenges.",
      image: "/api/placeholder/600/400",
      color: "from-orange-500 to-red-600"
    }
  ];

  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-6 bg-gradient-to-br from-background via-card to-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ y, opacity }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
          >
            Featured Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our latest sustainability solutions and innovative climate tech projects
          </motion.p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Current Work Details */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              {works[currentIndex].isNew && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                >
                  NEW
                </motion.div>
              )}
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold"
              >
                {works[currentIndex].title}
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-primary font-medium"
              >
                {works[currentIndex].category}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-lg leading-relaxed"
              >
                {works[currentIndex].description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex space-x-4"
              >
                <Button className="bg-gradient-to-r from-primary to-blue-500 hover-glow group relative overflow-hidden">
                  <span>View Project</span>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
                
                <Button variant="outline" className="hover-lift">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side - Image with Ripple Effects */}
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group cursor-pointer"
              onClick={createRipple}
            >
              <GlassCard className="relative overflow-hidden rounded-2xl hover-lift">
                <div 
                  className={`aspect-[4/3] bg-gradient-to-br ${works[currentIndex].color} relative overflow-hidden`}
                >
                  {/* Parallax Background Pattern */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
                      `,
                      backgroundSize: "60px 60px",
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-white text-center"
                    >
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <ExternalLink className="h-8 w-8" />
                      </div>
                      <p className="text-lg font-semibold">{works[currentIndex].category}</p>
                    </motion.div>
                  </div>

                  {/* Ripple Effects */}
                  {ripples.map((ripple) => (
                    <motion.div
                      key={ripple.id}
                      initial={{ scale: 0, opacity: 0.6 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute w-20 h-20 bg-white rounded-full pointer-events-none"
                      style={{
                        left: ripple.x - 40,
                        top: ripple.y - 40,
                      }}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover-glow transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover-glow transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Thumbnail Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-4 overflow-x-auto pb-4"
        >
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(index)}
              className={`min-w-0 flex-shrink-0 cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${work.color} flex items-center justify-center relative overflow-hidden`}>
                {work.isNew && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                )}
                <span className="text-white text-xs font-semibold text-center px-2">
                  {work.category.split(' ')[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}