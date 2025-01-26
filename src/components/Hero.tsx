import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2D0845] via-[#1A0B26] to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[#4A0C6B] opacity-10" />

      {/* النص "uzi506" في أعلى يمين الصفحة */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 right-4 font-bold text-4xl"
      >
        <span
          className="gradient-text"
          style={{
            fontFamily: "Poppins, sans-serif",
            display: "inline-block",
          }}
        >
          uzi506
        </span>
      </motion.div>
      {/* شعار الإنستغرام في أعلى يسار الصفحة */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4"
      >
        <a
          href="https://instagram.com/uzi.506"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl font-bold text-purple-900 text-center mb-12"
        >
          <Instagram size={42} />
          <span></span>
        </a>
      </motion.div>

      {/* إضافة الصورة بحواف ناعمة */}
      <img
        src="https://i.imgur.com/VpaWW4H.png"
        alt="صورة تعبيرية"
        className="mb-6 rounded-lg shadow-lg"
        style={{ width: "497px", height: "369px" }}
      />

      {/* النصوص الرئيسية */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl px-4 relative z-10"
      >
        <h2 className="text-3xl font-bold mb-6" style={{ color: "#6a21a9" }}>
          Just a chill guy
        </h2>
        <p className="text-xl mb-8" style={{ color: "#6a21a9" }}>
          من عاصمة القصيم بريدة
        </p>
      </motion.div>
    </div>
  );
};

export default Hero;





