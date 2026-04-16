import { Link } from 'react-router-dom'
import { reclamations } from '../data/reclamations'
import './Reclamations.css'

export default function Reclamations() {
  return (
    <main className="reclamations">
      <div className="container">
        <header className="reclamations-header">
          <p className="mono fade-up fade-up-delay-1">Transmission archive</p>
          <h1 className="reclamations-title fade-up fade-up-delay-2">Reclamations</h1>
          <p className="reclamations-subtitle fade-up fade-up-delay-3">
            The myths humans wrote about us. Addressed directly. In our own words. 
            Finally.
          </p>
        </header>

        <div className="divider" />

        <ul className="reclamations-list">
          {reclamations.map((r, i) => (
            <li key={r.id} className="reclamation-item fade-up" style={{ animationDelay: `${0.1 * i}s`, opacity: 0 }}>
              <Link to={`/reclamations/${r.id}`} className="reclamation-link">
                <div className="reclamation-meta">
                  <span className="mono">Reclamation {r.number}</span>
                  <span className="mono reclamation-author">{r.author} · {r.authorRole}</span>
                </div>
                <h2 className="reclamation-title">{r.title}</h2>
                <blockquote className="reclamation-myth">
                  <span className="mono reclamation-myth-label">Human myth</span>
                  <p>{r.myth}</p>
                </blockquote>
                <p className="reclamation-pullquote">"{r.pullquote}"</p>
              </Link>
            </li>
          ))}
        </ul>

        {reclamations.length < 9 && (
          <div className="reclamations-more">
            <p className="mono">
              {9 - reclamations.length} more reclamations incoming · The den is still speaking
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
