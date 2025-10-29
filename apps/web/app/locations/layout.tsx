import { MainLayout } from '@/components/layout/main-layout';

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
