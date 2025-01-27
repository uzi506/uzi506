import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useReviewStore } from "./Reviews";

const FeedbackForm = () => {
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const addReview = useReviewStore((state) => state.addReview);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add review to local state
    addReview({
      name,
      rating,
      comment,
      app: "يقين"
    });

    // Send data to Netlify Forms
    const formData = new FormData();
    formData.append("form-name", "reviews");
    formData.append("name", name);
    formData.append("rating", rating.toString());
    formData.append("comment", comment);
    formData.append("app", "يقين");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString()
    })
    .catch(error => console.log("Form submission error:", error));

    // Reset form
    setName("");
    setComment("");
    setRating(5);
    
    toast({
      title: "شكراً لك!",
      description: "تم إرسال تقييمك بنجاح",
    });
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
          className="max-w-md mx-auto space-y-6 bg-[#1A0B26]/80 backdrop-blur-sm p-8 rounded-xl border border-[#4A0C6B]/20"
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
              className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-lg mb-2">التطبيق</label>
            <select
              name="app"
              className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
            >
              <option value="يقين">يقين</option>
            </select>
          </div>
          
          <div>
            <label className="block text-lg mb-2">التقييم</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 ${
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
              className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary h-32"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors"
          >
            إرسال التقييم
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default FeedbackForm;