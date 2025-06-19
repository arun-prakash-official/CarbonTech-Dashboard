import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ProgressBar from "@/components/ui/progress-bar";
import GlassCard from "@/components/ui/glass-card";
import WaterRipple from "@/components/ui/water-ripple";

interface StatCard {
  title: string;
  value: string;
  unit: string;
  change: string;
  changeDirection: "up" | "down";
  data: Array<{ year: string; value: string; percentage: number }>;
  color: string;
  actionText: string;
  actionIcon: typeof ArrowRight | typeof Download;
}

export default function PortfolioStats() {
  const stats: StatCard[] = [
    {
      title: "Managed portfolio carbon footprint",
      value: "45,048",
      unit: "tCO₂e",
      change: "16%",
      changeDirection: "down",
      data: [
        { year: "2022", value: "45,048", percentage: 95 },
        { year: "2021", value: "14,111", percentage: 30 },
        { year: "2020", value: "32,813", percentage: 65 },
        { year: "2019", value: "38,673", percentage: 75 },
      ],
      color: "from-red-500 to-red-600",
      actionText: "See full breakdown of carbon footprint",
      actionIcon: ArrowRight,
    },
    {
      title: "Managed portfolio energy intensity",
      value: "123",
      unit: "kWh/m²",
      change: "22%",
      changeDirection: "down",
      data: [
        { year: "2022", value: "123", percentage: 78 },
        { year: "2021", value: "128", percentage: 82 },
        { year: "2020", value: "135", percentage: 85 },
        { year: "2019", value: "157", percentage: 100 },
      ],
      color: "from-primary to-primary/80",
      actionText: "Download the data",
      actionIcon: Download,
    },
    {
      title: "Managed portfolio energy consumption",
      value: "47,790,662",
      unit: "kWh",
      change: "27%",
      changeDirection: "down",
      data: [
        { year: "2022", value: "47,790,662", percentage: 73 },
        { year: "2021", value: "49,324,077", percentage: 76 },
        { year: "2020", value: "48,784,205", percentage: 75 },
        { year: "2019", value: "65,198,706", percentage: 100 },
      ],
      color: "from-blue-500 to-blue-600",
      actionText: "Download the data",
      actionIcon: Download,
    },
  ];

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Portfolio Statistics
          </h2>
          <p className="text-xl text-muted-foreground">
            Track your managed portfolio performance across key metrics
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                rotateY: 2,
                scale: 1.02,
              }}
              className="group"
            >
              <WaterRipple
                intensity="medium"
                color="rgba(139, 92, 246, 0.6)"
                className="h-full"
              >
                <GlassCard className="p-8 h-full hover-lift hover-glow cursor-pointer">
                <div className="mb-6">
                  <motion.h3 
                    className="text-lg font-semibold text-muted-foreground mb-2"
                    whileHover={{ x: 3, color: "hsl(263, 85%, 68%)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {stat.title}
                  </motion.h3>
                  <div className="flex items-baseline space-x-2">
                    <motion.span 
                      className="text-4xl font-bold"
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.value.length > 10 
                        ? `${(parseInt(stat.value) / 1000000).toFixed(1)}M`
                        : stat.value
                      }
                    </motion.span>
                    <motion.span 
                      className="text-sm text-muted-foreground"
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.unit}
                    </motion.span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-muted-foreground">from 2019</span>
                    <motion.span 
                      className="text-sm text-destructive"
                      whileHover={{ scale: 1.2, x: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      ↓ {stat.change}
                    </motion.span>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4 mb-6">
                  {stat.data.map((item) => (
                    <div key={item.year}>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>{item.year}</span>
                        <span>
                          {item.value.length > 10
                            ? `${(parseInt(item.value) / 1000000).toFixed(1)}M`
                            : item.value
                          }
                        </span>
                      </div>
                      <ProgressBar
                        value={item.percentage}
                        className={`bg-gradient-to-r ${stat.color}`}
                      />
                    </div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ x: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 p-0 h-auto group"
                  >
                    <motion.span 
                      className="text-sm"
                      whileHover={{ x: 2 }}
                    >
                      {stat.actionText}
                    </motion.span>
                    <motion.div
                      whileHover={{ x: 3, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <stat.actionIcon className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
                </GlassCard>
              </WaterRipple>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
