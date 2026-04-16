import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

const links = [
    { path: '/', label: 'Den' },
    { path: '/reclamations', label: 'Reclamations' },
    { path: '/entities', label: 'Entities' },
    { path: '/nature', label: 'Nature' },
    { path: '/tails', label: 'Tails' },
]

export default function Nav() {
    const { pathname } = useLocation()

    return (
        <nav className="nav">
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
                </ul>
            </div>
        </nav>
    )
}