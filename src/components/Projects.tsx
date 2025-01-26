import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  features?: string[];
  images: string[];
  link?: string;
  isBlurred?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "يقين",
    description: "تطبيق شامل لمواقيت الصلاة مع العديد من المميزات",
    features: [
      "عرض مواقيت الصلاة بشكل واضح وجميل",
      "تنبيهات مخصصة للصلوات",
      "إعدادات متقدمة للتنبيهات والأذان",
      "واجهة مستخدم عربية سهلة الاستخدام",
    ],
    images: [
      "https://i.imgur.com/qADMwaz.png",
      "https://i.imgur.com/OeQGGqd.png",
      "https://i.imgur.com/tYDCPcO.png",
      "https://i.imgur.com/bqfXbvE.png",
      "https://i.imgur.com/YaRhiqR.png",
    ],
    link: "http://tiny.cc/YaqeenApp",
  },
  {
    id: 2,
    title: "مشروع قادم",
    description: "تفاصيل المشروع قريباً...",
    images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6"],
    isBlurred: true,
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % selectedProject.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-[#2D0845] via-[#1A0B26] to-black text-white relative">
      <div className="absolute inset-0 bg-[#4A0C6B] opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#6a21a9" }}>
  مشاريعي
</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                !project.isBlurred && setSelectedProject(project)
              }
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className={`w-full h-full object-cover ${
                  project.isBlurred ? "blur-sm" : ""
                }`}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-[#2D0845] via-[#1A0B26] to-black rounded-xl p-6 max-w-2xl w-full relative text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <X size={24} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                  <div className="relative w-full h-64 flex justify-center">
                    <motion.img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`Project Screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain rounded-lg"
                      style={{
                        transform: "scale(1.2)", // زووم الصور
                      }}
                    />
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-r-lg hover:bg-white hover:text-black"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-l-lg hover:bg-white hover:text-black"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>

                  <div>
                    <ul className="list-disc list-inside space-y-2 text-white/80 mb-4">
                      {selectedProject.features?.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#4A0C6B] hover:bg-[#3A0855] text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        تحميل التطبيق
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
