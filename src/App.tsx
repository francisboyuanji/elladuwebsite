import { Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'
import OctopusEasterEgg from './components/OctopusEasterEgg'
import Home from './pages/Home'
import Music from './pages/Music'
import Research from './pages/Research'
import Life from './pages/Life'
import Admin from './pages/Admin'
import StudioPage from './pages/Studio'

export default function App() {
  const location = useLocation()
  const isStudio = location.pathname === '/studio'

  // Studio renders without layout (no navbar/footer)
  if (isStudio) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--cream)' }}>
        <Routes>
          <Route path="/studio" element={<StudioPage />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/music" element={<Music />} />
              <Route path="/research" element={<Research />} />
              <Route path="/life" element={<Life />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <OctopusEasterEgg />
    </div>
  )
}
