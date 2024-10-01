import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import ContributeSection from "./ContributeSection";
import TechnologiesSection from "./TechnologiesSection";
import GetInvolvedSection from "./GetInvolvedSection";
import PopularAlgorithmsSection from "./PopularAlgorithmsSection";
import UserTestimonialsSection from "./UserTestimonialsSection";
import CallToActionSection from "./CallToActionSection";

const Homepage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ContributeSection />
      <TechnologiesSection />
      <GetInvolvedSection />
      <PopularAlgorithmsSection />
      <UserTestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default Homepage;