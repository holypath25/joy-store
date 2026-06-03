type BadgeVariant = 'brand' | 'slate' | 'green' | 'amber'

const variantClass: Record<BadgeVariant, string> = {
  brand: 'bg-brand-100 text-brand-700',
  slate: 'bg-slate-100 text-slate-600',
  green: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
}

export default function Badge({
  children,
  variant = 'slate',
  className = '',
}: {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClass[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
