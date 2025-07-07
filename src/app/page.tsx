import Hero from "./Hero";
import JourneySection from "./JourneySection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import AboutSection from "./AboutSection";
import TestimonialsSection from "./TestimonialsSection";
import CertificationsSection from "./CertificationsSection";
import ContactSection from "./ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <JourneySection />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}
