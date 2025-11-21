import React, { useEffect, useRef } from 'react'

function Particles({ className = '' }) {
  const canvasRef = useRef(null)
  const raf = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // create nodes
    const count = 70
    const nodes = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      // draw lines
      for (let i = 0; i < count; i++) {
        const a = nodes[i]
        a.x += a.vx
        a.y += a.vy
        if (a.x < 0 || a.x > w) a.vx *= -1
        if (a.y < 0 || a.y > h) a.vy *= -1
        for (let j = i + 1; j < count; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 160 * 160) {
            const alpha = 1 - d2 / (160 * 160)
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0, 'rgba(6, 182, 212,' + (0.35 * alpha) + ')')
            grad.addColorStop(1, 'rgba(168, 85, 247,' + (0.35 * alpha) + ')')
            ctx.strokeStyle = grad
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      // draw nodes
      nodes.forEach(n => {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2)
        ctx.fill()
      })

      raf.current = requestAnimationFrame(render)
    }
    raf.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className={"pointer-events-none absolute inset-0 " + className}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default Particles
