'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
	{
		q: 'Wie lange dauert ein Website-Projekt?',
		a: 'Je nach Umfang zwischen 2–6 Wochen. Express-Umsetzungen sind nach Absprache möglich.'
	},
	{
		q: 'Bietet ihr auch Shopify-Shops an?',
		a: 'Ja, von der Konzeption bis zum Launch inkl. Zahlungsabwicklung, Apps und Performance-Tuning.'
	},
	{
		q: 'Übernehmt ihr Wartung & Updates?',
		a: 'Ja. Wir bieten flexible Wartungs- und Weiterentwicklungs-Pakete.'
	}
]

export default function FAQ() {
	const [open, setOpen] = useState<number | null>(0)
	return (
		<section id="faq" className="py-24 md:py-32">
			<div className="mx-auto max-w-3xl px-6">
				<h2 className="text-center text-3xl font-bold text-slate-100 sm:text-4xl">FAQ</h2>
				<div className="mt-10 divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900 p-6">
					{faqs.map((item, idx) => {
						const isOpen = open === idx
						return (
							<div key={item.q} className="px-2 py-3">
								<button
									className="flex w-full items-center justify-between text-left text-slate-100"
									onClick={() => setOpen(isOpen ? null : idx)}
								>
									<span className="text-base font-medium">{item.q}</span>
									<span className="ml-4 text-slate-400">{isOpen ? '-' : '+'}</span>
								</button>
								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.p
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.25 }}
											className="overflow-hidden pt-2 text-sm leading-6 text-slate-300"
										>
											{item.a}
										</motion.p>
									)}
								</AnimatePresence>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}


