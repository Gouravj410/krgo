import React from 'react'

const plans = [
  {
    name: 'Basic',
    price: '₹5,000',
    desc: 'Perfect for getting started',
    features: [
      '1-page website',
      'Contact form',
      'WhatsApp button',
      'Mobile responsive',
      '1 revision round',
    ],
    cta: 'Get Basic Plan',
    highlight: false,
  },
  {
    name: 'Standard',
    price: '₹10,000',
    desc: 'Most popular for growing businesses',
    features: [
      '5-page website',
      'Contact & enquiry form',
      'Basic SEO setup',
      'Google Maps integration',
      'WhatsApp button',
      'Mobile responsive',
      '2 revision rounds',
    ],
    cta: 'Get Standard Plan',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '₹20,000',
    desc: 'Full online presence setup',
    features: [
      'Everything in Standard',
      'Blog / news section',
      'Advanced SEO',
      'Google Business setup',
      '3 months maintenance',
      'Social media links',
      'Unlimited revisions',
    ],
    cta: 'Get Premium Plan',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Transparent Pricing</p>
          <h2 className="section-title">Simple, Affordable Plans</h2>
          <p className="section-subtitle">
            No hidden charges. No confusing packages. Just pick what suits your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-8 flex flex-col ${
                plan.highlight
                  ? 'border-primary bg-primary text-white shadow-2xl scale-105'
                  : 'border-gray-100 bg-white shadow-sm hover:shadow-md'
              } transition-shadow duration-200`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-secondary'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-blue-100' : 'text-gray-400'}`}>{plan.desc}</p>
                <p className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-secondary'}`}>
                  {plan.price}
                </p>
                <p className={`text-sm mt-1 ${plan.highlight ? 'text-blue-100' : 'text-gray-400'}`}>one-time payment</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? 'text-accent' : 'text-accent'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.highlight ? 'text-blue-50' : 'text-gray-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`text-center font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                  plan.highlight
                    ? 'bg-white text-primary hover:bg-blue-50'
                    : 'bg-primary text-white hover:bg-blue-700'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
