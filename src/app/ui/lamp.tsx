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
    "relative z-0 flex w-full flex-col items-center justify-center overflow-hidden rounded-md",
    compact ? "min-h-0 py-6" : "min-h-screen",
    noBackground ? "bg-transparent rounded-none" : pageBg,
    className
  );

  // Kompaktere, natürlichere Offsets
  const lineTranslate = compact ? "-translate-y-[2.5rem]" : "-translate-y-[7rem]";
  const glowTranslate = compact ? "-translate-y-[2rem]" : "-translate-y-[6rem]";
  const haloSize = compact ? "h-28 w-[20rem]" : "h-36 w-[28rem]";
  const topBlurTranslate = compact ? "translate-y-3" : "translate-y-12";

  return (
    <div className={containerClasses}>
      <div
        className={cn(
          "isolate z-0 relative flex w-full scale-y-125 items-center justify-center",
          compact && "scale-y-100 h-[14rem]"
        )}
      >
        {/* Links Konus: indigo -> transparent */}
        <motion.div
          initial={{ opacity: 0.5, width: compact ? "9rem" : "15rem" }}
          whileInView={{ opacity: 1, width: compact ? "18rem" : "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute inset-auto right-1/2 h-48 w-[30rem] overflow-visible bg-gradient-conic from-indigo-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className={cn("absolute bottom-0 left-0 z-20 h-36 w-[100%]", pageBg, "[mask-image:linear-gradient(to_top,white,transparent)]")} />
          <div className={cn("absolute bottom-0 left-0 z-20 h-[100%] w-32", pageBg, "[mask-image:linear-gradient(to_right,white,transparent)]")} />
        </motion.div>
        {/* Rechts Konus: transparent -> sky */}
        <motion.div
          initial={{ opacity: 0.5, width: compact ? "9rem" : "15rem" }}
          whileInView={{ opacity: 1, width: compact ? "18rem" : "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute inset-auto left-1/2 h-48 w-[30rem] bg-gradient-conic from-transparent via-transparent to-sky-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className={cn("absolute bottom-0 right-0 z-20 h-[100%] w-32", pageBg, "[mask-image:linear-gradient(to_left,white,transparent)]")} />
          <div className={cn("absolute bottom-0 right-0 z-20 h-36 w-[100%]", pageBg, "[mask-image:linear-gradient(to_top,white,transparent)]")} />
        </motion.div>
        {/* Aufwärts-Blur für natürlichen Glow */}
        <div className={cn("absolute top-1/2 h-40 w-full blur-2xl", pageBg, topBlurTranslate)}></div>
        <div className="absolute top-1/2 z-50 h-36 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className={cn("absolute inset-auto z-50 rounded-full bg-sky-500 opacity-40 blur-3xl", haloSize, "-translate-y-1/2")}></div>
        <motion.div
          initial={{ width: compact ? "6rem" : "8rem" }}
          whileInView={{ width: compact ? "11rem" : "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className={cn("absolute inset-auto z-30 h-28 w-56 rounded-full bg-indigo-400/80 blur-2xl", glowTranslate)}
        ></motion.div>
        {showLine && (
          <motion.div
            initial={{ width: compact ? "10rem" : "15rem" }}
            whileInView={{ width: compact ? "20rem" : "30rem" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className={cn(
              "absolute inset-auto z-50 h-[3px] w-[30rem] rounded-full bg-sky-300/80 blur-[1.5px]",
              lineTranslate
            )}
          ></motion.div>
        )}
        {/* Abdeckung oben, damit nichts hart endet */}
        <div
          className={cn(
            "absolute inset-auto z-40 h-36 w-full",
            pageBg,
            compact ? "-translate-y-[7rem]" : "-translate-y-[12.5rem]"
          )}
        ></div>
      </div>

      <div className={cn("relative z-50 flex flex-col items-center px-5", compact ? "translate-y-0" : "-translate-y-80") }>
        {children}
      </div>
    </div>
  );
};


