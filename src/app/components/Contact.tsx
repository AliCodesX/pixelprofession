'use client'
import React, { useState } from 'react'
import { Button } from '@/app/components/Button'
import emailjs from '@emailjs/browser'

export default function Contact() {
	const [sending, setSending] = useState(false)
	const [status, setStatus] = useState<string | null>(null)

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		setSending(true)
		setStatus(null)
		try {
			const templateParams = {
				from_name: String(formData.get('name') || ''),
				from_email: String(formData.get('email') || ''),
				message: String(formData.get('message') || ''),
			}
			const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string
			const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string
			const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
			await emailjs.send(serviceId, templateId, templateParams, { publicKey })
			setStatus('success')
			e.currentTarget.reset()
		} catch (e) {
			setStatus('error')
		} finally {
			setSending(false)
		}
	}

	return (
		<section id="contact" className="py-24 md:py-32">
			<div className="mx-auto max-w-3xl px-6">
				<h2 className="text-center text-3xl font-bold text-slate-100 sm:text-4xl">Kontakt</h2>
				<form onSubmit={onSubmit} className="mt-10 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
					<div className="grid gap-4 sm:grid-cols-2">
						<label className="block text-sm text-slate-300">
							<span>Name</span>
							<input
								name="name"
								required
								type="text"
								className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-0 focus:border-indigo-500"
							/>
						</label>
						<label className="block text-sm text-slate-300">
							<span>E-Mail</span>
							<input
								name="email"
								required
								type="email"
								className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-0 focus:border-indigo-500"
							/>
						</label>
					</div>
					<label className="block text-sm text-slate-300">
						<span>Nachricht</span>
						<textarea
							name="message"
							required
							rows={5}
							className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-0 focus:border-indigo-500"
						/>
					</label>

					<div className="pt-2">
						<Button as="button" type="submit" foreground="primary" disabled={sending}>
							{sending ? 'Wird gesendet…' : 'Nachricht senden'}
						</Button>
					</div>
					{status === 'success' && (
						<p className="text-sm text-emerald-400">Danke! Wir melden uns in Kürze.</p>
					)}
					{status === 'error' && (
						<p className="text-sm text-rose-400">Ups, da ist etwas schiefgelaufen.</p>
					)}
				</form>
			</div>
		</section>
	)
}


