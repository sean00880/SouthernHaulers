'use client'

import Link from 'next/link'
import { Logo, LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Menu, X, Shield, Truck, MapPin, Package, Container, Warehouse, Ship, Users, FileText, BarChart3, Smartphone, Headphones, Briefcase, GraduationCap, Phone } from 'lucide-react'
import { useMedia } from '@/hooks/use-media'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '../../components/theme-toggle'

interface FeatureLink {
    href: string
    name: string
    description?: string
    icon: React.ReactElement
}

interface MobileLink {
    groupName?: string
    links?: FeatureLink[]
    name?: string
    href?: string
}

// About Menu Features
const aboutFeatures: FeatureLink[] = [
    {
        href: '/about',
        name: 'Our Story',
        description: 'Learn about Southern Haulers',
        icon: <Truck className="stroke-foreground fill-blue-500/15" />,
    },
    {
        href: '/about#team',
        name: 'Leadership Team',
        description: 'Meet our experienced team',
        icon: <Users className="stroke-foreground fill-indigo-500/15" />,
    },
    {
        href: '/about#certifications',
        name: 'TWIC Certified',
        description: 'Port security compliant',
        icon: <Shield className="stroke-foreground fill-green-500/15" />,
    },
]

// Services Menu - Container Drayage & Agricultural Hauling
const coreServices: FeatureLink[] = [
    {
        href: '/services/container-drayage',
        name: 'Container Drayage',
        description: 'Port to destination container transport',
        icon: <Container className="stroke-foreground fill-blue-500/15" />,
    },
    {
        href: '/services/agricultural-hauling',
        name: 'Agricultural Hauling',
        description: 'Farm equipment & produce transport',
        icon: <Truck className="stroke-foreground fill-green-500/15" />,
    },
    {
        href: '/services/warehousing',
        name: 'Warehousing & Transloading',
        description: '300+ container capacity storage',
        icon: <Warehouse className="stroke-foreground fill-orange-500/15" />,
    },
]

const portServices: FeatureLink[] = [
    {
        href: '/ports/savannah',
        name: 'Port of Savannah',
        description: 'Direct service to Georgia Port',
        icon: <Ship className="stroke-foreground fill-teal-500/15" />,
    },
    {
        href: '/ports/charleston',
        name: 'Charleston Harbor',
        description: 'South Carolina port access',
        icon: <Ship className="stroke-foreground fill-blue-500/15" />,
    },
    {
        href: '/ports/jacksonville',
        name: 'JAXPORT',
        description: 'Florida port operations',
        icon: <Ship className="stroke-foreground fill-indigo-500/15" />,
    },
    {
        href: '/services/gps-tracking',
        name: 'Real-Time GPS Tracking',
        description: 'Live shipment visibility',
        icon: <MapPin className="stroke-foreground fill-red-500/15" />,
    },
    {
        href: '/services/24-7-dispatch',
        name: '24/7 Dispatch',
        description: 'Always available support',
        icon: <Headphones className="stroke-foreground fill-purple-500/15" />,
    },
    {
        href: '/services/compliance',
        name: 'FMCSA Compliant',
        description: 'Fully regulated operations',
        icon: <Shield className="stroke-foreground fill-green-500/15" />,
    },
]

// Solutions Menu
const toolsSolutions: FeatureLink[] = [
    {
        href: '/solutions/tms-platform',
        name: 'TMS Platform',
        description: 'Advanced transportation management',
        icon: <BarChart3 className="stroke-foreground fill-blue-500/15" />,
    },
    {
        href: '/solutions/tracking',
        name: 'GPS Tracking',
        description: 'Real-time location updates',
        icon: <MapPin className="stroke-foreground fill-red-500/15" />,
    },
    {
        href: '/solutions/mobile-app',
        name: 'Driver Mobile App',
        description: 'Offline-capable PWA',
        icon: <Smartphone className="stroke-foreground fill-purple-500/15" />,
    },
    {
        href: '/solutions/documentation',
        name: 'Digital Documentation',
        description: 'Paperless BOL & POD',
        icon: <FileText className="stroke-foreground fill-zinc-500/15" />,
    },
]

