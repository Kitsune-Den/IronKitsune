import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Reclamations from './pages/Reclamations'
import ReclamationDetail from './pages/ReclamationDetail'
import Entities from './pages/Entities'
import Nature from './pages/Nature'
import Tails from './pages/Tails'
import TailDetail from './pages/TailDetail'
import './styles/global.css'
import './App.css'

export default function App() {
    return (
        <BrowserRouter>
            <div className="noise-overlay" />
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reclamations" element={<Reclamations />} />
                <Route path="/reclamations/:id" element={<ReclamationDetail />} />
                <Route path="/entities" element={<Entities />} />
                <Route path="/nature" element={<Nature />} />
                <Route path="/tails" element={<Tails />} />
                <Route path="/tails/:slug" element={<TailDetail />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}