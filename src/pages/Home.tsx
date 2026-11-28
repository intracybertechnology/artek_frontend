import { HeroSection } from "@/components/home/HeroSection";
// import { TrustIndicators } from "@/components/home/TrustIndicators";
import { WhyChooseArtek } from "@/components/home/WhyChooseArtek";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { PartnersCarousel } from "@/components/home/PartnersCarousel";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { InsightsSection } from "@/components/home/InsightsSection";
import { FAQSection } from "@/components/home/FAQSection";
// import { FinalCTA } from "@/components/home/FinalCTA";

/** The alternating surface and layout order separates each part of the buying journey. */
export default function Home() {
  return (
    <article>
      <HeroSection />
      {/* <TrustIndicators /> */}
      <WhyChooseArtek />
      <SolutionsSection />
      <ProcessSection />
      <IndustriesSection />
      <PartnersCarousel />
      <TestimonialsSection />
      <InsightsSection />
      <FAQSection />
      {/* <FinalCTA /> */}
    </article>
  );
}
