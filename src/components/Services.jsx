import React from 'react'
import { useNavigate } from 'react-router-dom'
import { services } from '../data/servicesData'

export default function Services() {
  const navigate = useNavigate()

  const openServiceDetails = (slug) => {
    window.history.replaceState(window.history.state, '', '/#services')
    navigate(`/services/${slug}`, { state: { fromServices: true } })
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">What We Do</p>
          <h2 className="section-title">Services Built for Small Businesses</h2>
          <p className="section-subtitle">
            Simple solutions that help you get more customers — without any technical stress.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div key={svc.title} className="card group">
              <button
                type="button"
                onClick={() => openServiceDetails(svc.slug)}
                className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-200"
                aria-label={`Open ${svc.title} details`}
              >
                <div className="group-hover:[&_svg]:text-white">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </button>
              <h3 className="text-xl font-bold text-secondary mb-3">{svc.title}</h3>
              <p className="text-gray-500 leading-relaxed">{svc.shortDescription}</p>
              <button
                type="button"
                onClick={() => openServiceDetails(svc.slug)}
                className="inline-block mt-4 text-primary font-semibold hover:underline"
              >
                View details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
