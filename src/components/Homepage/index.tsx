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
import CookieConsent from "./CookieConsent";

const Homepage: React.FC = () => {
  return (
    <>
      <main className="w-full bg-white dark:bg-gray-950 antialiased selection:bg-blue-500/20">
        {/* PHASE 1: AWARENESS */}
        <HeroSection />
        <FeaturesSection />

        {/* PHASE 2: IMMEDIATE VALUE */}
        <AlgorithmOfTheDaySection />
        <PopularAlgorithmsSection />

        {/* PHASE 3: INTERACTION FLOW */}
        <HowItWorksSection />
        <TechnologiesSection />

        {/* PHASE 4: SOCIAL VALIDATION */}
        <UserTestimonialsSection />

        {/* PHASE 5: ECOSYSTEM CONVERSION */}
        <ContributeSection />
        <GetInvolvedSection
          title="Get Involved"
          description="Explore ways to contribute, join the community, and help shape the future of our platform."
        />
        <CallToActionSection />
      </main>

      {/* GLOBAL COOKIE CONSENT (must be outside main for proper overlay stacking) */}
      <CookieConsent />
    </>
  );
};

export default Homepage;
