import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

function Hero({ onHearDemo }) {
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`
  }

  const handleMouseLeave = () => {
    const btn = btnRef.current
    if (!btn) return
    btn.style.transform = 'translate(0, 0)'
  }

  return (
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden bg-[#070914]">
      {/* Subtle gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[60vh] w-[80vw] rounded-full blur-[120px] opacity-40" style={{background: 'radial-gradient(closest-side, #5b2df5, transparent 70%)'}} />
        <div className="absolute bottom-0 right-0 h-[40vh] w-[50vw] rounded-full blur-[120px] opacity-30" style={{background: 'radial-gradient(closest-side, #00e1ff, transparent 70%)'}} />
      </div>

      {/* Background Spline 3D */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-36 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-300/80 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Real-time neural voice agents
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Voice AI That Sounds More Human Than You.
          </h1>
          <p className="mt-6 text-base md:text-lg text-cyan-100/80 max-w-2xl">
            Automate your sales and support with hyper-realistic AI agents. 24/7 availability, zero wait times, infinite scale.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <button
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={onHearDemo}
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-xl text-white font-semibold focus:outline-none"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-600 opacity-80 blur-[8px]" />
              <span ref={btnRef} className="relative z-10 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-cyan-300"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>
                Hear the Demo
              </span>
            </button>
            <a href="#why" className="text-cyan-300 hover:text-cyan-200 transition-colors">Why Call-It AI?</a>
          </div>
        </motion.div>
      </div>

      {/* Mobile fallback overlay (light video placeholder) */}
      <div className="pointer-events-none absolute inset-0 md:hidden bg-gradient-to-b from-[#070914]/60 to-[#070914]" />
    </section>
  )
}

export default Hero
