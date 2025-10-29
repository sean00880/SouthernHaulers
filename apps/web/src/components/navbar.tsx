'use client'

import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Menu, X, Shield, Truck, MapPin, Package, Container, Warehouse, Ship, Users, FileText, BarChart3, Smartphone, Headphones, Briefcase, GraduationCap, Phone } from 'lucide-react'
import { useMedia } from '@/hooks/use-media'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
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
]

const additionalServices: FeatureLink[] = [
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

const mobileLinks: MobileLink[] = [
    {
        groupName: 'About',
        links: aboutFeatures,
    },
    {
        groupName: 'Services',
        links: [...coreServices, ...portServices, ...additionalServices],
    },
    {
        groupName: 'Solutions',
        links: [...toolsSolutions, ...industrySolutions],
    },
    {
        groupName: 'Partners',
        links: partnerLinks,
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const isLarge = useMedia('(min-width: 64rem)')

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            role="banner"
            data-state={isMobileMenuOpen ? 'active' : 'inactive'}
            {...(isScrolled && { 'data-scrolled': true })}
            className="has-data-[state=open]:min-h-screen has-data-[state=open]:backdrop-blur has-data-[state=open]:bg-background/50 fixed inset-x-0 top-0 z-50 bg-background border-b border-foreground/5">
            <div
                className={cn(
                    'h-20 absolute inset-x-0 top-0 z-50 border-transparent ring-1 ring-transparent transition-all duration-300',
                    'in-data-scrolled:border-foreground/5 in-data-scrolled:border-b in-data-scrolled:bg-background/75 in-data-scrolled:backdrop-blur',
                    'has-data-[state=open]:ring-foreground/5 has-data-[state=open]:bg-card/75 has-data-[state=open]:shadow-lg has-data-[state=open]:backdrop-blur has-data-[state=open]:border-b has-data-[state=open]:shadow-black/10 has-data-[state=open]:min-h-[calc(var(--navigation-menu-viewport-height)+5rem)]',
                    'max-lg:in-data-[state=active]:h-screen max-lg:in-data-[state=active]:bg-background/75 max-lg:in-data-[state=active]:backdrop-blur max-lg:h-20 max-lg:overflow-hidden max-lg:border-b max-lg:border-foreground/5'
                )}>
                <div className="mx-auto max-w-6xl px-6 lg:px-12">
                    <div className="relative flex flex-wrap items-center justify-between py-2 lg:py-1">
                        <div
                            aria-hidden
                            className="in-has-data-[state=open]:block absolute inset-x-0 bottom-0 hidden h-px bg-[length:4px_1px] bg-repeat-x opacity-20 [background-image:linear-gradient(90deg,var(--color-foreground)_1px,transparent_1px)]"
                        />
                        <div className="flex justify-between items-center gap-8 max-lg:h-20 max-lg:w-full max-lg:border-b max-lg:border-foreground/5">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center py-2">
                                <Logo className="h-full" />
                            </Link>

                            {isLarge && <NavMenu />}

                            {/* Desktop Theme Toggle & CTA Buttons */}
                            {isLarge && (
                                <div className="flex items-center gap-3">
                                    <ThemeToggle />
                                    <Button
                                        asChild
                                        variant="outline"
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
                            )}

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-3 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        {!isLarge && isMobileMenuOpen && <MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} />}

                        {/* Mobile CTA Section */}
                        <div className="max-lg:in-data-[state=active]:mt-6 in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 md:flex-nowrap lg:m-0 lg:hidden lg:w-fit lg:gap-6 lg:space-y-0">
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit md:items-center">
                                <div className="flex justify-center">
                                    <ThemeToggle />
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto">
                                    <Link href="/login">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className="w-full sm:w-auto">
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
                                className="group relative border-b-0 before:pointer-events-none before:absolute before:inset-x-4 before:bottom-0 before:border-b before:border-foreground/5">
                                <AccordionTrigger className="**:!font-normal data-[state=open]:bg-muted flex items-center justify-between px-4 py-3 text-lg">{link.groupName}</AccordionTrigger>
                                <AccordionContent className="pb-5">
                                    <ul>
                                        {link.links.map((feature, featureIndex) => (
                                            <li key={featureIndex}>
                                                <Link
                                                    href={feature.href}
                                                    onClick={closeMenu}
                                                    className="grid grid-cols-[auto_1fr] items-center gap-2.5 px-4 py-2 hover:bg-muted/50 rounded-md transition-colors">
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
                            className="group relative block border-0 border-b border-foreground/5 py-4 text-lg hover:bg-muted/50 px-4 -mx-4 transition-colors">
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
            className="**:data-[slot=navigation-menu-viewport]:bg-transparent **:data-[slot=navigation-menu-viewport]:rounded-none **:data-[slot=navigation-menu-viewport]:ring-0 **:data-[slot=navigation-menu-viewport]:border-0 **:data-[slot=navigation-menu-viewport]:shadow-none [--color-muted:color-mix(in_oklch,var(--color-foreground)_5%,transparent)] [--viewport-outer-px:2rem] max-lg:hidden">
            <NavigationMenuList className="gap-3">
                {/* About Menu */}
                <NavigationMenuItem value="about">
                    <NavigationMenuTrigger>About</NavigationMenuTrigger>
                    <NavigationMenuContent className="origin-top pb-12 pt-6 shadow-none ring-0">
                        <div className="min-w-lg pr-22 divide-foreground/10 grid w-full grid-cols-[auto_1fr] gap-4 divide-x">
                            {/* Visual Column - LEFT */}
                            <div className="w-48 pr-4">
                                <span className="text-muted-foreground ml-2 text-xs">About Us</span>
                                <div className="bg-linear-to-br inset-ring-foreground/10 inset-ring-1 relative mt-2 overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-white/50 to-green-200 p-3 transition-colors duration-200 hover:from-blue-100 dark:from-blue-950 dark:via-background/50 dark:to-green-950 dark:hover:from-blue-900">
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
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Services Menu - Full Width with Dividers */}
                <NavigationMenuItem value="services">
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent className="origin-top pb-12 pt-6">
                        <div className="min-w-6xl pr-22 divide-foreground/10 grid w-full grid-cols-[1fr_1fr_auto] gap-4 divide-x items-start">
                            {/* Core Services */}
                            <div className="flex flex-col gap-1 pr-4 h-full">
                                <span className="text-muted-foreground ml-2 text-xs">Core Services</span>
                                <ul className="mt-1 space-y-2 flex-1">
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
                            <div className="flex flex-col gap-1 px-4 h-full">
                                <span className="text-muted-foreground ml-2 text-xs">Ports We Serve</span>
                                <ul className="mt-1 space-y-2 flex-1">
                                    {portServices.map((port, index) => (
                                        <ListItem
                                            key={index}
                                            href={port.href}
                                            title={port.name}
                                            description={port.description}>
                                            {port.icon}
                                        </ListItem>
                                    ))}
                                </ul>
                            </div>
                            {/* Visual Column - RIGHT */}
                            <div className="w-48 pl-4 flex flex-col h-full">
                                <span className="text-muted-foreground ml-2 text-xs">Track Live</span>
                                <div className="bg-linear-to-br inset-ring-foreground/10 inset-ring-1 relative mt-2 flex-1 flex flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br from-teal-50 via-white/50 to-blue-200 p-3 transition-colors duration-200 hover:from-teal-100 dark:from-teal-950 dark:via-background/50 dark:to-blue-950 dark:hover:from-teal-900 min-h-[200px]">
                                    <div className="flex items-center justify-center flex-1 mb-2">
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
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Solutions Menu with Dividers */}
                <NavigationMenuItem value="solutions">
                    <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                    <NavigationMenuContent className="origin-top pb-12 pt-6">
                        <div className="min-w-6xl pr-22 divide-foreground/10 grid w-full grid-cols-2 gap-4 divide-x">
                            <div className="row-span-2 grid grid-rows-subgrid gap-1 pr-4">
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
                            <div className="row-span-2 grid grid-rows-subgrid gap-1 pl-4">
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
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Partners Menu */}
                <NavigationMenuItem value="partners">
                    <NavigationMenuTrigger>Partners</NavigationMenuTrigger>
                    <NavigationMenuContent className="origin-top pb-12 pt-6">
                        <div className="min-w-lg pr-22 grid w-full grid-cols-1 gap-4">
                            <div className="grid grid-cols-1 gap-1">
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
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem value="pricing">
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}>
                        <Link href="/pricing">Pricing</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem value="contact">
                    <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}>
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
                    className="grid grid-cols-[auto_1fr] gap-3.5 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="bg-background ring-foreground/10 relative flex size-9 items-center justify-center rounded border border-transparent shadow shadow-sm ring-1">{children}</div>
                    <div className="space-y-0.5">
                        <div className="text-foreground text-sm font-medium">{title}</div>
                        <p className="text-muted-foreground line-clamp-1 text-xs">{description}</p>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
