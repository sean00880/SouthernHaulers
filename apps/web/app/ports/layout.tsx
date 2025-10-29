import { MainLayout } from '@/components/layout/main-layout';

export default function PortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
