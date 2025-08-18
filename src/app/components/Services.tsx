'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/Button'

const services = [
	{
		title: 'Webentwicklung',
		desc:
			'Individuelle Websites, perfekt auf Ihr Business zugeschnitten. Performance, SEO und UX im Fokus.',
	},
	{
		title: 'Shopify Onlineshops',
		desc:
			'Konzeption, Setup und Launch maßgeschneiderter Shopify-Stores inkl. Apps, Payment & Checkout.',
	},
	{
		title: 'Wartung & Weiterentwicklung',
		desc:
			'Laufende Betreuung, neue Features und technische Optimierungen – alles aus einer Hand.',
	},
]

export default function Services() {
	return (
		<section id="services" className="py-24 md:py-32">
			<div className="mx-auto max-w-6xl px-6">
				<motion.h2
					initial={{ opacity: 0, y: 8 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center text-3xl font-bold text-slate-100 sm:text-4xl"
				>
					Unsere Services
				</motion.h2>
				<div className="mt-8 grid gap-6 sm:gap-8 md:grid-cols-3">
					{services.map((s) => (
						<motion.div
							key={s.title}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.5 }}
							className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-sm backdrop-blur-sm"
						>
							<h3 className="text-lg font-semibold text-slate-100">{s.title}</h3>
							<p className="mt-2 text-sm leading-6 text-slate-300">{s.desc}</p>
							<div className="mt-6">
								<Button as="a" href="#contact"  foreground="default" size="small">
									Mehr erfahren
								</Button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}


