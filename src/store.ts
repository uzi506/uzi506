// store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  app: string;
}

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id'>) => void;
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
            { ...review, id: Date.now().toString() }
          ]
        }))
    }),
    {
      name: 'reviews-store',
    }
  )
);