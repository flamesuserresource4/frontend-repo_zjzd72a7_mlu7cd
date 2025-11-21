import React from 'react'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Outbound Sales',
    desc: 'Dial 1,000 leads at once. Our AI navigates gatekeepers and books meetings directly to your CRM.',
  },
  {
    title: 'Inbound Support',
    desc: 'Never miss a call. The AI answers instantly, resolves issues, and routes complex queries.',
  },
  {
    title: 'Infinite Memory',
    desc: 'Remembers every client detail. Updates Salesforce/HubSpot automatically.',
  },
]

function Features() {
  return (
    <section id="why" className="relative bg-[#070914] py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[90%] h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white text-center"
        >
          Why teams choose Call-It AI
        </motion.h2>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 * i }}
              viewport={{ once: true }}
              className="group"
              style={{ perspective: '1000px' }}
            >
              <div className="relative rounded-2xl p-6 h-full bg-white/5 border border-white/10 backdrop-blur will-change-transform transition-transform duration-300 [transform-style:preserve-3d] group-hover:rotate-x-3 group-hover:-rotate-y-3">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white">{f.title}</h3>
                  <p className="mt-3 text-cyan-100/80">{f.desc}</p>

                  {/* Glass chip accents */}
                  <div className="mt-6 flex gap-2">
                    <span className="px-2 py-1 text-[10px] uppercase tracking-wide rounded bg-white/10 border border-white/10 text-cyan-200">AI</span>
                    <span className="px-2 py-1 text-[10px] uppercase tracking-wide rounded bg-white/10 border border-white/10 text-cyan-200">Realtime</span>
                    <span className="px-2 py-1 text-[10px] uppercase tracking-wide rounded bg-white/10 border border-white/10 text-cyan-200">Secure</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
