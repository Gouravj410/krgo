import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { servicesBySlug } from "../data/servicesData";

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = servicesBySlug[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  const goToServices = () => {
    navigate("/", { state: { scrollTo: "services" } });
  };

  const goToContact = () => {
    navigate("/", { state: { scrollTo: "contact" } });
  };

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-20 bg-white min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl font-bold text-secondary mb-3">Service not found</h1>
            <p className="text-gray-500 mb-6">Please go back and choose a valid service.</p>
            <button onClick={goToServices} className="btn-primary">
              Back to Services
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-bg min-h-screen">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
          <button onClick={goToServices} className="text-primary font-medium hover:underline">
            ← Back to services
          </button>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 text-center">{service.heading || service.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto text-center">{service.details}</p>

            <div className="card mb-8 max-w-3xl mx-auto text-left">
              <h2 className="text-xl font-bold text-secondary mb-4">What you get</h2>
              <ul className="space-y-3 text-gray-600">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-accent mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={goToContact} className="btn-primary">
                {service.ctaText || "Start My Website"}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
