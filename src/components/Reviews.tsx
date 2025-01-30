import { create } from "zustand";

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

export const useReviewStore = create<ReviewStore>((set) => ({
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
}));

const Reviews = () => {
  const { reviews } = useReviewStore();
  
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <h3>{review.name}</h3>
          <div className="rating">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="filled-star" />
            ))}
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;