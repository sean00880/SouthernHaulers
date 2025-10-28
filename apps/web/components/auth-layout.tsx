'use client';

import React, { useState } from 'react';
import { cn } from '../lib/utils';
import {
  LayoutDashboard,
  Package,
  Truck,
  FileText,
  Settings,
  Users,
  DollarSign,
  BarChart3,
  Menu,
  X,
  LogOut,
  Bell,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface AuthLayoutProps {
  children: React.ReactNode;
  role: 'client' | 'admin' | 'driver';
  currentPath?: string;
}

const navigationConfig: Record<string, NavItem[]> = {
  client: [
    { label: 'Dashboard', href: '/client', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Shipments', href: '/client/shipments', icon: <Package className="h-5 w-5" /> },
    { label: 'Quotes', href: '/client/quotes', icon: <FileText className="h-5 w-5" /> },
    { label: 'Invoices', href: '/client/invoices', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Analytics', href: '/client/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { label: 'Settings', href: '/client/settings', icon: <Settings className="h-5 w-5" /> },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Dispatch', href: '/admin/dispatch', icon: <Truck className="h-5 w-5" /> },
    { label: 'Shipments', href: '/admin/shipments', icon: <Package className="h-5 w-5" /> },
    { label: 'Drivers', href: '/admin/drivers', icon: <Users className="h-5 w-5" /> },
    { label: 'Quotes', href: '/admin/quotes', icon: <FileText className="h-5 w-5" /> },
    { label: 'Billing', href: '/admin/billing', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { label: 'Settings', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ],
  driver: [
    { label: 'Dashboard', href: '/driver', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'My Loads', href: '/driver/loads', icon: <Package className="h-5 w-5" /> },
    { label: 'Documents', href: '/driver/documents', icon: <FileText className="h-5 w-5" /> },
    { label: 'Settings', href: '/driver/settings', icon: <Settings className="h-5 w-5" /> },
  ],
};

export function AuthLayout({ children, role, currentPath = '' }: AuthLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = navigationConfig[role] || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 border-r bg-card transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-6">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Southern Haulers
              </span>
            </a>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-3 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                U
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-muted-foreground capitalize">{role} Account</p>
              </div>
            </div>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1" />
          <button className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
              3
            </span>
          </button>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
