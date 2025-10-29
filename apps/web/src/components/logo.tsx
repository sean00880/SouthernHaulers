'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  // Default to light logo (dark mode) until theme is resolved
  const logoSrc = resolvedTheme === 'light'
    ? '/southern-haulers-logo-dark.png'
    : '/southern-haulers-logo-light.png'

  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src={logoSrc}
        alt="Southern Haulers Logo"
        width={300}
        height={50}
        className="object-contain h-[50px] w-[300px] !max-w-none"
        priority
        style={{ maxWidth: 'none' }}
      />
    </div>
  )
}

export function LogoIcon({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  // Default to light logo (dark mode) until theme is resolved
  const logoSrc = resolvedTheme === 'light'
    ? '/southern-haulers-logo-dark.png'
    : '/southern-haulers-logo-light.png'

  return (
    <Image
      src={logoSrc}
      alt="Southern Haulers"
      width={240}
      height={40}
      className={cn("object-contain h-[40px] w-[240px] !max-w-none", className)}
      priority
      style={{ maxWidth: 'none' }}
    />
  )
}
