import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedInSection } from "@/components/FeaturedInSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CompetitorAnalysis } from "@/components/CompetitorAnalysis";
import { PricingSection } from "@/components/PricingSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import FaqSection from "@/components/FaqSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      <HeroSection />
      <FeaturedInSection />
      <CompetitorAnalysis />
      <FeaturesSection />
      <PricingSection />
      <HowItWorksSection />
      <FaqSection />
      <CTASection />
      <Footer />
    </div>
  );
}
