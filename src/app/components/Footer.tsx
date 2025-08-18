'use client'
import React from 'react'
import { FaTiktok, FaInstagram } from 'react-icons/fa6'

export default function Footer() {
	return (
		<footer className="border-t border-slate-800 py-10">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-slate-400">
				<p>© {new Date().getFullYear()} PixelProfession. Alle Rechte vorbehalten.</p>
				<nav className="flex items-center gap-4">
					<a href="#home" className="hover:text-slate-200">Home</a>
					<a href="#services" className="hover:text-slate-200">Services</a>
					<a href="#faq" className="hover:text-slate-200">FAQ</a>
					<a href="#contact" className="hover:text-slate-200">Kontakt</a>
					<span className="mx-2 h-5 w-px bg-slate-700" />
					<a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" className="text-xl hover:text-white">
						<FaTiktok />
					</a>
					<a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-xl hover:text-white">
						<FaInstagram />
					</a>
				</nav>
			</div>
		</footer>
	)
}


