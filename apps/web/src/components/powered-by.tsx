'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function PoweredBy() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-32 animate-pulse bg-muted rounded" />
    );
  }

  // Determine which logo to show based on theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';
  const logoSrc = isDark
    ? '/images/growsz-logo-dark.png'
    : '/images/growsz-logo-light.png';

  return (
    <a
      href="https://growsz.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-caption text-muted-foreground hover:text-foreground transition-all duration-300"
      aria-label="Powered by GROWSZ"
    >
      <span className="relative">
        <span className="block transition-transform duration-300 group-hover:scale-105">
          Powered by
        </span>
        {/* Underline animation */}
        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
      </span>

      {/* Logo with hover effects */}
      <div className="relative h-10 w-32 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110">
        <Image
          src={logoSrc}
          alt="GROWSZ Logo"
          fill
          className="object-contain"
          priority
        />

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-gradient-to-r from-primary/20 to-secondary/20 -z-10" />
      </div>
    </a>
  );
}
