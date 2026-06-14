"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { HeroSection } from "@/components/sections/hero-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { AmbientOrbs } from "@/components/ui/ambient-orbs";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AmbientOrbs />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </motion.div>
  );
}
