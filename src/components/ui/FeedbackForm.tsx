"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackFormProps {
  addReview: (review: {
    name: string;
    rating: number;
    comment: string;
    app: string;
  }) => void;
}

const FeedbackForm = ({ addReview }: FeedbackFormProps) => {
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    app: "يقين",
    comment: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Gather form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Submit to Netlify Forms
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      // Add review locally for UI update
      addReview({
        name: formData.get("name") as string,
        rating: Number(formData.get("rating")),
        comment: formData.get("comment") as string,
        app: formData.get("app") as string,
      });

      toast({
        title: "شكراً لك!",
        description: "تم إرسال تقييمك بنجاح",
      });

      // Reset form
      setFormData({ name: "", app: "يقين", comment: "" });
      setRating(5);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "حدث خطأ!",
        description: "لم يتم إرسال التقييم، حاول مرة أخرى",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-[#2D0845] via-[#1A0B26] to-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">
          أضف تقييمك
        </h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto space-y-6 bg-[#1A0B26]/80 backdrop-blur-sm p-8 rounded-xl border border-[#4A0C6B]/20"
          onSubmit={handleSubmit}
          name="feedback-form"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
        >
          {/* Hidden Netlify fields */}
          <input type="hidden" name="form-name" value="feedback-form" />
          <input type="hidden" name="rating" value={rating.toString()} />
          <div hidden>
            <input name="bot-field" />
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-lg mb-2">الاسم</label>
            <input
              type="text"
              name="name"
              className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* App Field */}
          <div>
            <label className="block text-lg mb-2">التطبيق</label>
            <select
              name="app"
              className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
              value={formData.app}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, app: e.target.value }))
              }
            >
              <option value="يقين">يقين</option>
            </select>
          </div>

          {/* Rating Field */}
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
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-yellow-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Field */}
          <div>
            <label className="block text-lg mb-2">التعليق</label>
            <textarea
              name="comment"
              className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary h-32"
              required
              value={formData.comment}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, comment: e.target.value }))
              }
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-darkPurple hover:bg-[#2A0737] text-white py-3 rounded-lg transition-colors"
          >
            إرسال التقييم
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default FeedbackForm;
