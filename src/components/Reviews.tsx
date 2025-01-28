import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  app: string;
}

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, "id">) => void;
}

// Create store with localStorage persistence
export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviews: [],
      addReview: (review) => set((state) => ({
        reviews: [
          ...state.reviews,
          {
            ...review,
            id: Date.now().toString()
          }
        ]
      }))
    }),
    {
      name: "reviews-storage", // LocalStorage key
    }
  )
);

// Reviews component
const Reviews = () => {
  const { reviews } = useReviewStore();
  
  return (
    <div className="space-y-6 p-4">
      {reviews.map((review) => (
        <div 
          key={review.id}
          className="p-6 bg-white/10 rounded-lg backdrop-blur-sm border border-purple-500/20"
        >
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-xl font-semibold text-purple-200">{review.name}</h3>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < review.rating 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-yellow-400/30"
                  }
                />
              ))}
            </div>
          </div>
          <p className="text-gray-200">{review.comment}</p>
          <div className="mt-3 text-sm text-purple-300">{review.app}</div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;