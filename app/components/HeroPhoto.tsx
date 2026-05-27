"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative aspect-[4/5] w-full max-w-sm mx-auto md:max-w-none overflow-hidden rounded-[24px] bg-[var(--color-caramelo)] shadow-[0_32px_64px_-24px_rgba(74,44,25,0.5)]"
    >
      <Image
        src="/assets/malu.png"
        alt="Malu Fernandes"
        fill
        priority
        sizes="(max-width: 768px) 90vw, 560px"
        className="object-cover object-top"
      />
      {/* Gradient so quote is readable */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 45%, rgba(43,31,26,0.72) 100%)",
        }}
      />
      {/* Quote */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-[#F7EFE2]">
        <p className="font-bold text-lg md:text-xl leading-[1.2]">
          &ldquo;Eu não vim da política.
          <br />
          Eu vim da vida real.&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
