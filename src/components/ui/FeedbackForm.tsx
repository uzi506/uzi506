import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    app: "يقين",
    comment: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "شكراً لك!",
      description: "تم إرسال تقييمك بنجاح",
    });
    setFormData({ name: "", app: "يقين", comment: "" }); // إعادة تعيين النموذج
    setRating(5); // إعادة تعيين التقييم
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-md mx-auto space-y-6 bg-[#1A0B26]/80 backdrop-blur-sm p-8 rounded-xl border border-[#4A0C6B]/20"
      data-netlify="true"
      name="feedback"
      method="POST"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      {/* حقل خفي للحماية من البوتات */}
      <input type="hidden" name="form-name" value="feedback" />
      <input type="hidden" name="rating" value={rating} /> {/* حفظ التقييم */}

      <div>
        <label className="block text-lg mb-2">الاسم</label>
        <input
          type="text"
          className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          name="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <label className="block text-lg mb-2">التطبيق</label>
        <select
          className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          name="app"
          value={formData.app}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, app: e.target.value }))
          }
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
              onClick={() => setRating(star)} // تحديث قيمة التقييم
              className={`w-8 h-8 ${
                star <= rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-yellow-300"
              }`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg mb-2">التعليق</label>
        <textarea
          className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2 focus:outline-none focus:border-primary h-32"
          name="comment"
          value={formData.comment}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, comment: e.target.value }))
          }
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-darkPurple hover:bg-[#2A0737] text-white py-3 rounded-lg transition-colors"
      >
        إرسال التقييم
      </button>
    </motion.form>
  );
};

export default FeedbackForm;
