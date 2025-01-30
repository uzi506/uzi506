// FeedbackForm.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useReviewStore } from "@/components/Reviews";

const FeedbackForm = () => {
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const addReview = useReviewStore((state) => state.addReview);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء تعبئة جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add to local state
      addReview({
        name,
        rating,
        comment,
        app: "يقين"
      });

      // Submit to Netlify
      const formData = new URLSearchParams();
      formData.append("form-name", "reviews");
      formData.append("name", name);
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
      formData.append("app", "يقين");
      formData.append("bot-field", "");

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      });

      // Reset form
      setName("");
      setComment("");
      setRating(5);
      
      toast({
        title: "شكراً لك!",
        description: "تم إرسال تقييمك بنجاح",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "خطأ",
        description: "فشل إرسال التقييم، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-[#2D0845] via-[#1A0B26] to-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">أضف تقييمك</h2>
        
        <motion.form
          name="reviews"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto space-y-6 bg-[#1A0B26] p-8 rounded-xl border border-[#4A0C6B]"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="reviews" />
          <p className="hidden">
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </p>
          
          <div>
            <label className="block text-lg mb-2">الاسم</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#2D0845] border border-[#4A0C6B] rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-lg mb-2">التطبيق</label>
            <select
              name="app"
              className="w-full bg-[#2D0845] border border-[#4A0C6B] rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
            >
              <option value="يقين">يقين</option>
            </select>
          </div>
          
          <div>
            <label className="block text-lg mb-2">التقييم</label>
            <div className="flex gap-2 justify-end">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                  aria-label={`تقييم ${star} نجوم`}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredStar || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-yellow-400/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            <input type="hidden" name="rating" value={rating} />
          </div>
          
          <div>
            <label className="block text-lg mb-2">التعليق</label>
            <textarea
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-[#2D0845] border border-[#4A0C6B] rounded-lg px-4 py-2 focus:outline-none focus:border-primary h-32 resize-none"
              required
              minLength={10}
              maxLength={500}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-yellow-400 hover:bg-yellow-500 text-[#2D0845] font-bold py-3 rounded-lg transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default FeedbackForm;