// Reviews.tsx
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

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviews: [
        {
          id: "1",
          name: "أحمد",
          rating: 5,
          comment: "تطبيق رائع وسهل الاستخدام",
          app: "يقين"
        }
      ],
      addReview: (review) => 
        set((state) => ({
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
      name: "reviews-storage",
      getStorage: () => localStorage,
    }
  )
);

const Reviews = () => {
  const { reviews } = useReviewStore();
  
  return (
    <div className="reviews-container">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <h3 className="review-name">{review.name}</h3>
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={i < review.rating ? "filled-star" : "empty-star"}
                size={20}
              />
            ))}
          </div>
          <p className="review-comment">{review.comment}</p>
          <span className="app-name">{review.app}</span>
        </div>
      ))}
    </div>
  );
};

export default Reviews;