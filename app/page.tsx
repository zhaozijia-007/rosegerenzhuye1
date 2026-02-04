import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
      </main>
      <ChatBot />
    </div>
  );
}
