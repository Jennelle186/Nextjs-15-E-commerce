"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative w-full bg-indigo-950 text-white py-12 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.15] via-transparent to-rose-500/[0.15]"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-white/60">
              BookHaven is your gateway to literary adventures. Discover,
              explore, and lose yourself in the world of books.
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Featured Books
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Shop Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Facebook />
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Twitter />
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Instagram />
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-white/10 text-center text-white/40"
        >
          &copy; {currentYear} BookHaven. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
