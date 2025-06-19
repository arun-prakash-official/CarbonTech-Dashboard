import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { carbonChartData } from "@/lib/chart-data";

export default function CarbonAnalytics() {
  const [activeFilters, setActiveFilters] = useState({
    type: ["Refurbishment", "New build"],
    status: ["Complete"]
  });

  const toggleFilter = (category: "type" | "status", value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <section id="analytics" className="py-20 px-6 bg-gradient-to-r from-background to-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Embodied Carbon Emissions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Intensity measured by kgCO₂e/m²</p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Filter by</span>
            </div>
            <div className="flex space-x-2">
              {["Refurbishment", "New build", "All"].map((filter) => (
                <Button
                  key={filter}
                  size="sm"
                  variant={
                    filter === "All" || activeFilters.type.includes(filter)
                      ? "default"
                      : "outline"
                  }
                  className={
                    filter === "All" || activeFilters.type.includes(filter)
                      ? "bg-destructive hover:bg-destructive/90"
                      : ""
                  }
                  onClick={() => {
                    if (filter === "All") {
                      setActiveFilters(prev => ({ ...prev, type: [] }));
                    } else {
                      toggleFilter("type", filter);
                    }
                  }}
                >
                  {filter}
                </Button>
              ))}
            </div>
            <div className="flex space-x-2 ml-8">
              <span className="text-sm text-muted-foreground">Status</span>
              {["Complete", "Estimate"].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={activeFilters.status.includes(status) ? "default" : "outline"}
                  className={
                    activeFilters.status.includes(status)
                      ? "bg-destructive hover:bg-destructive/90"
                      : ""
                  }
                  onClick={() => toggleFilter("status", status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chart Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-effect rounded-xl p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-primary" />
                <span className="text-sm">500 kgCO₂e/m² - Embodied Carbon Target 2030</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-primary/70" />
                <span className="text-sm">600 kgCO₂e/m² - Embodied Carbon Target 2025</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <span>Download the data</span>
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={carbonChartData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  domain={[0, 1000]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(240, 10%, 8%)',
                    border: '1px solid hsl(263, 85%, 68%)',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="url(#carbonGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(263, 85%, 68%)" />
                    <stop offset="100%" stopColor="hsl(263, 85%, 68%, 0.8)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
