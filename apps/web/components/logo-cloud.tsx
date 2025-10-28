
'use client';

import Image from 'next/image';

export function LogoCloud() {
  const partners = [
    { name: 'Georgia Ports Authority', logo: '/images/partners/gpa.png' },
    { name: 'South Carolina Ports', logo: '/images/partners/scpa.png' },
    { name: 'JAXPORT', logo: '/images/partners/jaxport.png' },
    { name: 'TWIC Program', logo: '/images/partners/twic.png' },
    { name: 'FMCSA', logo: '/images/partners/fmcsa.png' },
    { name: 'DOT', logo: '/images/partners/dot.png' },
  ];

  return (
    <section className="border-y bg-muted/30">
      <div className="container py-12">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Trusted by Major Ports and Shipping Companies
          </h2>
          <p className="text-muted-foreground">
            Authorized partners and certifications
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="relative w-24 h-24 flex items-center justify-center"
              title={partner.name}
            >
              {/* Placeholder for partner logos */}
              <div className="w-full h-full bg-muted/50 rounded-lg flex items-center justify-center text-xs text-center p-2 border">
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
