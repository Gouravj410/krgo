import React from 'react'
import salonImg from '../assets/salon.png'
import gymImg from '../assets/gym.png'
import shopImg from '../assets/shop.png'

const projects = [
  {
    img: salonImg,
    title: 'Glamour Salon',
    type: 'Beauty & Wellness',
    description:
      'A luxury website for a local hair salon with online booking, services list, and gallery — helping them get 2x more appointments.',
    tag: 'Salon',
    demoPath: '/demo/salon',
    accent: 'from-rose-400 to-pink-500',
  },
  {
    img: gymImg,
    title: 'FitZone Gym',
    type: 'Fitness & Health',
    description:
      'Bold and energetic website for a local gym with membership plans, class schedule, and a lead-capture form.',
    tag: 'Gym',
    demoPath: '/demo/gym',
    accent: 'from-orange-400 to-red-500',
  },
  {
    img: shopImg,
    title: 'Sharma Kirana Store',
    type: 'Local Retail',
    description:
      'A simple and friendly website for a neighborhood shop with product highlights, WhatsApp ordering, and home delivery info.',
    tag: 'Local Shop',
    demoPath: '/demo/kirana',
    accent: 'from-green-400 to-emerald-500',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Our Work</p>
          <h2 className="section-title">Demo Projects We've Built</h2>
          <p className="section-subtitle">
            Here are some examples of websites we've designed for different types of small businesses in India.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p.title} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="relative overflow-hidden h-52">
                <img
                  src={p.img}
                  alt={`${p.title} website preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Grey overlay on hover */}
                <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {p.tag}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">{p.type}</p>
                <h3 className="text-xl font-bold text-secondary mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Want a website like these for your business?</p>
          <a href="#contact" className="btn-primary">Get Started Today</a>
        </div>
      </div>
    </section>
  )
}
