import { motion } from "framer-motion";

const skills = [
  { name: "ChatGPT Skills", level: 100 },
  { name: "Full Time Chillin", level: 95 },
  { name: "Vibes Master", level: 90 },
  { name: "Professional Relaxation", level: 85 },
];

const Skills = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-[#2D0845] via-[#1A0B26] to-black text-white relative">
      <div className="absolute inset-0 bg-[#4A0C6B] opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#6a21a9" }}>
  مهاراتي
</h2>

        <div className="max-w-2xl mx-auto space-y-8">
          {skills.map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-lg">{skill.name}</span>
                <span className="text-primary">{skill.level}%</span>
              </div>
              <motion.div
                className="h-2 bg-[#1A0B26] rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4A0C6B] to-[#9b87f5]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;