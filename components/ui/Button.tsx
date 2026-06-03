import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variantClass: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm',
  secondary:
    'border border-brand-500 text-brand-600 hover:bg-brand-50 active:bg-brand-100',
  ghost:
    'text-ink-muted hover:text-ink hover:bg-surface-muted',
}

const sizeClass: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

type BaseProps = {
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonAsButton = BaseProps &
  ComponentPropsWithoutRef<'button'> & { href?: undefined }

type ButtonAsLink = BaseProps & { href: string; children: React.ReactNode }

type ButtonProps = ButtonAsButton | ButtonAsLink

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:focus-ring disabled:opacity-50 disabled:pointer-events-none'
  const cls = `${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`

  if ('href' in props && props.href !== undefined) {
    const { href, children } = props as ButtonAsLink
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  const { children, ...rest } = props as ButtonAsButton
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
