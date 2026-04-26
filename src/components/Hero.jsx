import React, { useState, useEffect } from 'react'
import hero1 from '../assets/hero1.png'
import hero2 from '../assets/hero2.png'
import hero3 from '../assets/hero3.png'
import hero4 from '../assets/hero4.png'
import hero5 from '../assets/hero5.png'
import TextSlider from './TextSlider'


export default function Hero() {
  const [currentImgIdx, setCurrentImgIdx] = useState(0)
  const heroImages = [hero1, hero2, hero3, hero4, hero5]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-bg via-white to-blue-50 pt-20 pb-10 md:pt-24 md:pb-16 flex items-center"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <div className="md:col-span-7 flex flex-col text-center md:text-left">
          <div className="inline-flex max-w-[90%] mx-auto md:max-w-none md:mx-0 items-center justify-center gap-2 bg-blue-50 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6 mt-4 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
            Trusted by 15+ Indian small businesses
          </div>

          <h1 className="text-[28px] sm:text-3xl md:text-5xl font-extrabold text-secondary leading-tight mb-5 min-h-[80px] md:min-h-[160px] max-w-[90%] mx-auto md:max-w-none md:mx-0">
            <span className="md:hidden flex flex-col">
              <span>We Help Small Businesses</span>
              <span className="text-primary mt-1">Increase Sales Online</span>
            </span>
            <span className="hidden md:inline">
              We Help Small Businesses{' '}
              <span className="text-primary">
                <TextSlider words={['Get More Customers', 'Grow Their Brands', 'Increase Sales', 'Build Trust']} />
              </span>{' '}
              Online
            </span>
          </h1>

          <p className="block md:hidden text-center text-sm font-medium mb-8 mt-2 text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis w-[90%] mx-auto">
            Starting from ₹5000 – Get your business online today
          </p>
          <p className="hidden md:block text-lg text-gray-500 mb-8 leading-relaxed">
            Professional websites, SEO, and complete online setup — all in one place.
            Get found on Google, grow your customer base, and earn more — without the tech headache.
          </p>

          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start gap-3 md:gap-4 mb-2 md:mb-10 w-[90%] mx-auto md:w-auto md:mx-0">
            <a href="#contact" className="btn-primary text-base px-7 py-3 w-full md:w-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Get Your Website
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mt-6 md:mt-0 mb-8 md:mb-0 md:flex md:flex-wrap md:justify-start md:gap-8 max-w-[95%] mx-auto md:max-w-none md:mx-0">
            {[
              { value: '15+', label: 'Businesses' },
              { value: '2–3', label: 'Days' },
              { value: '₹5K+', label: 'Starting Price' },
            ].map((s) => (
              <div key={s.label} className="text-center md:text-left bg-blue-50/50 md:bg-transparent rounded-xl py-3 px-1 md:p-0">
                <p className="text-lg md:text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 whitespace-nowrap mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex md:col-span-5 justify-center mt-10 md:mt-0">
          <div className="relative w-full max-w-md aspect-square rounded-3xl">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-3 scale-105 z-0"></div>
            {heroImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Small business owner matching design ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl transition-opacity duration-1000 ease-in-out ${
                  idx === currentImgIdx ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
