'use client'
import React, { useLayoutEffect, useRef } from 'react'
import { Button } from '@/app/components/Button'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { TypewriterRotateSmooth } from '@/app/components/Typewriter'

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
						<span className="mt-2 block bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400 bg-clip-text text-indigo-400 hero-line">
							PixelProfession
						</span>
					</motion.h1>
					<div className="mt-6 flex justify-center">
						<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
							<TypewriterRotateSmooth
								words={[

									{ text: 'Seriöses Auftreten für dein Unternehmen.' },
									{ text: 'Professionelles Design abgestimmt auf deinen Wunsch.' },
									{ text: 'Fokussiert auf dein Business.' },
									{ text: 'Suchmaschinenoptimiert für mehr Sichtbarkeit.' },
								]}
								typingMs={70}
								deletingMs={100}
								pauseMs={1000}
							/>
						</motion.div>
					</div>
					<div className="mt-10 flex items-center justify-center gap-4 hero-cta">
						<Button as="a" href="#services" foreground="primary" background="default" className="text-white">
							Unsere Services
						</Button>
						<Button as="a" href="#contact" isGhost foreground="primary" className="text-white">
							Kontakt aufnehmen
						</Button>
					</div>
				</div>
			</motion.div>
			<div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
				<motion.div style={{ y: upperBgTranslateY }} className="absolute -top-24 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-indigo-600 blur-[120px]" />
				<motion.div style={{ y: lowerBgTranslateY }} className="absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-sky-600 blur-[120px]" />
			</div>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0b1220]" />
		</section>
	)
}


