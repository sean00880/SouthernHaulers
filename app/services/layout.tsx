import { ServicesSidebar } from "@/components/services-sidebar"

export const generateStaticParams = async () => {
  return [
    { segment: '' },  // /services
    { segment: 'warehouse' },  // /services/warehouse
    { segment: 'containers' },  // /services/containers
    { segment: 'refrigerated' },  // /services/refrigerated
  ]
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ServicesSidebar className="py-6 pr-1" />
        </aside>
        <main className="relative py-6 md:py-8 lg:py-10">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
