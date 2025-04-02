"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/LandingPage/footer";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-indigo-200",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/50",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function PolicySection({
  title,
  content,
  index,
}: {
  title: string;
  content: string | React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      {typeof content === "string" ? (
        <p className="text-gray-600">{content}</p>
      ) : (
        content
      )}
    </motion.div>
  );
}

export default function PrivacyPolicy() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const policySections = [
    {
      title: "Information We Collect",
      content: (
        <div className="space-y-3 text-gray-600">
          <p>
            We collect several types of information from and about users of our
            website, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Personal information (such as name, email address, postal address,
              phone number) that you provide when creating an account, placing
              an order, or contacting us.
            </li>
            <li>
              Information about your internet connection, the equipment you use
              to access our website, and usage details.
            </li>
            <li>
              Information collected through cookies and other tracking
              technologies about your browsing actions and patterns.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "How We Use Your Information",
      content: (
        <div className="space-y-3 text-gray-600">
          <p>
            We use the information we collect about you for various purposes,
            including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Processing and fulfilling your orders.</li>
            <li>Creating and managing your account.</li>
            <li>
              Providing you with information, products, or services that you
              request from us.
            </li>
            <li>Sending you order confirmations, and updates</li>
            <li>Improving our website, products, and services.</li>
            <li>
              Personalizing your experience and delivering content relevant to
              your interests.
            </li>
            <li>
              Responding to your inquiries and providing customer support.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Information Sharing",
      content: (
        <div className="space-y-3 text-gray-600">
          <p>
            We may disclose personal information that we collect or you provide:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>To our subsidiaries and affiliates.</li>
            <li>
              To contractors, service providers, and other third parties we use
              to support our business (such as shipping carriers, payment
              processors, and analytics providers).
            </li>
            <li>To comply with any court order, law, or legal process.</li>
            <li>To enforce our terms of service and other agreements.</li>
            <li>
              If we believe disclosure is necessary to protect the rights,
              property, or safety of BookHaven, our customers, or others.
            </li>
          </ul>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties for their marketing purposes without your explicit consent.
          </p>
        </div>
      ),
    },
    {
      title: "Data Security",
      content: (
        <div className="space-y-3 text-gray-600">
          <p>
            We implement appropriate security measures to protect your personal
            information from accidental loss, unauthorized access, disclosure,
            alteration, and destruction. These measures include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Encryption of sensitive information using secure socket layer
              technology (SSL).
            </li>
            <li>Regular security assessments and vulnerability testing.</li>
            <li>
              Access controls and authentication procedures for our systems.
            </li>
            <li>Employee training on privacy and security practices.</li>
          </ul>
          <p>
            However, no method of transmission over the Internet or electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your personal information, we cannot
            guarantee its absolute security.
          </p>
        </div>
      ),
    },
    {
      title: "Your Choices",
      content: (
        <div className="space-y-3 text-gray-600">
          <p>
            You have several choices regarding the information you provide to
            us:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              You can access and update your account information by logging into
              your account settings.
            </li>
            <li>
              You can choose to disable cookies through your browser settings,
              although this may affect your ability to use certain features of
              our website.
            </li>
            <li>
              You can request access to, correction of, or deletion of your
              personal information by contacting us.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Children's Privacy",
      content:
        "Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete the information.",
    },
    {
      title: "Changes to Our Privacy Policy",
      content:
        "We may update our privacy policy from time to time. If we make material changes, we will notify you by email or by posting a notice on our website prior to the change becoming effective. We encourage you to review this privacy policy periodically for any changes.",
    },
    {
      title: "Contact Information",
      content:
        "If you have any questions or concerns about our privacy policy or practices, please contact us at privacy@bookhaven.com or by mail at BookHaven Privacy Office, 123 Literary Lane, Bookville, BK 12345.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-indigo-200/70"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />

          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-rose-200/70"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-8 md:mb-12"
            >
              <Shield className="w-5 h-5 text-indigo-500" />
              <span className="text-sm text-indigo-700 tracking-wide font-medium">
                Your Data Matters
              </span>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="text-gray-900">Privacy</span>
                <br />
                <span
                  className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500",
                    pacifico.className
                  )}
                >
                  Policy
                </span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                We value your privacy and are committed to protecting your
                personal information. This policy explains how we collect, use,
                and safeguard your data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Last Updated Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center">
            <p className="text-gray-500">Last Updated: April 1, 2025</p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-12">
            <p className="text-gray-600">
              At BookHaven (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
              we respect your privacy and are committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              website or make a purchase.
            </p>
            <p className="text-gray-600 mt-4">
              Please read this Privacy Policy carefully. By accessing or using
              our website, you acknowledge that you have read, understood, and
              agree to be bound by all the terms of this Privacy Policy. If you
              do not agree, please do not access or use our website.
            </p>
          </div>

          <div>
            {policySections.map((section, index) => (
              <PolicySection
                key={index}
                title={section.title}
                content={section.content}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
