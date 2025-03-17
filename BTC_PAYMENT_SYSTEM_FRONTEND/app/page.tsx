import CTASection from "@/components/Landing/CTASection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import HeroSection from "@/components/Landing/HeroSection";
import HowItWorksSection from "@/components/Landing/HowItWorksSection";
import TechnologySection from "@/components/Landing/TechnologySection";
import Navbar from "@/components/Navbar/Navbar";


export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TechnologySection />
      <CTASection />
    </main>
  );
}