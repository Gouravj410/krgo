import React, { useState, useEffect } from 'react'
import hero1 from '../assets/hero1.png'
import hero2 from '../assets/hero2.png'
import hero3 from '../assets/hero3.png'
import hero4 from '../assets/hero4.png'
import hero5 from '../assets/hero5.png'
import TextSlider from './TextSlider'
import { WHATSAPP_URL } from '../config/siteConfig'

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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent text-base px-7 py-3 w-full md:w-auto"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
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
