export default function Services() {
  const services = [
    {
      title: "Warehouse Solutions",
      description: "State-of-the-art warehousing facilities with advanced inventory management.",
      href: "/services/warehouse",
      features: [
        "Climate-controlled storage",
        "Real-time inventory tracking",
        "Cross-docking capabilities",
        "Advanced security systems"
      ]
    },
    {
      title: "Container Services",
      description: "Comprehensive container handling and transportation solutions.",
      href: "/services/containers",
      features: [
        "Port drayage services",
        "Intermodal solutions",
        "Container tracking",
        "Custom routing options"
      ]
    },
    {
      title: "Refrigerated Transport",
      description: "Temperature-controlled logistics ensuring product integrity.",
      href: "/services/refrigerated",
      features: [
        "Multi-temperature zones",
        "Real-time monitoring",
        "HACCP compliance",
        "Cold chain integrity"
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">What We Do</h1>
      <div className="grid gap-8">
        {services.map((service, index) => (
          <div key={index} className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={service.href}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
