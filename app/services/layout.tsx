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
    <div className="container mx-auto px-4 py-12">
      <main>
        {children}
      </main>
    </div>
  )
}