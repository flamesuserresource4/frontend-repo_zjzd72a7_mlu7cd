import React from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import InteractiveDemo from './components/InteractiveDemo'
import Trust from './components/Trust'
import SiteFooter from './components/SiteFooter'
import Particles from './components/Particles'

function App() {
  const handleHearDemo = () => {
    const el = document.getElementById('demo')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-[#050712] text-white">
      <div className="fixed inset-0 -z-0">
        <Particles />
      </div>

      <Hero onHearDemo={handleHearDemo} />

      <Features />

      <div id="demo">
        <InteractiveDemo />
      </div>

      <Trust />

      <SiteFooter />
    </div>
  )
}

export default App
