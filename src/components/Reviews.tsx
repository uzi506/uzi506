const Reviews = () => {
  const { reviews } = useReviewStore();
  
  return (
    <div className="reviews-container">
      <h2 className="section-title">آراء المستخدمين</h2>
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <h3 className="review-name">{review.name}</h3>
            <span className="app-tag">{review.app}</span>
          </div>
          
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
        </div>
      ))}
    </div>
  );
};