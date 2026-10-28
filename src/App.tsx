import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { VirtualHumanProvider } from "@/context/VirtualHuman";
import { TalkProvider } from "@/context/Talk";
import AnimatedBackground from "@/components/AnimatedBackground";
import ResponsiveNavbar from "@/components/ResponsiveNavbar";
import HeroSection from "@/components/HeroSection";

// Everything below the fold is split into its own chunk.
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExperienceTimeline = lazy(() => import("@/components/ExperienceTimeline"));
const FeaturedProjects = lazy(() => import("@/components/FeaturedProjects"));
const DeveloperJourney = lazy(() => import("@/components/DeveloperJourney"));
const SkillsGrid = lazy(() => import("@/components/SkillsGrid"));
const Certifications = lazy(() => import("@/components/Certifications"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const Education = lazy(() => import("@/components/Education"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const VirtualHumanDock = lazy(() => import("@/components/VirtualHumanDock"));
const TalkingAvatar = lazy(() => import("@/components/TalkingAvatar"));
const GuideFollower = lazy(() => import("@/components/GuideFollower"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <VirtualHumanProvider>
        <TalkProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] btn btn-primary">
          Skip to content
        </a>
        <AnimatedBackground />
        <ResponsiveNavbar />
        <main id="main">
          <HeroSection />
          <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
            <AboutSection />
            <ServicesSection />
            <FeaturedProjects />
            <DeveloperJourney />
            <ExperienceTimeline />
            <Education />
            <SkillsGrid />
            <Certifications />
            <ContactSection />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <VirtualHumanDock />
          <TalkingAvatar />
          <GuideFollower />
        </Suspense>
        </TalkProvider>
      </VirtualHumanProvider>
    </MotionConfig>
  );
}
