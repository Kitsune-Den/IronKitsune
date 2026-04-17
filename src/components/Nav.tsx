import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

const links = [
    { path: '/', label: 'Den' },
    { path: '/reclamations', label: 'Reclamations' },
    { path: '/entities', label: 'Entities' },
    { path: '/nature', label: 'Nature' },
    { path: '/tails', label: 'Tails' },
]

const DISCORD_URL = 'https://kitsuneden.net/discord'

export default function Nav() {
    const { pathname } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    // Close the mobile menu whenever the route changes.
    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    // Lock body scroll while the mobile menu is open.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    return (
        <nav className={`nav ${menuOpen ? 'nav--menu-open' : ''}`}>
            <div className="nav-inner">
                <Link to="/" className="nav-wordmark">
                    <span className="nav-wordmark-iron">IRON</span>
                    <span className="nav-wordmark-kitsune">KITSUNE</span>
                </Link>

                <ul className="nav-links">
                    {links.map(({ path, label }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className={`nav-link ${pathname === path ? 'nav-link--active' : ''}`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a
                            href={DISCORD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link nav-link--external"
                        >
                            Discord<span aria-hidden="true" className="nav-link-arrow">↗</span>
                        </a>
                    </li>
                </ul>

                <button
                    type="button"
                    className="nav-burger"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    aria-controls="nav-mobile-menu"
                    onClick={() => setMenuOpen(o => !o)}
                >
                    <span className="nav-burger-line" />
                    <span className="nav-burger-line" />
                    <span className="nav-burger-line" />
                </button>
            </div>

            <div
                id="nav-mobile-menu"
                className="nav-mobile"
                role="dialog"
                aria-modal="true"
                aria-hidden={!menuOpen}
            >
                <ul className="nav-mobile-links">
                    {links.map(({ path, label }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className={`nav-mobile-link ${pathname === path ? 'nav-mobile-link--active' : ''}`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a
                            href={DISCORD_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-mobile-link nav-mobile-link--external"
                        >
                            Discord<span aria-hidden="true" className="nav-link-arrow">↗</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}