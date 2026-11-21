import HeroSection from "@/components/home/HeroSection";
import ServiceCapabilityGrid from "@/components/sections/ServiceCapabilityGrid";
import ExteriorDesignsSection from "@/components/home/ExteriorDesignsSection";
import HappyClientsSection from "@/components/home/HappyClientsSection";
import BlueprintRealitySlider from "@/components/home/BlueprintRealitySlider";
import CostEstimatorSection from "@/components/home/CostEstimatorSection";
import ProjectJourney from "@/components/home/ProjectJourney";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import TrustAndLocationSection from "@/components/home/TrustAndLocationSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCapabilityGrid />
      <CostEstimatorSection />
      <ExteriorDesignsSection />
      <HappyClientsSection />
      <BlueprintRealitySlider />
      <ProjectJourney />
      <FeaturedProjectsSection />
      <TrustAndLocationSection />
    </>
  );
}
