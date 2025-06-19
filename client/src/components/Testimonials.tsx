import { motion } from "framer-motion";
import { Star } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  content: string;
  avatar: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Michael Chen",
      title: "CEO",
      company: "TechStart Inc.",
      content: "CarbonTech has revolutionized how we track and manage our carbon footprint. The insights we've gained have helped us reduce emissions by 35% in just six months.",
      avatar: "MC",
    },
    {
      name: "Sarah Johnson",
      title: "Sustainability Director",
      company: "GreenCorp",
      content: "The real-time monitoring and predictive analytics have been game-changers for our sustainability initiatives. We can now make data-driven decisions with confidence.",
      avatar: "SJ",
    },
    {
      name: "David Rodriguez",
      title: "COO",
      company: "Manufacturing Plus",
      content: "The compliance tracking features have saved us countless hours and ensured we meet all regulatory requirements. The ROI has been exceptional.",
      avatar: "DR",
    },
  ];

  const renderStars = () => (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );

  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground">
            See what our clients say about their sustainability transformation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "{testimonial.content}"
                </p>
                {renderStars()}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
