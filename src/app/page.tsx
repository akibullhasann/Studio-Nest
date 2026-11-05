export const instant = false;

import HeroSection from "@/components/home/Hero-section";
import HowStudioWorks from '@/components/home/HowStudioWorks'
import AboutUs from "@/components/home/AboutUs";
import Featured from "@/components/home/Featured";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <Featured />
      <HowStudioWorks />
      <AboutUs/>
    </div>
  );
}
