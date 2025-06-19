import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-blue-500/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Ready to Transform Your Sustainability Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of companies already using CarbonTech to reduce their environmental impact
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
