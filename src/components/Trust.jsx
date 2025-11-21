import React, { useEffect, useRef } from 'react'

const logos = ['neo', 'flux', 'orbit', 'zen', 'quanta', 'nova', 'pulse']

function Trust() {
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-50%)' }
    ], {
      duration: 18000,
      iterations: Infinity,
      easing: 'linear'
    })
  }, [])

  return (
    <section className="relative bg-[#070914] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-cyan-200/70">Trusted by forward-thinking sales teams</p>
        <div className="mt-10 relative">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#070914] via-transparent to-[#070914]" />
          <div className="flex gap-14 items-center" ref={trackRef}>
            {[...logos, ...logos].map((l, i) => (
              <div key={i} className="flex items-center justify-center h-12 min-w-[140px] rounded-xl bg-white/5 border border-white/10 text-cyan-200 uppercase tracking-widest text-xs">
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Trust
