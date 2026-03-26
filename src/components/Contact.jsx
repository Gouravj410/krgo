import React, { useState } from 'react'
import {
  CALL_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  WHATSAPP_URL,
} from '../config/siteConfig'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', projectType: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!form.phone.trim()) {
      errs.phone = 'Please enter your phone number.'
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number.'
    }
    if (!form.projectType) errs.projectType = 'Please enter your project type.'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    
    try {
      setSubmitting(true)

      const templateParams = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        businessType: form.projectType.trim(),
        message: form.message.trim(),
      }

      // Send via FormSubmit
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Lead from KrGo Website",
          _template: "table",
          Name: templateParams.name,
          Phone: templateParams.phone,
          Business_Type: templateParams.businessType,
          Message: templateParams.message || "No message provided."
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send message through FormSubmit.");
      }

      setSubmitted(true)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitError('Could not submit your request. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Info */}
        <div>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
          <h2 className="section-title text-left">Ready to Grow Your Business Online?</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Fill in the form and we'll get back to you within a few hours. No commitment required — just a friendly chat about your business.
          </p>

          <div className="space-y-5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent w-full justify-center text-base py-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            <div className="flex items-center gap-4 p-4 bg-bg rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Call us directly</p>
                <a href={CALL_URL} className="text-secondary font-semibold hover:text-primary transition-colors">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-bg rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Email us</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-secondary font-semibold hover:text-primary transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="card">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">Success!</h3>
              <p className="text-gray-500 mb-4">
                Your request has been sent successfully. We will contact you soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: '', phone: '', projectType: '', message: '' })
                }}
                className="text-primary font-medium hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h3 className="text-xl font-bold text-secondary mb-1">Get a Free Consultation</h3>
              <p className="text-gray-400 text-sm mb-4">We'll call you back within 2 hours.</p>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1" htmlFor="name">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Sharma"
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                    errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-bg'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1" htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  maxLength={10}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                    errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-bg'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-1" htmlFor="projectType">
                  Project Type <span className="text-red-500">*</span>
                </label>
                <input
                  id="projectType"
                  name="projectType"
                  type="text"
                  value={form.projectType}
                  onChange={handleChange}
                  placeholder="e.g. Retail Shop, Gym, etc."
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                    errors.projectType ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-bg'
                  }`}
                />
                {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-1" htmlFor="message">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what kind of website you need..."
                  rows={3}
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition border-gray-200 bg-bg"
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? 'Submitting...' : 'Send My Request →'}
              </button>
              <p className="text-center text-xs text-gray-400">
                No spam. We'll only contact you about your website.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
