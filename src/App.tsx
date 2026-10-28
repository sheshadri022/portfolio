import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { VirtualHumanProvider } from "@/context/VirtualHuman";
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
const Education = lazy(() => import("@/components/Education"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const VirtualHumanDock = lazy(() => import("@/components/VirtualHumanDock"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <VirtualHumanProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] btn btn-primary">
          Skip to content
        </a>
        <AnimatedBackground />
        <ResponsiveNavbar />
        <main id="main">
          <HeroSection />
          <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
            <AboutSection />
            <ExperienceTimeline />
            <FeaturedProjects />
            <DeveloperJourney />
            <SkillsGrid />
            <Certifications />
            <Education />
            <ContactSection />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <VirtualHumanDock />
        </Suspense>
      </VirtualHumanProvider>
    </MotionConfig>
  );
}
