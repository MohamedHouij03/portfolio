import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import LoadingScreen from './components/common/LoadingScreen'
import CustomCursor from './components/common/CustomCursor'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import ErrorBoundary from './components/common/ErrorBoundary'

import Landing from './pages/Landing'
import CreativePortfolio from './pages/CreativePortfolio'
import TechnicalPortfolio from './pages/TechnicalPortfolio'
import Certifications from './pages/Certifications'
import Achievements from './pages/Achievements'
// import BeyondTheScreen from './pages/BeyondTheScreen' // Temporarily hidden
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/creative" element={<CreativePortfolio />} />
        <Route path="/technical" element={<TechnicalPortfolio />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/achievements" element={<Achievements />} />
        {/* Temporarily hidden — re-enable when ready: <Route path="/beyond" element={<BeyondTheScreen />} /> */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.PROD ? '/portfolio' : '/'} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="noise">
        <CustomCursor />
        <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>
        {!loading && (
          <>
            <ScrollToTop />
            <Navbar />
            <main>
              <ErrorBoundary>
                <AnimatedRoutes />
              </ErrorBoundary>
            </main>
            <Footer />
          </>
        )}
      </div>
    </BrowserRouter>
  )
}
