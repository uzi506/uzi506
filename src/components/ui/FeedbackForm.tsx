import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto space-y-6 bg-[#1A0B26]/80 backdrop-blur-sm p-8 rounded-xl border border-[#4A0C6B]/20"
          onSubmit={handleSubmit}
          method="POST"
          data-netlify="true"
          name="feedback-form"
        >
          {/* Hidden Netlify fields */}
          <input type="hidden" name="form-name" value="feedback-form" />

          {/* Name Field */}
          <div>
            <label className="block text-lg mb-2">الاسم</label>
            <input
              type="text"
              name="name"
              className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* App Field */}
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

          {/* Rating Field */}
          <div>
            <label className="block text-lg mb-2">التقييم</label>
            <input
              type="number"
              name="rating"
              className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              min="1"
              max="5"
              required
            />
          </div>

          {/* Comment Field */}
          <div>
            <label className="block text-lg mb-2">التعليق</label>
            <textarea
              name="comment"
              className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary h-32"
              required
            />
          </div>

          {/* Submit Button */}
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