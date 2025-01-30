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
  const { toast } = useToast();
  const addReview = useReviewStore((state) => state.addReview);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addReview({
      name,
      rating,
      comment,
      app: "يقين"
    });

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
        <h2 className="text-3xl font-bold text-center mb-12">أضف تقييمك</h2>
        
        <motion.form
          name="reviews"
          method="POST"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto space-y-6 p-8 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-lg mb-2">الاسم</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg px-4 py-2"
              required
            />
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
                        ? "fill-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-lg mb-2">التعليق</label>
            <textarea
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-lg px-4 py-2 h-32"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            إرسال التقييم
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default FeedbackForm;