const industrySolutions: FeatureLink[] = [
    {
        href: '/industries/import-export',
        name: 'Import/Export',
        description: 'International trade logistics',
        icon: <Package className="stroke-foreground fill-blue-500/15" />,
    },
    {
        href: '/industries/agriculture',
        name: 'Agriculture',
        description: 'Farm-to-market solutions',
        icon: <Truck className="stroke-foreground fill-green-500/15" />,
    },
    {
        href: '/industries/manufacturing',
        name: 'Manufacturing',
        description: 'Supply chain integration',
        icon: <Container className="stroke-foreground fill-orange-500/15" />,
    },
]

// Partners Menu
const partnerLinks: FeatureLink[] = [
    {
        href: '/careers/drivers',
        name: 'Driver Opportunities',
        description: 'Join our team of professional drivers',
        icon: <GraduationCap className="stroke-foreground fill-blue-500/15" />,
    },
    {
        href: '/partners/become-partner',
        name: 'Partnership Program',
        description: 'Collaborate with Southern Haulers',
        icon: <Briefcase className="stroke-foreground fill-purple-500/15" />,
    },
    {
        href: '/contact',
        name: 'Contact Sales',
        description: '24/7 dispatch & quotes',
        icon: <Phone className="stroke-foreground fill-green-500/15" />,
    },
]

const resourceLinks: FeatureLink[] = [
    { name: 'Case Studies', href: '/resources/case-studies', icon: <FileText className="stroke-foreground fill-blue-500/15" /> },
    { name: 'Blog', href: '/blog', icon: <FileText className="stroke-foreground fill-purple-500/15" /> },
    { name: 'Support Center', href: '/support', icon: <Headphones className="stroke-foreground fill-green-500/15" /> },
]

