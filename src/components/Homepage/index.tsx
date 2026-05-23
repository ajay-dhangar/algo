import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import AlgorithmOfTheDaySection from "./AlgorithmOfTheDaySection";
import PopularAlgorithmsSection from "./PopularAlgorithmsSection";
import HowItWorksSection from "./HowItWorksSection";
import TechnologiesSection from "./TechnologiesSection";
import UserTestimonialsSection from "./UserTestimonialsSection";
import ContributeSection from "./ContributeSection";
import GetInvolvedSection from "./GetInvolvedSection";
import CallToActionSection from "./CallToActionSection";

const Homepage: React.FC = () => {
  return (
    <main className="w-full bg-white dark:bg-gray-950 antialiased selection:bg-blue-500/20">
      
      {/* PHASE 1: AWARENESS (The First Impression Hook) */}
      <HeroSection />
      <FeaturesSection />
      
      {/* PHASE 2: IMMEDIATE VALUE (Showcasing Tangible Assets Upfront) */}
      <AlgorithmOfTheDaySection />
      <PopularAlgorithmsSection />
      
      {/* PHASE 3: INTERACTION FLOW (Answering "How do I interface with this platform?") */}
      <HowItWorksSection />
      <TechnologiesSection />
      
      {/* PHASE 4: SOCIAL VALIDATION (Building Trust via Peer Metrics) */}
      <UserTestimonialsSection />
      
      {/* PHASE 5: ECOSYSTEM CONVERSION (Directing user intent into ecosystem metrics) */}
      <ContributeSection />
      <GetInvolvedSection />
      <CallToActionSection />
      
    </main>
  );
};

export default Homepage;