import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Briefcase, 
  Brain, 
  Shield, 
  FileText, 
  Plug 
} from "lucide-react";
import GlassCard from "@/components/ui/glass-card";

interface Feature {
  icon: typeof TrendingUp;
  title: string;
  description: string;
  color: string;
}

export default function FeaturesShowcase() {
  const features: Feature[] = [
    {
      icon: TrendingUp,
      title: "Real-time Monitoring",
      description: "Track carbon emissions and energy consumption in real-time with advanced analytics and reporting.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Briefcase,
      title: "Portfolio Management",
      description: "Manage multiple sustainability projects and track performance across your entire portfolio.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Brain,
      title: "Predictive Analytics",
      description: "Leverage AI-powered insights to predict future carbon emissions and optimize your sustainability strategy.",
      color: "from-primary to-primary/80",
    },
    {
      icon: Shield,
      title: "Compliance Tracking",
      description: "Stay compliant with environmental regulations and automatically generate required reports.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: FileText,
      title: "Custom Reporting",
      description: "Create detailed custom reports with beautiful visualizations for stakeholders and regulatory bodies.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Plug,
      title: "Integration Hub",
      description: "Connect with existing systems and tools through our comprehensive API and integration platform.",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-background to-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Advanced Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover the power of our comprehensive sustainability platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 h-full group hover:shadow-2xl transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
