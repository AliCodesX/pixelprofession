'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import React, { type ComponentProps, type ReactNode } from 'react'

const buttonVariants = cva(
	'relative isolate flex justify-center items-center select-none overflow-hidden rounded-sm border align-middle transition-all duration-500 before:absolute before:-start-3 before:top-0 before:-z-10 before:h-full before:w-[calc(100%+1.5rem)] before:origin-left before:-skew-x-[16deg] before:scale-x-0 before:transition-transform before:duration-500 hover:not-disabled:before:scale-x-100 focus-visible:not-disabled:before:scale-x-100 active:not-disabled:scale-[1.01] disabled:opacity-70 not-disabled:active:scale-90',
	{
		variants: {
			foreground: {
				default: 'border-slate-200',
				primary: 'border-indigo-500',
				error: 'border-rose-500',
			},
			background: {
				default: '',
				primary: '',
			},
			size: {
				small: 'px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base',
				medium: 'px-6 py-3 md:text-lg hover:not-disabled:tracking-[0.075em]',
				large: 'px-6 py-3 md:px-8 md:py-4 md:text-lg hover:not-disabled:tracking-[0.075em]',
			},
			isGhost: {
				true: '',
			},
		},
		compoundVariants: [
			{
				isGhost: false,
				foreground: 'primary',
				className: 'bg-indigo-500 hover:not-disabled:text-indigo-500 focus-visible:text-indigo-500',
			},
			{
				isGhost: true,
				background: 'primary',
				className: 'hover:not-disabled:text-indigo-500 focus-visible:text-indigo-500',
			},
			{
				isGhost: true,
				foreground: 'primary',
				className: 'text-indigo-500 before:bg-indigo-500',
			},
			{
				isGhost: false,
				background: 'primary',
				className: 'text-indigo-500 before:bg-indigo-500',
			},
			{
				isGhost: false,
				foreground: 'default',
				className:
					'bg-slate-100 hover:not-disabled:text-slate-100 focus-visible:text-slate-100',
			},
			{
				isGhost: true,
				background: 'default',
				className: 'hover:not-disabled:text-slate-900 focus-visible:text-slate-900',
			},
			{
				isGhost: true,
				foreground: 'default',
				className: 'text-slate-100 before:bg-slate-100',
			},
			{
				isGhost: false,
				background: 'default',
				className: 'text-slate-900 before:bg-slate-900',
			},
			{
				isGhost: false,
				foreground: 'error',
				className: 'bg-rose-500 hover:not-disabled:text-rose-500 focus-visible:text-rose-500',
			},
			{
				isGhost: true,
				foreground: 'error',
				className: 'text-rose-500 before:bg-rose-500',
			},
		],
		defaultVariants: {
			foreground: 'default',
			background: 'default',
			size: 'medium',
			isGhost: false,
		},
	}
)

type ButtonProps = (
	|
		(ComponentProps<'button'> & {
			as?: 'button'
			type: 'button' | 'submit' | 'reset'
		})
	|
		(ComponentProps<'a'> & {
			as: 'a'
			href: string
		})
) & { children: ReactNode } & VariantProps<typeof buttonVariants>

export function Button(props: ButtonProps) {
	if (props.as === 'a') {
		const { foreground, background, size, isGhost, ref, children, className, ...restProps } =
			props

		return (
			<a
				className={cn(
					buttonVariants({
						foreground,
						background,
						size,
						isGhost,
						className,
					}),
				)}
				{...restProps}
			>
				{children}
			</a>
		)
	}

	const { foreground, background, size, isGhost, ref, children, className, ...restProps } = props

	return (
		<button
			className={cn(
				buttonVariants({
					foreground,
					background,
					size,
					isGhost,
					className,
				}),
			)}
			data-slot="button"
			ref={ref as any}
			{...restProps}
		>
			{children}
		</button>
	)
}

export { buttonVariants }


