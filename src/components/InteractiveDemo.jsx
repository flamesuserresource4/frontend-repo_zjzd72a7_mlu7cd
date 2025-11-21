import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function WaveVisualizer({ label, variant = 'dynamic', playing }) {
  const canvasRef = useRef(null)
  const raf = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let t = 0

    const render = () => {
      const w = canvas.width = canvas.offsetWidth
      const h = canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      if (variant === 'flat') {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, h/2)
        ctx.lineTo(w, h/2)
        ctx.stroke()
      } else {
        const grad = ctx.createLinearGradient(0, 0, w, 0)
        grad.addColorStop(0, '#06b6d4')
        grad.addColorStop(0.5, '#a855f7')
        grad.addColorStop(1, '#6366f1')
        ctx.strokeStyle = grad
        ctx.lineWidth = 3
        ctx.beginPath()
        const amp = playing ? 28 : 12
        const freq = 0.02
        for (let x = 0; x <= w; x++) {
          const y = h/2 + Math.sin(x * freq + t) * amp * Math.sin(t * 0.5)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // particles
        for (let i = 0; i < 45; i++) {
          const px = (i / 44) * w
          const py = h/2 + Math.sin(px * freq + t) * amp * Math.sin(t * 0.5)
          const size = 1.2 + Math.sin(t + i) * 0.6
          ctx.fillStyle = 'rgba(6, 182, 212, 0.6)'
          ctx.beginPath()
          ctx.arc(px, py, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      t += 0.08
      raf.current = requestAnimationFrame(render)
    }

    raf.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf.current)
  }, [variant, playing])

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-cyan-200/80">{label}</span>
        {variant === 'dynamic' && (
          <span className="text-[10px] uppercase tracking-wide text-cyan-300">3D-enhanced</span>
        )}
      </div>
      <div className="h-28 relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  )
}

function InteractiveDemo() {
  const [playing, setPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const oscRef = useRef(null)
  const gainRef = useRef(null)

  const ensureAudio = async () => {
    if (!audioCtxRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 220
      gain.gain.value = 0
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      audioCtxRef.current = ctx
      oscRef.current = osc
      gainRef.current = gain
    }
  }

  const togglePlay = async () => {
    await ensureAudio()
    const gain = gainRef.current
    if (!gain) return
    if (playing) {
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.2)
      setPlaying(false)
    } else {
      gain.gain.setTargetAtTime(0.04, audioCtxRef.current.currentTime, 0.05)
      setPlaying(true)
    }
  }

  useEffect(() => () => {
    try {
      oscRef.current?.stop()
      audioCtxRef.current?.close()
    } catch {}
  }, [])

  return (
    <section className="relative bg-[#060816] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white text-center"
        >
          Listen to the Difference
        </motion.h3>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <WaveVisualizer label="Standard Bot" variant="flat" playing={false} />
          <WaveVisualizer label="Call-It AI" variant="dynamic" playing={playing} />
        </div>

        <div className="mt-10 flex items-center justify-center">
          <button onClick={togglePlay} className="relative inline-flex items-center gap-3 px-6 py-3 rounded-xl text-white font-semibold">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-600 opacity-80 blur-[8px]" />
            <span className="relative z-10 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur">
              {playing ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-cyan-300"><path d="M8 6h3v12H8zM13 6h3v12h-3z" fill="currentColor"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-cyan-300"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>
              )}
              {playing ? 'Pause Demo' : 'Hear the Demo'}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default InteractiveDemo
