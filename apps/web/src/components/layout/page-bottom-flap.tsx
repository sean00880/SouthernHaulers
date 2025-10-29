'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function PageBottomFlap() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const currentYear = new Date().getFullYear();

  // Don't show on home page
  const isHomePage = pathname === '/';

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isHomePage) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      // Show when user is within 300px of the bottom
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setIsVisible(distanceFromBottom < 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  if (isHomePage || !mounted) return null;

  const southernHaulersLogo = resolvedTheme === 'light'
    ? '/southern-haulers-logo-dark.png'
    : '/southern-haulers-logo-light.png';

  const growszLogo = resolvedTheme === 'dark'
    ? '/images/Growsz-dark.png'
    : '/images/Growsz-light.png';

  return (
    <>
      {/* Center Trapezium - Southern Haulers Logo */}
      <div
        className={cn(
          'fixed bottom-0 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 ease-out',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        )}
      >
        <div className="relative group perspective-1000">
          {/* Depth layers for 3D effect */}
          <div className="absolute inset-0 translate-y-2 blur-xl bg-black/20 dark:bg-black/40"
               style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)' }} />
          <div className="absolute inset-0 translate-y-1 blur-md bg-black/10 dark:bg-black/30"
               style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)' }} />

          {/* Main Trapezium Flap */}
          <div
            className="relative bg-gradient-to-b from-background via-background to-muted/50
                       border-t-2 border-l border-r border-border/50
                       backdrop-blur-xl
                       shadow-2xl shadow-black/30
                       overflow-hidden
                       group-hover:shadow-black/40
                       transition-all duration-500"
            style={{
              clipPath: 'polygon(8% 0, 92% 0, 100% 100%, 0% 100%)',
              minWidth: '450px',
              padding: '0.75rem 2rem',
            }}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Top accent line */}
            <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Content - Two Columns */}
            <div className="relative z-10 flex items-center gap-4">
              {/* Left Column - Southern Haulers Logo */}
              <div className="relative group/logo flex-1">
                <div className="absolute inset-0 blur-xl bg-primary/20 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                <Image
                  src={southernHaulersLogo}
                  alt="Southern Haulers"
                  width={180}
                  height={28}
                  className="object-contain h-6 w-auto relative z-10 drop-shadow-lg group-hover/logo:scale-105 transition-transform duration-300"
                  priority
                />
              </div>

              {/* Vertical Divider */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-3 bg-gradient-to-b from-transparent via-border to-border/50" />
                <div className="w-1 h-1 rounded-full bg-primary/30" />
                <div className="w-px h-3 bg-gradient-to-b from-border/50 via-border to-transparent" />
              </div>

              {/* Right Column - Copyright (Single Line) */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-xs text-muted-foreground/70 whitespace-nowrap">
                  © {currentYear} All rights reserved
                </div>
              </div>
            </div>

            {/* Side edge accents */}
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
          </div>

          {/* Bottom glow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-lg opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" />
        </div>
      </div>

      {/* Bottom Right - Powered by GROWSZ (Truck Flap) */}
      <div
        className={cn(
          'fixed bottom-0 right-6 z-30 transition-all duration-700 ease-out delay-100',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        )}
      >
        <div className="relative group">
          {/* Depth layers for 3D truck flap */}
          <div className="absolute inset-0 translate-y-2 blur-xl bg-black/20 dark:bg-black/40"
               style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 35%)' }} />
          <div className="absolute inset-0 translate-y-1 blur-md bg-black/10 dark:bg-black/30"
               style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 35%)' }} />

          {/* Truck Flap Shape */}
          <div
            className="relative bg-gradient-to-b from-background via-background to-muted/50
                       border-t-2 border-r border-b border-border/50
                       backdrop-blur-xl
                       shadow-2xl shadow-black/30
                       overflow-hidden
                       group-hover:shadow-black/40
                       transition-all duration-500"
            style={{
              clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 35%)',
              minWidth: '200px',
              padding: '0.75rem 1.5rem',
            }}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Content */}
            <Link
              href="https://growsz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 flex items-center justify-center gap-2 group/growsz"
            >
              <span className="text-xs text-muted-foreground/60 group-hover/growsz:text-muted-foreground transition-colors whitespace-nowrap">
                Powered by
              </span>
              <div className="relative h-8 w-18 overflow-hidden before:content-[''] before:absolute before:top-[-120%] before:left-[-120%] before:w-[200%] before:h-[200%] before:bg-[linear-gradient(-45deg,transparent_0%,rgba(255,255,255,0.1)_45%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0.1)_55%,transparent_100%)] before:rotate-[-45deg] before:pointer-events-none before:opacity-0 group-hover/growsz:before:opacity-100 group-hover/growsz:before:animate-[shine_1.2s_ease-out_forwards]">
                {/* GROWSZ logo */}
                <Image
                  src={growszLogo}
                  alt="GROWSZ"
                  width={96}
                  height={32}
                  className="object-contain h-8 w-auto relative z-10 group-hover/growsz:scale-105 transition-transform duration-300"
                  priority
                />
                {/* Glow effect */}
                <span className="absolute inset-0 blur-md bg-primary/20 opacity-0
                               group-hover/growsz:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </Link>

            {/* Right edge accent */}
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
          </div>

          {/* Truck cab edge effect */}
          <div
            className="absolute left-0 top-0 w-8 h-6 bg-background/30 backdrop-blur-sm border-l border-t border-border/50"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          />

          {/* Bottom glow */}
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </>
  );
}
