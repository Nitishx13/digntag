import { Heart, Calendar, MapPin, Images, QrCode, BarChart3 } from "lucide-react";
import { motion } from 'framer-motion';

const features = [
  {
    icon: Heart,
    title: "RSVP & Guest Management",
    description: "Easily collect responses, meal preferences, and special notes from your guests.",
    accent: '#FFD1E3'
  },
  {
    icon: Calendar,
    title: "Event Schedule",
    description: "Create a detailed timeline of your event with multiple ceremonies and activities.",
    accent: '#F9CFC3'
  },
  {
    icon: MapPin,
    title: "Interactive Maps",
    description: "Help guests find their way with embedded maps and custom directions.",
    accent: '#FFE0D0'
  },
  {
    icon: Images,
    title: "Photo Gallery",
    description: "Share your love story and event photos in a beautiful gallery format.",
    accent: '#F6EBCC'
  },
  {
    icon: QrCode,
    title: "QR Code & Links",
    description: "Share your digital invitation with a simple link or printable QR code.",
    accent: '#FFD1E3'
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track who's viewed your invitation and monitor engagement in real-time.",
    accent: '#E9D3C2'
  }
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="bg-zinc-50 py-16 sm:py-24" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
            Everything You Need for Your Special Event
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
            Powerful features to make your event planning seamless and memorable
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex h-full flex-col rounded-2xl border border-[#FFD1E3] bg-white p-6 shadow transition hover:-translate-y-1"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: feature.accent, color: '#3B1F1F' }}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="mt-6 text-sm font-semibold text-[#FFD1E3]">Learn more →</div>
              <p className="text-sm text-[#3B1F1F]/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
