import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeedbackForm from "@/components/ui/FeedbackForm";
import FloatingAvatar from "@/components/ui/FloatingAvatar";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FloatingAvatar />
        <div>
          <h1>مرحبًا بك في الصفحة الرئيسية</h1>
          <FeedbackForm />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
