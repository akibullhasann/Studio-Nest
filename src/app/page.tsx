import HeroSection from "@/components/home/Hero-section";
import Image from "next/image";
import HowStudioWorks from '@/components/home/HowStudioWorks'
import AboutUs from "@/components/home/AboutUs";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <HowStudioWorks />
      <AboutUs/>
    </div>
  );
}
