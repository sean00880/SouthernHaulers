'use client';

import * as React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PageBottomFlap } from '@/components/layout/page-bottom-flap';

interface MainLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: MainLayoutProps) {
  return (
    <SidebarInset>
      {/* Main content */}
      <div className="flex-1 p-2 lg:p-6">
        {children}
      </div>

      {/* Bottom flap for non-home pages */}
      <PageBottomFlap />
    </SidebarInset>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="pt-20">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </div>
  );
}