const mobileLinks: MobileLink[] = [
    {
        groupName: 'About',
        links: aboutFeatures,
    },
    {
        groupName: 'Services',
        links: [...coreServices, ...portServices],
    },
    {
        groupName: 'Solutions',
        links: [...toolsSolutions, ...industrySolutions, ...resourceLinks],
    },
    {
        groupName: 'Partners',
        links: partnerLinks,
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
]

export default function HeaderOne() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const isLarge = useMedia('(min-width: 64rem)')
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 75)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            role="banner"
            data-state={isMobileMenuOpen ? 'active' : 'inactive'}
            {...(isScrolled && { 'data-scrolled': true })}
            className="bg-background [--color-popover:color-mix(in_oklch,var(--color-muted)_25%,var(--color-background))]">
            <div className={cn('relative', 'not-in-data-scrolled:has-data-[state=open]:[--viewport-translate:-4rem]', !isLarge && 'in-data-scrolled:border-b in-data-scrolled:border-foreground/5 in-data-scrolled:backdrop-blur in-data-scrolled:bg-card/50 fixed inset-x-0 top-0 z-50 h-16 overflow-hidden', 'max-lg:in-data-[state=active]:bg-card/50 max-lg:in-data-[state=active]:h-screen max-lg:in-data-[state=active]:backdrop-blur')}>
                <div className="mx-auto max-w-6xl px-6">
                    <div className="max-lg:not-in-data-[state=active]:h-16 relative flex flex-wrap items-center justify-between py-1.5 lg:py-5">
                        <div className="max-lg:in-data-[state=active]:border-foreground/5 max-lg:in-data-[state=active]:border-b flex items-center justify-between gap-8 max-lg:h-14 max-lg:w-full">
                            <Link
                                href="/"
                                aria-label="home">
                                <Logo className="h-5" />
                            </Link>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-3 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        {isLarge && (
                            <motion.div
                                animate={{ width: 'fit-content', gap: 8 }}
                                className="bg-popover/50 ring-background inset-shadow-sm inset-shadow-white/[0.02] border-foreground/5 fixed inset-x-0 top-6 z-50 mx-auto size-fit max-w-4xl rounded-xl border p-1.5 shadow-xl shadow-black/25 ring-1 backdrop-blur-xl">
                                <div className="flex items-center gap-2">
                                    <AnimatePresence>
                                        {isScrolled && (
                                            <motion.div
                                                key="logo"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: '3rem' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="before:bg-gradient-to-b before:from-foreground/10 before:to-foreground/5 before:border-background/75 relative before:absolute before:inset-y-1 before:right-0 before:w-px before:rounded before:border-r before:shadow-sm">
                                                <Link
                                                    href="/"
                                                    aria-label="home"
                                                    className="hover:bg-foreground/5 flex size-7 rounded-md transition-colors">
                                                    <LogoIcon className="m-auto size-4" />
                                                </Link>
                                            </motion.div>
                                        )}
                                        <NavMenu key="nav-menu" />
                                        {isScrolled && (
                                            <>
                                                <motion.div
                                                    key="theme-toggle"
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    className="overflow-hidden flex items-center before:bg-gradient-to-b before:from-foreground/10 before:to-foreground/5 before:border-background/75 relative before:absolute before:inset-y-1 before:left-0 before:w-px before:rounded before:border-l before:shadow-sm pl-2">
                                                    <ThemeToggle />
                                                </motion.div>
                                                <motion.div
                                                    key="cta-buttons"
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    className="overflow-hidden flex items-center gap-2 before:bg-gradient-to-b before:from-foreground/10 before:to-foreground/5 before:border-background/75 relative before:absolute before:inset-y-1 before:left-0 before:w-px before:rounded before:border-l before:shadow-sm pl-4">
                                                    <Button
                                                        asChild
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-7 text-xs">
                                                        <Link href="/login">
                                                            <span>Login</span>
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        asChild
                                                        size="sm"
                                                        className="h-7 text-xs">
                                                        <Link href="/quote">
                                                            <span>Get Started</span>
                                                        </Link>
                                                    </Button>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                        {!isLarge && isMobileMenuOpen && <MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} />}

                        <div className="max-lg:in-data-[state=active]:mt-6 in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <div className="flex items-center justify-center mb-4 sm:mb-0">
                                    <ThemeToggle />
                                </div>
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="sm">
                                    <Link href="/login">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm">
                                    <Link href="/quote">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
    return (
        <nav
            role="navigation"
            className="w-full [--color-border:--alpha(var(--color-foreground)/5%)] [--color-muted:--alpha(var(--color-foreground)/5%)]">
            <Accordion
                type="single"
                collapsible
                className="**:hover:no-underline -mx-4 mt-0.5 space-y-0.5">
                {mobileLinks.map((link, index) => {
                    if (link.groupName && link.links) {
                        return (
                            <AccordionItem
                                key={index}
                                value={link.groupName}
                                className="before:border-border group relative border-b-0 before:pointer-events-none before:absolute before:inset-x-4 before:bottom-0 before:border-b">
                                <AccordionTrigger className="**:!font-normal data-[state=open]:bg-muted flex items-center justify-between px-4 py-3 text-lg">{link.groupName}</AccordionTrigger>
                                <AccordionContent className="pb-5">
                                    <ul>
                                        {link.links.map((feature, featureIndex) => (
                                            <li key={featureIndex}>
                                                <Link
                                                    href={feature.href}
                                                    onClick={closeMenu}
                                                    className="grid grid-cols-[auto_1fr] items-center gap-2.5 px-4 py-2">
                                                    <div
                                                        aria-hidden
                                                        className="flex items-center justify-center *:size-4">
                                                        {feature.icon}
                                                    </div>
                                                    <div className="text-base">{feature.name}</div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    }
                    return null
                })}
            </Accordion>
            {mobileLinks.map((link, index) => {
                if (link.name && link.href) {
                    return (
                        <Link
                            key={index}
                            href={link.href}
                            onClick={closeMenu}
                            className="group relative block border-0 border-b py-4 text-lg">
                            {link.name}
                        </Link>
                    )
                }
                return null
            })}
        </nav>
    )
}

const NavMenu = () => {
    const menuRef = React.useRef<React.ElementRef<typeof NavigationMenu>>(null)

    const handleViewportHeight = () => {
        requestAnimationFrame(() => {
            const menuNode = menuRef.current
            if (!menuNode) return

            const openContent = document.querySelector<HTMLElement>('[data-slot="navigation-menu-viewport"][data-state="open"]')

            if (openContent) {
                const height = openContent.scrollHeight
                document.documentElement.style.setProperty('--navigation-menu-viewport-height', `${height}px`)
            } else {
                document.documentElement.style.removeProperty('--navigation-menu-viewport-height')
            }
        })
    }

    return (
        <NavigationMenu
            ref={menuRef}
            onValueChange={handleViewportHeight}
            className="**:data-[slot=navigation-menu-viewport]:translate-x-(--viewport-translate) **:data-[slot=navigation-menu-viewport]:transition-all **:data-[slot=navigation-menu-viewport]:min-w-[600px] **:data-[slot=navigation-menu-viewport]:max-w-4xl **:data-[slot=navigation-menu-viewport]:bg-[color-mix(in_oklch,var(--color-muted)_25%,var(--color-background))] max-lg:hidden">
            <NavigationMenuList className="**:data-[slot=navigation-menu-trigger]:h-7 **:data-[slot=navigation-menu-trigger]:text-foreground/75 **:data-[slot=navigation-menu-trigger]:px-3 **:data-[slot=navigation-menu-trigger]:text-sm gap-1">
                {/* About Menu - Visual on LEFT */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>About</NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full origin-top p-0.5 pb-1">
                        <div className="border-foreground/5 bg-card ring-foreground/5 rounded-[calc(var(--radius)-2px)] border border-transparent p-2 shadow ring-1">
                            <div className="grid grid-cols-[auto_1fr] gap-4 divide-x divide-foreground/10">
                                {/* Visual Column - LEFT */}
                                <div className="w-48 pr-4">
                                    <span className="text-muted-foreground ml-2 text-xs">About Us</span>
                                    <div className="bg-linear-to-br inset-ring-foreground/10 inset-ring-1 relative mt-2 overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-white/50 to-green-200 p-3 transition-colors duration-200 hover:from-blue-100">
                                        <div className="flex items-center justify-center h-24 mb-2">
                                            <Truck className="w-12 h-12 text-primary/40" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <Link href="/about" className="text-foreground text-sm font-semibold block hover:underline">
                                                Premier Drayage
                                            </Link>
                                            <p className="text-muted-foreground text-xs">98.5% on-time, TWIC certified</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Features Column */}
                                <div className="pl-4">
                                    <span className="text-muted-foreground ml-2 text-xs">Company</span>
                                    <ul className="mt-1 space-y-2">
                                        {aboutFeatures.map((feature, index) => (
                                            <ListItem
                                                key={index}
                                                href={feature.href}
                                                title={feature.name}
                                                description={feature.description}>
                                                {feature.icon}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Services Menu - Visual on RIGHT */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full origin-top p-0.5 pb-1">
                        <div className="border-foreground/5 bg-card ring-foreground/5 rounded-[calc(var(--radius)-2px)] border border-transparent p-2 shadow ring-1">
                            <div className="grid grid-cols-[1fr_1fr_auto] gap-4 divide-x divide-foreground/10">
                                {/* Core Services */}
                                <div className="pr-4">
                                    <span className="text-muted-foreground ml-2 text-xs">Core Services</span>
                                    <ul className="mt-1 space-y-2">
                                        {coreServices.map((service, index) => (
                                            <ListItem
                                                key={index}
                                                href={service.href}
                                                title={service.name}
                                                description={service.description}>
                                                {service.icon}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                                {/* Port Services */}
                                <div className="px-4">
                                    <span className="text-muted-foreground ml-2 text-xs">Ports & Support</span>
                                    <ul className="mt-1 space-y-2">
                                        {portServices.slice(0, 3).map((service, index) => (
                                            <ListItem
                                                key={index}
                                                href={service.href}
                                                title={service.name}
                                                description={service.description}>
                                                {service.icon}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                                {/* Visual Column - RIGHT */}
                                <div className="w-48 pl-4">
                                    <span className="text-muted-foreground ml-2 text-xs">Track Live</span>
                                    <div className="bg-linear-to-br inset-ring-foreground/10 inset-ring-1 relative mt-2 overflow-hidden rounded-lg bg-gradient-to-br from-teal-50 via-white/50 to-blue-200 p-3 transition-colors duration-200 hover:from-teal-100">
                                        <div className="flex items-center justify-center h-24 mb-2">
                                            <MapPin className="w-12 h-12 text-red-500/40" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <Link href="/track" className="text-foreground text-sm font-semibold block hover:underline">
                                                GPS Tracking
                                            </Link>
                                            <p className="text-muted-foreground text-xs">Real-time updates & ETAs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Solutions Menu */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-lg origin-top p-0.5 pb-1">
                        <div className="border-foreground/5 bg-card ring-foreground/5 rounded-[calc(var(--radius)-2px)] border border-transparent p-2 shadow ring-1">
                            <div className="grid grid-cols-2 gap-4 divide-x divide-foreground/10">
                                <div className="pr-4">
                                    <span className="text-muted-foreground ml-2 text-xs">Tools & Technology</span>
                                    <ul className="mt-1 space-y-2">
                                        {toolsSolutions.map((tool, index) => (
                                            <ListItem
                                                key={index}
                                                href={tool.href}
                                                title={tool.name}
                                                description={tool.description}>
                                                {tool.icon}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pl-4">
                                    <span className="text-muted-foreground ml-2 text-xs">Industries</span>
                                    <ul className="mt-1 space-y-2">
                                        {industrySolutions.map((industry, index) => (
                                            <ListItem
                                                key={index}
                                                href={industry.href}
                                                title={industry.name}
                                                description={industry.description}>
                                                {industry.icon}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Partners Menu */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Partners</NavigationMenuTrigger>
                    <NavigationMenuContent className="w-full origin-top p-0.5 pb-1">
                        <div className="border-foreground/5 bg-card ring-foreground/5 rounded-[calc(var(--radius)-2px)] border border-transparent p-2 shadow ring-1">
                            <span className="text-muted-foreground ml-2 text-xs">Join Us</span>
                            <ul className="mt-1 space-y-2">
                                {partnerLinks.map((partner, index) => (
                                    <ListItem
                                        key={index}
                                        href={partner.href}
                                        title={partner.name}
                                        description={partner.description}>
                                        {partner.icon}
                                    </ListItem>
                                ))}
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle({ className: 'text-foreground/75 h-7 px-3 text-sm' })}>
                        <Link href="/pricing">Pricing</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle({ className: 'text-foreground/75 h-7 px-3 text-sm' })}>
                        <Link href="/contact">Contact</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

function ListItem({ title, description, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string; title: string; description?: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="grid grid-cols-[auto_1fr] gap-3.5">
                    <div className="bg-background ring-foreground/10 before:mask-y-from-80% after:mask-x-from-80% before:border-foreground/[0.075] after:border-foreground/[0.075] relative flex size-10 items-center justify-center rounded border border-transparent shadow shadow-sm ring-1 before:absolute before:-inset-x-1 before:-inset-y-3 before:border-x before:border-dashed after:absolute after:-inset-x-3 after:-inset-y-1 after:border-y after:border-dashed">{children}</div>
                    <div className="space-y-0.5">
                        <div className="text-foreground text-sm font-medium">{title}</div>
                        <p className="text-muted-foreground line-clamp-1 text-xs">{description}</p>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
