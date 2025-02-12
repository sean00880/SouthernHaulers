export default function RefrigeratedPage() {
  const features = [
    {
      title: "Temperature Control",
      items: [
        {
          title: "Multi-Temperature Zones",
          description: "Advanced temperature control systems allowing multiple temperature zones in a single shipment."
        },
        {
          title: "Quality Assurance",
          description: "Continuous monitoring and documentation ensuring product integrity throughout transit."
        }
      ]
    },
    {
      title: "Key Features",
      items: [
        {
          title: "Cold Chain Solutions",
          features: [
            "Temperature monitoring",
            "Real-time alerts",
            "Compliance reporting"
          ]
        },
        {
          title: "Quality Standards",
          features: [
            "HACCP compliance",
            "FDA regulations",
            "Temperature validation"
          ]
        }
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Refrigerated Transport</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Temperature-controlled logistics ensuring product integrity throughout the supply chain.
        </p>
      </div>

      <div className="space-y-16">
        {features.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border rounded-lg p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  {'description' in item ? (
                    <p className="text-gray-600">{item.description}</p>
                  ) : (
                    <ul className="space-y-2">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-4"
        >
          Request a Quote
        </a>
        <a
          href="/services"
          className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
        >
          Back to Services
        </a>
      </div>
    </div>
  )
}