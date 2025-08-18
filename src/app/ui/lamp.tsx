"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
  compact = false,
  noBackground = false,
  showLine = true,
}: {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  noBackground?: boolean;
  showLine?: boolean;
}) => {
  const pageBg = "bg-[#0b1220]";

  const containerClasses = cn(
    // Basis ohne feste Mindesthöhe
    "relative z-0 flex w-full flex-col items-center justify-center overflow-hidden rounded-md",
    compact ? "min-h-0 py-10" : "min-h-screen",
    noBackground ? "bg-transparent rounded-none" : pageBg,
    className
  );

  const lineTranslate = compact ? "-translate-y-[4.5rem]" : "-translate-y-[7rem]";
  const glowTranslate = compact ? "-translate-y-[4rem]" : "-translate-y-[6rem]";
  const haloSize = compact ? "h-32 w-[22rem]" : "h-36 w-[28rem]";
  const topBlurTranslate = compact ? "translate-y-8" : "translate-y-12";

  return (
    <div className={containerClasses}>
      <div
        className={cn(
          "isolate z-0 relative flex w-full scale-y-125 items-center justify-center",
          compact && "scale-y-100 h-[18rem]"
        )}
      >
        <motion.div
          initial={{ opacity: 0.5, width: compact ? "10rem" : "15rem" }}
          whileInView={{ opacity: 1, width: compact ? "22rem" : "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className={cn("absolute bottom-0 left-0 z-20 h-40 w-[100%]", pageBg, "[mask-image:linear-gradient(to_top,white,transparent)]")} />
          <div className={cn("absolute bottom-0 left-0 z-20 h-[100%] w-40", pageBg, "[mask-image:linear-gradient(to_right,white,transparent)]")} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: compact ? "10rem" : "15rem" }}
          whileInView={{ opacity: 1, width: compact ? "22rem" : "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className={cn("absolute bottom-0 right-0 z-20 h-[100%] w-40", pageBg, "[mask-image:linear-gradient(to_left,white,transparent)]")} />
          <div className={cn("absolute bottom-0 right-0 z-20 h-40 w-[100%]", pageBg, "[mask-image:linear-gradient(to_top,white,transparent)]")} />
        </motion.div>
        <div className={cn("absolute top-1/2 h-48 w-full blur-2xl", pageBg, topBlurTranslate)}></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className={cn("absolute inset-auto z-50 rounded-full bg-cyan-500 opacity-50 blur-3xl", haloSize, "-translate-y-1/2")}></div>
        <motion.div
          initial={{ width: compact ? "6rem" : "8rem" }}
          whileInView={{ width: compact ? "12rem" : "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className={cn("absolute inset-auto z-30 h-36 w-64 rounded-full bg-cyan-400 blur-2xl", glowTranslate)}
        ></motion.div>
        {showLine && (
          <motion.div
            initial={{ width: compact ? "10rem" : "15rem" }}
            whileInView={{ width: compact ? "22rem" : "30rem" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className={cn("absolute inset-auto z-50 h-0.5 w-[30rem] bg-cyan-400", lineTranslate)}
          ></motion.div>
        )}
        <div
          className={cn(
            "absolute inset-auto z-40 h-44 w-full",
            pageBg,
            compact ? "-translate-y-[9.5rem]" : "-translate-y-[12.5rem]"
          )}
        ></div>
      </div>

      <div className={cn("relative z-50 flex flex-col items-center px-5", compact ? "translate-y-0" : "-translate-y-80") }>
        {children}
      </div>
    </div>
  );
};


