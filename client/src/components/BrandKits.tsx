import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

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
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`gradient-border hover:animate-pulse-glow transition-all duration-300 cursor-pointer ${
                kit.selected ? "animate-pulse-glow" : ""
              }`}
              onClick={() => toggleBrandKit(kit.id)}
            >
              <div className="gradient-border-content p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      checked={kit.selected}
                      onCheckedChange={() => toggleBrandKit(kit.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className={`w-8 h-8 bg-gradient-to-r ${kit.color} rounded-full`} />
                    <span className="text-lg font-semibold">{kit.name}</span>
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
