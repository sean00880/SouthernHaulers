'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Ship,
  MapPin,
  Truck,
  Package,
  Calculator,
  TrendingUp,
  Users,
  Settings,
  Shield,
  Phone,
  Building2,
  ChevronRight,
  Home,
  FileText,
} from 'lucide-react';
import { PageBreadcrumb } from '@/components/page-breadcrumb';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Registry } from '@/data/registry';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Navigation types
type NavItem = {
  title: string;
  href: string;
  sub?: { title: string; href: string }[];
};

// Navigation structure
const navigation = {
  main: [
    {
      title: 'Home',
      href: '/',
      icon: Home,
    },
    {
      title: 'Services',
      icon: Truck,
      items: Registry.services.map((service) => ({
        title: service.name,
        href: `/services/${service.slug}`,
      })),
    },
    {
      title: 'Ports & Terminals',
      icon: Ship,
      items: Registry.ports.map((port) => ({
        title: port.name,
        href: `/ports/${port.id}`,
        sub: port.terminals.map((terminal) => ({
          title: terminal.name,
          href: `/ports/${port.id}#${terminal.id}`,
        })),
      })),
    },
    {
      title: 'Locations',
      icon: MapPin,
      items: Registry.locations.map((location) => ({
        title: `${location.city}, ${location.state}`,
        href: `/locations/${location.id}`,
      })),
    },
  ],
  tools: [
    {
      title: 'Get Quote',
      href: '/quote',
      icon: Calculator,
    },
    {
      title: 'Track Shipment',
      href: '/track',
      icon: Package,
    },
    {
      title: 'Client Portal',
      href: '/client',
      icon: Users,
    },
    {
      title: 'Driver Portal',
      href: '/driver',
      icon: TrendingUp,
    },
    {
      title: 'Quote CRM',
      href: '/quote-crm',
      icon: FileText,
    },
    {
      title: 'Admin',
      href: '/admin',
      icon: Settings,
    },
  ],
  company: [
    {
      title: 'About & Safety',
      href: '/about/safety',
      icon: Shield,
    },
    {
      title: 'Contact',
      href: '/contact',
      icon: Phone,
    },
    {
      title: 'Enterprise',
      href: '/enterprise',
      icon: Building2,
    },
  ],
};

// Sticky breadcrumb component that breaks out when sidebar is collapsed
function StickyBreadcrumb() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  if (isCollapsed) {
    return (
      <div
        className="fixed top-20 z-50 hidden md:block"
        style={{
          left: 'var(--sidebar-width-icon)',
        }}
      >
        <div className="bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <PageBreadcrumb />
        </div>
      </div>
    );
  }

  return null;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border group-data-[state=collapsed]:hidden">
          <div className="px-3 py-2">
            <PageBreadcrumb />
          </div>
        </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.main.map((item) => {
                if (!item.items) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.href}>
                        <Link href={item.href}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <Collapsible
                      defaultOpen={pathname.startsWith(`/${item.title.toLowerCase().split(' ')[0]}`)}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem: NavItem) => {
                            if (!subItem.sub) {
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === subItem.href}
                                  >
                                    <Link href={subItem.href}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            }

                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <Collapsible
                                  defaultOpen={pathname.startsWith(subItem.href)}
                                  className="group/collapsible-sub"
                                >
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuSubButton>
                                      <span>{subItem.title}</span>
                                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible-sub:rotate-90" />
                                    </SidebarMenuSubButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <SidebarMenuSub>
                                      {subItem.sub.map((tertiaryItem) => (
                                        <SidebarMenuSubItem key={tertiaryItem.title}>
                                          <SidebarMenuSubButton
                                            asChild
                                            isActive={pathname === tertiaryItem.href}
                                          >
                                            <Link href={tertiaryItem.href}>
                                              <span className="text-xs">{tertiaryItem.title}</span>
                                            </Link>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                      ))}
                                    </SidebarMenuSub>
                                  </CollapsibleContent>
                                </Collapsible>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools */}
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.tools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Company */}
        <SidebarGroup>
          <SidebarGroupLabel>Company</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.company.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" className="text-xs text-muted-foreground">
              <span className="truncate">© 2025 Southern Haulers</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
      </Sidebar>
      <StickyBreadcrumb />
    </>
  );
}
