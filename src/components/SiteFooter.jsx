import React from 'react'

function SiteFooter() {
  return (
    <footer className="relative bg-[#050712] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600" />
            <div className="text-2xl font-bold text-white tracking-tight">Call-It AI</div>
          </div>
          <nav className="flex flex-wrap gap-6 text-cyan-200/80">
            <a className="hover:text-cyan-200" href="/login">Login</a>
            <a className="hover:text-cyan-200" href="#">API Docs</a>
            <a className="hover:text-cyan-200" href="#">Pricing</a>
            <a className="hover:text-cyan-200" href="#">Contact</a>
          </nav>
        </div>
        <p className="mt-8 text-cyan-200/50 text-sm">© {new Date().getFullYear()} Call-It AI. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default SiteFooter
