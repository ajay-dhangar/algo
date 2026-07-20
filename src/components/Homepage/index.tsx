import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import LearningPathsSection from "./LearningPathsSection";
import AlgorithmOfTheDaySection from "./AlgorithmOfTheDaySection";
import PopularAlgorithmsSection from "./PopularAlgorithmsSection";
import HowItWorksSection from "./HowItWorksSection";
import TechnologiesSection from "./TechnologiesSection";
import UserTestimonialsSection from "./UserTestimonialsSection";
import ContributeSection from "./ContributeSection";
import GetInvolvedSection from "./GetInvolvedSection";
import CallToActionSection from "./CallToActionSection";
import CookieConsent from "./CookieConsent";
import DailyChallengeWidget from "../DailyChallengeWidget";

const Homepage: React.FC = () => {
  return (
    <>
      <main className="w-full bg-white dark:bg-gray-950 antialiased selection:bg-blue-500/20">
        {/* PHASE 1: AWARENESS */}
        <HeroSection />
        <FeaturesSection />

        {/* GUIDED LEARNING PATHS */}
        <LearningPathsSection />

        {/* PHASE 2: IMMEDIATE VALUE */}
        <AlgorithmOfTheDaySection />
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <DailyChallengeWidget />
          </div>
        </section>
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
