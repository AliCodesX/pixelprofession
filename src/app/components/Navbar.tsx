'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

interface NavItem {
    label: string;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
];



export default function Navbar() {
    const [hovered, setHovered] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-[#0b1220]/70 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between w-full">
                    {/* Brand - centered on mobile, left on desktop */}
                    <div className="flex-1 flex justify-center md:justify-start">
                        <div className="flex font-semibold">
                            <span className="text-lg tracking-tight text-slate-100">Pixel</span>
                            <span className="text-lg tracking-tight text-indigo-400">Profession</span>
                        </div>
                    </div>

                    {/* Desktop Nav - right-aligned */}
                    <nav className="hidden items-center gap-1 text-slate-300 md:flex">
                        <div className="flex items-center gap-1">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="relative px-3 py-2 text-sm font-medium hover:text-slate-100"
                                    onMouseEnter={() => setHovered(item.label)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    <motion.span
                                        initial={false}
                                        animate={{ y: hovered === item.label ? -1 : 0 }}
                                        transition={{ type: "keyframes", stiffness: 600, damping: 30 }}
                                    >
                                        {item.label}
                                    </motion.span>
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2">
                                        <AnimatePresence initial={false}>
                                            {hovered === item.label && (
                                                <motion.span
                                                    key="underline"
                                                    className="absolute left-0 bottom-0 h-0.5 w-full origin-left rounded-full bg-slate-100"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    exit={{ scaleX: 0 }}
                                                    transition={{ type: "keyframes", stiffness: 700, damping: 40 }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </nav>

                    {/* Right: Mobile Hamburger */}
                    <button
                        className="inline-flex items-center justify-center rounded-xl border border-slate-700 p-2 transition hover:bg-slate-800 active:scale-95 md:hidden text-slate-100"
                        aria-label={open ? "Close menu" : "Open menu"}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {open ? (
                                <motion.span
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                                    transition={{ type: "keyframes", stiffness: 500, damping: 30 }}
                                    className="text-2xl"
                                >
                                    <FiX />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                                    transition={{ type: "keyframes", stiffness: 500, damping: 30 }}
                                    className="text-2xl"
                                >
                                    <FiMenu />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Popover: von oben rechts (Icon) kommend, schmale Breite, rechtsbündiger Text */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="mobile-popover"
                        initial={{ opacity: 0, scale: 0.9, x: 12, y: -8 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 12, y: -8 }}
                        transition={{ type: "keyframes", stiffness: 380, damping: 30 }}
                        className="absolute right-4 top-16 z-40 md:hidden"
                        style={{ transformOrigin: "top right" }}
                    >
                        <div className="w-72 max-w-[85vw] rounded-2xl border border-slate-800 bg-[#0b1220]/95 shadow-lg backdrop-blur">
                            <ul className="flex flex-col py-2 text-right text-slate-100">
                                {NAV_ITEMS.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className="block px-5 py-3 hover:text-slate-200"
                                            onClick={() => setOpen(false)}
                                            onMouseEnter={() => setHovered(item.label)}
                                            onMouseLeave={() => setHovered(null)}
                                        >
                      <span className="relative inline-block">
                        {item.label}
                          {/* Underline L→R auch im mobilen Panel */}
                          <div className="absolute inset-x-0 -bottom-0.5 h-2">
                          <AnimatePresence initial={false}>
                            {hovered === item.label && (
                                <motion.span
                                    key="underline-mobile"
                                    className="absolute left-0 bottom-0 h-0.5 w-full origin-left rounded-full bg-slate-100"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    exit={{ scaleX: 0 }}
                                />
                            )}
                          </AnimatePresence>
                        </div>
                      </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

