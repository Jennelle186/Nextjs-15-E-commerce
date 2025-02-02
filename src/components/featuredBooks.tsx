"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { containerVariants, itemVariants } from "./framerMotionComponents";

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 14.99,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 11.98,
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 9.99,
  },
  {
    id: 4,
    title: "Educated",
    author: "Tara Westover",
    price: 13.99,
  },
];

export default function FeaturedBooks() {
  return (
    // Outer container with dark background and gradient overlays
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from bg-indigo-950 via-black to-rose-50"
    >
      {/* Top gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
        >
          Featured Books
        </motion.h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book) => (
            <motion.div
              key={book.id}
              variants={itemVariants}
              className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={`/placeholder.svg?height=400&width=300&text=${encodeURIComponent(
                    book.title
                  )}`}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {book.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-white/60">{book.author}</p>
                </div>
                <p className="text-sm font-medium text-white">
                  ${book.price.toFixed(2)}
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </motion.div>
  );
}
