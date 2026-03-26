import './index.css'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Pricing from './components/Pricing'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ServiceDetailsPage from './pages/ServiceDetailsPage'


function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const targetId = location.hash ? location.hash.replace('#', '') : location.state?.scrollTo;
    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.state])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <div className="md:hidden h-24 bg-secondary"></div>
      <WhatsAppFloat />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/:slug" element={<ServiceDetailsPage />} />
    </Routes>
  )
}

export default App
