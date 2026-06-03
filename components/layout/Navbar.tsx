'use client'

import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/products', label: 'Catalog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <nav className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold tracking-tight text-[#1e3a5f]">JOY</span>
          <span className="hidden sm:inline-block text-xs text-ink-faint font-medium border-l border-slate-200 pl-2 ml-1">
            Medical Aesthetics
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink rounded-full hover:bg-surface-muted transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button href="/quote-request" size="sm">
            Request a Quote
          </Button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-muted transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <ul className="container-page py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-2.5 text-sm font-medium text-ink-muted hover:text-ink rounded-xl hover:bg-surface-muted transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button href="/quote-request" size="sm" className="w-full">
                Request a Quote
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
