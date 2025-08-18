'use client'
import React, { useLayoutEffect, useRef } from 'react'
import { Button } from '@/app/components/Button'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'

export default function Hero() {
	const containerRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		if (!containerRef.current) return
		const ctx = gsap.context(() => {
			gsap.from('.hero-line', {
				y: 30,
				opacity: 0,
				stagger: 0.15,
				duration: 0.8,
				ease: 'power3.out',
			})
			gsap.from('.hero-cta', { opacity: 0, y: 20, delay: 0.6, duration: 0.8, ease: 'power3.out' })
		}, containerRef)
		return () => ctx.revert()
	}, [])

	// Parallax
	const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
	const titleTranslateY = useTransform(scrollYProgress, [0, 1], [0, -60])
	const upperBgTranslateY = useTransform(scrollYProgress, [0, 1], [0, 40])
	const lowerBgTranslateY = useTransform(scrollYProgress, [0, 1], [0, -40])

	const typedText = 'Mehr Sichtbarkeit. Mehr Umsatz. Mehr Zeit fürs Wesentliche.'

	return (
		<section id="home" ref={containerRef} className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
			<motion.div style={{ y: titleTranslateY }}>
				<div className="mx-auto max-w-6xl px-6 text-center">
					<motion.h1
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-4xl font-extrabold tracking-tight text-slate-100 sm:text-6xl"
					>
						<span className="block hero-line">Willkommen bei</span>
						<span className="mt-2 block bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400 bg-clip-text text-transparent hero-line">
							PixelProfession
						</span>
					</motion.h1>
					<p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 hero-line">
						Wir bauen moderne Websites und Shopify-Shops – schnell, individuell und fokussiert auf Ihr Business.
					</p>
					<div className="mt-4 flex justify-center">
						<p className="font-mono text-slate-200/90 text-sm sm:text-base whitespace-pre">
							{typedText.split('').map((char, i) => (
								<motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 + i * 0.03, duration: 0.02 }}>
									{char}
								</motion.span>
							))}
							<span className="hero-caret">|</span>
						</p>
					</div>
					<div className="mt-10 flex items-center justify-center gap-4 hero-cta">
						<Button as="a" href="#services" foreground="primary" background="default">
							Unsere Services
						</Button>
						<Button as="a" href="#contact" isGhost foreground="primary">
							Kontakt aufnehmen
						</Button>
					</div>
				</div>
			</motion.div>
			<div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
				<motion.div style={{ y: upperBgTranslateY }} className="absolute -top-24 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-indigo-600 blur-[120px]" />
				<motion.div style={{ y: lowerBgTranslateY }} className="absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-sky-600 blur-[120px]" />
			</div>
			{/* Unterer Farb-Fade für weichen Abschluss */}
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0b1220]" />

			<style jsx>{`
				@keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
				.hero-caret { display: inline-block; width: 1ch; color: #94a3b8; animation: blink 1s step-end infinite }
			`}</style>
		</section>
	)
}


