import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { create } from "zustand";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  app: string;
}

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, "id">) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  reviews: [
    {
      id: 1,
      name: "أحمد",
      rating: 5,
      comment: "تطبيق رائع وسهل الاستخدام",
      app: "يقين"
    },
    {
      id: 2,
      name: "محمد",
      rating: 5,
      comment: "يساعدني كثيراً في تنظيم وقت الصلاة",
      app: "يقين"
    }
  ],
  addReview: (review) =>
    set((state) => ({
      reviews: [
        ...state.reviews,
        {
          ...review,
          id: state.reviews.length + 1,
        },
      ],
    })),
}));

const Reviews = () => {
  const reviews = useReviewStore((state) => state.reviews);

  return (
    <div className="py-20 bg-gradient-to-br from-[#2D0845] via-[#1A0B26] to-black text-white relative">
      <div className="absolute inset-0 bg-[#4A0C6B] opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">آراء المستخدمين</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="bg-[#1A0B26]/50 backdrop-blur-sm p-6 rounded-xl border border-[#4A0C6B]/20"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{review.name}</h3>
                  <p className="text-primary">{review.app}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-white/80">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;