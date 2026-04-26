import React, { useState } from 'react'
import { CONTACT_EMAIL } from '../config/siteConfig'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.'
    }
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

      // Send via FormSubmit
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New Contact from KrGo Website",
          _template: "table",
          Name: form.name.trim(),
          Email: form.email.trim(),
          Message: form.message.trim() || "No message provided."
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
