import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import WaterRipple from "@/components/ui/water-ripple";

interface BrandKit {
  id: string;
  name: string;
  color: string;
  selected: boolean;
}

export default function BrandKits() {
  const [brandKits, setBrandKits] = useState<BrandKit[]>([
    { id: "ecorp", name: "ECorp", color: "from-green-400 to-green-500", selected: false },
    { id: "icorp", name: "ICorp", color: "from-orange-400 to-orange-500", selected: false },
    { id: "agency", name: "The Agency", color: "from-red-400 to-red-500", selected: true },
  ]);

  const toggleBrandKit = (id: string) => {
    setBrandKits(kits =>
      kits.map(kit =>
        kit.id === id ? { ...kit, selected: !kit.selected } : kit
      )
    );
  };

  return (
    <section id="dashboard" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Brand Kits
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your sustainability brands with our comprehensive toolkit
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {brandKits.map((kit, index) => (
            <WaterRipple
              key={kit.id}
              intensity="medium"
              color="rgba(139, 92, 246, 0.6)"
              className="gradient-border hover-lift hover-glow cursor-pointer group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                whileTap={{ scale: 0.95 }}
                className={`${kit.selected ? "animate-pulse-glow" : ""}`}
                onClick={() => toggleBrandKit(kit.id)}
              >
                <div className="gradient-border-content p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Checkbox 
                          checked={kit.selected}
                          onCheckedChange={() => toggleBrandKit(kit.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </motion.div>
                      <motion.div 
                        className={`w-8 h-8 bg-gradient-to-r ${kit.color} rounded-full group-hover:animate-bounce-strike`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.span 
                        className="text-lg font-semibold"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {kit.name}
                      </motion.span>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 90, scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </WaterRipple>
          ))}
        </div>
      </div>
    </section>
  );
}
