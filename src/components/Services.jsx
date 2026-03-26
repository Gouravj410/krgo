import React from 'react'
import { useNavigate } from 'react-router-dom'
import { services } from '../data/servicesData'

const serviceIcons = {
  'website-development': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
  ),
  'website-maintenance': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ),
  'seo-and-google-visibility': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  ),
  'inventory-management-sites': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
  ),
  'portfolio-websites': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  ),
  'college-projects': (
    <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
  )
}

export default function Services() {
  const navigate = useNavigate()

  const openServiceDetails = (slug) => {
    window.history.replaceState(window.history.state, '', '/#services')
    navigate(`/services/${slug}`, { state: { fromServices: true } })
  }

  const renderCard = (svc, isMobile, keyStr) => (
    <div key={keyStr} className={`card group flex flex-col transition-all duration-300 ${isMobile ? 'w-[280px] flex-shrink-0 relative' : 'hover:-translate-y-1'}`}>
      <button
        type="button"
        onClick={() => openServiceDetails(svc.slug)}
        className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-200"
        aria-label={`Open ${svc.title} details`}
      >
        <div className="group-hover:[&_svg]:text-white">
          {serviceIcons[svc.slug] || (
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </div>
      </button>
      <h3 className="text-xl font-bold text-secondary mb-3">{svc.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-6">{svc.shortDesc}</p>
      
      <button 
        onClick={() => openServiceDetails(svc.slug)}
        className="text-primary font-semibold text-sm hover:underline mt-auto flex items-center gap-1 group-hover:gap-2 transition-all"
      >
        View Details <span aria-hidden="true">→</span>
      </button>
    </div>
  )

  return (
    <section id="services" className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Grow Your Business</p>
          <h2 className="section-title">Services That Help You Get More Customers</h2>
          <p className="section-subtitle">
            Simple solutions designed to grow your business without any technical stress.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {services.map(svc => renderCard(svc, false, svc.title))}
        </div>

        {/* Mobile Marquee */}
        <div className="md:hidden relative max-w-[100vw] -mx-4 pb-6 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none"></div>
          <div className="flex overflow-hidden group">
            <div className="flex w-max animate-slow-marquee-svcs group-hover:[animation-play-state:paused]">
              <div className="flex gap-4 pr-4">
                {services.map((svc, idx) => renderCard(svc, true, `s1-${idx}`))}
              </div>
              <div className="flex gap-4 pr-4">
                {services.map((svc, idx) => renderCard(svc, true, `s2-${idx}`))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slow-marquee-svcs {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-slow-marquee-svcs {
            animation: slow-marquee-svcs 35s linear infinite;
          }
        `}</style>
      </div>
    </section>
  )
}
