import { useState } from "react";
import { toast } from "@/components/ui/toast";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "شكراً!",
      description: "تم إرسال ملاحظاتك بنجاح.",
    });
  };

  return (
    <form
      method="POST"
      data-netlify="true"
      name="feedback-form"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="feedback-form" />
      <h2>شاركنا رأيك</h2>
      <textarea
        name="feedback"
        placeholder="اكتب ملاحظاتك هنا..."
        required
      ></textarea>
      <button type="submit">إرسال</button>
    </form>
  );
};

export default FeedbackForm;
