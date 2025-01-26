import { useEffect, useState } from "react";

const FloatingAvatar = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: 1, y: 1 }); // السرعة الأولية
  const [speed, setSpeed] = useState(0.5); // السرعة الافتراضية
  const [rotation, setRotation] = useState(0); // إدارة الدوران
  const [isSpinning, setIsSpinning] = useState(false); // تفعيل الدوران
  const [isFirstClick, setIsFirstClick] = useState(true); // لتحديد النقرة الأولى
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // لإدارة فترة الحركة

  const handleAvatarClick = () => {
    if (isFirstClick) {
      setSpeed(3); // سرعة أعلى للنقرة الأولى
      setIsFirstClick(false); // إلغاء حالة النقرة الأولى بعد الضغط
    } else {
      setSpeed((prevSpeed) => Math.min(prevSpeed * 1.5, 10)); // زيادة السرعة بحد أقصى 10
    }

    setIsSpinning(true); // تفعيل الدوران

    // إذا كان هناك مؤقت نشط، قم بإلغائه
    if (timer) {
      clearTimeout(timer);
    }

    // إعادة ضبط المؤقت لـ 7 ثوانٍ
    const newTimer = setTimeout(() => {
      setSpeed(0.5); // إرجاع السرعة إلى الوضع الطبيعي
      setIsSpinning(false); // إيقاف الدوران
    }, 7000);

    setTimer(newTimer);
  };

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      setPosition((prev) => {
        let newX = prev.x + velocity.x * speed;
        let newY = prev.y + velocity.y * speed;

        // اصطدام بالحواف
        if (newX <= 0 || newX >= window.innerWidth - 100) {
          setVelocity((prevVel) => ({ ...prevVel, x: -prevVel.x }));
        }
        if (newY <= 0 || newY >= window.innerHeight - 100) {
          setVelocity((prevVel) => ({ ...prevVel, y: -prevVel.y }));
        }

        return {
          x: Math.max(0, Math.min(window.innerWidth - 100, newX)),
          y: Math.max(0, Math.min(window.innerHeight - 100, newY)),
        };
      });

      // تحديث الدوران أثناء الطفو
      setRotation((prevRotation) => prevRotation + (isSpinning ? 2 : 0)); // دوران سلس
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    // بدء التحديث
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrameId); // تنظيف عند انتهاء المكون
  }, [velocity, speed, isSpinning]);

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: "100px",
        height: "100px",
        transform: `rotate(${rotation}deg)`,
        cursor: "pointer",
        zIndex: 10000, // تأكد من ظهوره دائمًا فوق كل العناصر
        pointerEvents: "auto", // للسماح بالنقر عليه
      }}
      onClick={handleAvatarClick}
    >
      <img
        src="https://i.imgur.com/y0POshD.png" // رابط الصورة
        alt="Floating Avatar"
        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
      />
    </div>
  );
};

export default FloatingAvatar;
