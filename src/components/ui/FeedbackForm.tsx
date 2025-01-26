<motion.form
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="max-w-md mx-auto space-y-6 bg-[#1A0B26]/80 backdrop-blur-sm p-8 rounded-xl border border-[#4A0C6B]/20"
  data-netlify="true"
  name="feedback"
  method="POST"
  netlify-honeypot="bot-field"
>
  {/* Hidden input for form name */}
  <input type="hidden" name="form-name" value="feedback" />

  {/* Honeypot field for bots */}
  <div style={{ display: "none" }}>
    <label>
      Don’t fill this out: <input name="bot-field" />
    </label>
  </div>

  <div>
    <label className="block text-lg mb-2">Name</label>
    <input
      type="text"
      name="name"
      className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2"
      required
    />
  </div>

  <div>
    <label className="block text-lg mb-2">Application</label>
    <select
      name="app"
      className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2"
      required
    >
      <option value="Yaqeen">Yaqeen</option>
    </select>
  </div>

  <div>
    <label className="block text-lg mb-2">Rating</label>
    <input
      type="hidden"
      name="rating"
      value="5" // Change dynamically if needed
    />
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => console.log(star)}
          className="text-yellow-500"
        >
          ⭐
        </button>
      ))}
    </div>
  </div>

  <div>
    <label className="block text-lg mb-2">Comment</label>
    <textarea
      name="comment"
      className="w-full bg-[#2D0845]/50 border border-[#4A0C6B]/20 rounded-lg px-4 py-2"
      required
    />
  </div>

  <button
    type="submit"
    className="w-full bg-darkPurple hover:bg-[#2A0737] text-white py-3 rounded-lg transition-colors"
  >
    Submit Feedback
  </button>
</motion.form>
