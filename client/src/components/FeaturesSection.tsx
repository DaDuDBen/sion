import { motion } from 'framer-motion';
import { Mic, MessageCircle, BarChart3, Users } from 'lucide-react';
import { GlowingEffect } from './GlowingEffect';

const features = [
  { icon: Mic, text: 'Voice Dictation', description: 'Speak naturally and generate complete prescriptions instantly' },
  { icon: MessageCircle, text: 'Instant Sharing', description: 'Send via WhatsApp, Email, or SMS in seconds' },
  { icon: BarChart3, text: 'Analytics Dashboard', description: 'Track prescriptions and get actionable insights' },
  { icon: Users, text: 'Patient Portal', description: 'Patients can access their prescriptions anytime' },
];

export default function FeaturesSection() {
  return (
    <section className="relative min-h-screen w-full py-24 bg-black">
      <div className="max-w-6xl mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white text-center mb-20"
        >
          Everything included
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative h-64"
              >
                <div className="relative h-full rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.02]">
                  <GlowingEffect
                    spread={60}
                    glow={true}
                    disabled={false}
                    proximity={100}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />

                  <div className="relative h-full flex flex-col justify-between p-8 z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF7A18] to-[#FF9A4D] mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {feature.text}
                        </h3>
                      </div>
                    </div>

                    <p className="text-white/60 text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <p className="text-white/40 text-sm">
            Designed for doctors, built for efficiency
          </p>
        </motion.div>
      </div>
    </section>
  );
}
