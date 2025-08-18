'use client'
import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

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
				<div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-2 sm:p-4">
					<ul className="divide-y divide-slate-800">
						{faqs.map((item, idx) => {
							const isOpen = open === idx
							const panelId = `faq-panel-${idx}`
							const btnId = `faq-btn-${idx}`
							return (
								<li key={item.q} className="px-2 sm:px-3">
									<button
										id={btnId}
										aria-controls={panelId}
										aria-expanded={isOpen}
										onClick={() => setOpen(isOpen ? null : idx)}
										className="flex w-full items-center justify-between py-4 text-left text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
									>
										<span className="text-base font-medium">{item.q}</span>
										<FiChevronDown className={`shrink-0 text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
									</button>
									<div
										id={panelId}
										role="region"
										aria-labelledby={btnId}
										className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
									>
										<div className="overflow-hidden pb-4 text-sm leading-6 text-slate-300">
											{item.a}
										</div>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</section>
	)
}


