"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Book, BookOpen, Coffee, Truck } from "lucide-react";
import { containerVariants, itemVariants } from "./framerMotionComponents";

const features = [
  {
    icon: <Book className="w-6 h-6" />,
    title: "Vast Collection",
    description: "Explore our extensive library of books across all genres.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Reading Nook",
    description: "Cozy spaces for you to dive into your favorite stories.",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Free Shipping",
    description: "Free Shipping on orders above Php 700.",
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "Café Corner",
    description: "Enjoy a cup of coffee while browsing our selection.",
  },
];

function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.1 }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 backdrop-blur-sm"
    >
      <div className="text-indigo-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60">{description}</p>
    </motion.div>
  );
}

export default function BookshopFeatures() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from bg-indigo-950 via-white to-rose-50"
    >
      {/* Top gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-transparent to-rose-500/80 pointer-events-none" />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
        >
          Discover Our Bookshop Features
        </motion.h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 backdrop-blur-sm"
            >
              <FeatureCard key={index} {...feature} index={index} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </motion.div>
  );
}
