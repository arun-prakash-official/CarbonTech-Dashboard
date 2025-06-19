import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BrandKits from "@/components/BrandKits";
import CarbonAnalytics from "@/components/CarbonAnalytics";
import PortfolioStats from "@/components/PortfolioStats";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import WorksShowcase from "@/components/WorksShowcase";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export default function Dashboard() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <Navigation />
      <HeroSection />
      <BrandKits />
      <CarbonAnalytics />
      <PortfolioStats />
      <FeaturesShowcase />
      <WorksShowcase />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
