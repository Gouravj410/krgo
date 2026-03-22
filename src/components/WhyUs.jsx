import React from 'react'

const reasons = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast Delivery',
    description: 'Your website is ready in just 2–3 days. No long waits, no delays.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Affordable Pricing',
    description: 'Plans starting at just ₹5,000. Quality work that fits a small business budget.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: 'Local Support (India)',
    description: 'We understand your market. Hindi & English support. Available on WhatsApp.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Mobile-Optimized',
    description: 'Every website we build works perfectly on phones — where most of your customers browse.',
  },
]

export default function WhyUs({ compact = false }) {
  if (compact) {
    return (
      <div>
        <div className="mb-6 text-center">
          <p className="text-accent font-semibold text-xs tracking-widest mb-1">WHY KrGo</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Why Small Businesses Choose Us</h2>
          <p className="text-slate-300 text-sm mt-2 max-w-xl mx-auto">
            We're not just developers — we're your digital growth partner who speaks your language.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="flex items-start gap-4 bg-white/10 border border-white/15 rounded-xl p-4 hover:bg-white/15 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/20 text-accent flex items-center justify-center">
                {r.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">{r.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section id="why-us" className="py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-accent font-semibold text-sm tracking-widest mb-2">WHY KrGo</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Small Businesses Choose Us
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            We're not just developers — we're your digital growth partner who speaks your language.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="flex items-start gap-4 bg-white/10 border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
                {r.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{r.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
