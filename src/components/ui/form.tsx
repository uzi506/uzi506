import { useState } from "react";

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-[#2D0845] via-[#1A0B26] to-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">أضف تقييمك</h2>
        {!submitted ? (
          <form
            method="POST"
            data-netlify="true"
            name="التقييمات"
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-6 bg-[#1A0B26]/80 backdrop-blur-sm p-8 rounded-xl border border-[#4A0C6B]"
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                الاسم
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="اسمك"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="app" className="block mb-2 text-sm font-medium">
                التطبيق
              </label>
              <select
                id="app"
                name="app"
                className="w-full p-2 border rounded-md"
              >
                <option value="بقتي">بقتي</option>
              </select>
            </div>
            <div>
              <label htmlFor="rating" className="block mb-2 text-sm font-medium">
                التقييم
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block mb-2 text-sm font-medium">
                التعليق
              </label>
              <textarea
                id="comment"
                name="comment"
                required
                placeholder="تعليقك"
                className="w-full p-2 border rounded-md"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md"
            >
              إرسال التقييم
            </button>
          </form>
        ) : (
          <p className="text-center text-lg font-semibold text-green-500">
            شكراً لك! تم إرسال تقييمك بنجاح.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
