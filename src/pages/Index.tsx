import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Reviews from "@/components/Reviews";
import FeedbackForm from "@/components/ui/FeedbackForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark" dir="rtl">
      <Hero />
      <Projects />
      <Skills />
      <Reviews />
      <FeedbackForm />
    </div>
  );
};

export default Index;