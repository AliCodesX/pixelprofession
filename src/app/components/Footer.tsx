'use client'
import React from 'react'

export default function Footer() {
	return (
		<footer className="border-t border-slate-800 py-10">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-slate-400">
				<p>© {new Date().getFullYear()} PixelProfession. Alle Rechte vorbehalten.</p>
				<nav className="flex gap-4">
					<a href="#home" className="hover:text-slate-200">Home</a>
					<a href="#services" className="hover:text-slate-200">Services</a>
					<a href="#faq" className="hover:text-slate-200">FAQ</a>
					<a href="#contact" className="hover:text-slate-200">Kontakt</a>
				</nav>
			</div>
		</footer>
	)
}


