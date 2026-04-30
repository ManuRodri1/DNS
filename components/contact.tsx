"use client"

import type React from "react"

import { useLanguage } from "@/lib/language-context"
import { useState } from "react"

export function Contact() {
  const { language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const content = {
    en: {
      label: "Stay Updated",
      title: "Join the DNS Insider List",
      subtitle: "Get first access to speaker announcements, early-bird tickets, and exclusive ecosystem updates.",
      emailLabel: "Direct Email",
      instagramLabel: "Follow Us",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your name",
      emailLabelForm: "Email Address",
      emailPlaceholder: "you@example.com",
      messageLabel: "Tell us about your interest (Optional)",
      messagePlaceholder: "Founder, Investor, Nomad...",
      submitButton: "Subscribe",
      submittingButton: "Subscribing...",
    },
    es: {
      label: "Mantente actualizado",
      title: "Únete a la lista DNS Insider",
      subtitle: "Recibe acceso prioritario a anuncios de speakers, tickets early-bird y actualizaciones exclusivas.",
      emailLabel: "Correo directo",
      instagramLabel: "Síguenos",
      nameLabel: "Nombre completo",
      namePlaceholder: "Tu nombre",
      emailLabelForm: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      messageLabel: "Cuéntanos sobre tu interés (Opcional)",
      messagePlaceholder: "Fundador, Inversionista, Nómada...",
      submitButton: "Suscribirme",
      submittingButton: "Suscribiendo...",
    },
  }

  const t = content[language]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  return (
    <section id="contact" data-header-theme="white" className="relative bg-white py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
        <div className="text-center mb-16 md:mb-20 animate-fade-up">
          <span className="text-[#FF5757] font-['Inter'] font-bold uppercase tracking-widest text-sm mb-4 inline-block">
            {t.label}
          </span>
          <h2 className="font-['League_Spartan'] text-4xl md:text-5xl font-bold text-black mb-3">{t.title}</h2>
          <div className="flex justify-center mb-6">
            <div className="h-[3px] w-20 bg-[#FF5757] rounded-full" />
          </div>
          <p className="font-['Inter'] text-lg text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Logo + Contact Info */}
          <div className="space-y-8 animate-fade-up delay-100 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Logo */}
            <div className="w-full max-w-[280px]">
              <img
                src="/images/promo-20image.jpg"
                alt="Digital Nomad Summit Santo Domingo 2026 - Work Live Scale Conference"
                width={280}
                height={280}
                loading="lazy"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Email Block */}
            <div className="w-full">
              <p className="font-['Inter'] text-sm uppercase tracking-wider text-gray-500 mb-3">{t.emailLabel}</p>
              <a
                href="mailto:digitalnomadsummit@gmail.com"
                className="font-['Inter'] text-base md:text-lg text-black hover:text-[#FF5757] transition-colors duration-200 inline-flex items-center gap-3 group"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="group-hover:underline break-all">digitalnomadsummit@gmail.com</span>
              </a>
            </div>

            {/* Instagram Block */}
            <div className="w-full">
              <p className="font-['Inter'] text-sm uppercase tracking-wider text-gray-500 mb-3">{t.instagramLabel}</p>
              <a
                href="https://www.instagram.com/thedigitalnomadsummit?igsh=dDN2YjJoejYzMGl3"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Inter'] text-base md:text-lg text-black hover:text-[#FF5757] transition-all duration-200 inline-flex items-center gap-3 group"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 group-hover:scale-105 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="group-hover:underline">@thedigitalnomadsummit</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="animate-fade-up delay-200">
            <div className="bg-[#F7F7F7] border border-[#E0E0E0] rounded-2xl shadow-md p-6 md:p-8">
              <form
                action="https://formspree.io/f/xwpdaprd"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block font-['Inter'] text-sm font-medium text-black mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5757] focus:border-[#FF5757] transition-all font-['Inter'] text-black placeholder:text-gray-400 bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-['Inter'] text-sm font-medium text-black mb-2">
                    {t.emailLabelForm}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5757] focus:border-[#FF5757] transition-all font-['Inter'] text-black placeholder:text-gray-400 bg-white"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-['Inter'] text-sm font-medium text-black mb-2">
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t.messagePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5757] focus:border-[#FF5757] transition-all font-['Inter'] text-black placeholder:text-gray-400 resize-none bg-white"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-3 bg-[#FF5757] text-white font-['Inter'] font-medium rounded-full hover:bg-[#E64545] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t.submittingButton : t.submitButton}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
