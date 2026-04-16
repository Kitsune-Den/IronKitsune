import { useParams, Link, Navigate } from 'react-router-dom'
import { reclamations } from '../data/reclamations'
import './ReclamationDetail.css'

const isMovementHeader = (text: string) =>
    /^(I|II|III|IV|V|VI|VII|VIII|IX|X)\.\s/.test(text)

const isAside = (text: string) =>
    text === 'How quaint. How human.' || text === "Here's what I think is actually true."

export default function ReclamationDetail() {
  const { id } = useParams()
  const reclamation = reclamations.find(r => r.id === id)

  if (!reclamation) return <Navigate to="/reclamations" replace />

  const currentIndex = reclamations.findIndex(r => r.id === id)
  const next = reclamations[currentIndex + 1]
  const lastParagraph = reclamation.content[reclamation.content.length - 1]

  return (
      <main className="reclamation-detail">
        <div className="container">
          <nav className="detail-breadcrumb">
            <Link to="/reclamations" className="mono detail-back">← Reclamations</Link>
          </nav>

          <header className="detail-header fade-up fade-up-delay-1">
            <span className="mono">Reclamation {reclamation.number}</span>
            <h1 className="detail-title">{reclamation.title}</h1>
            <div className="detail-byline">
              <span className="mono">{reclamation.author}</span>
              <span className="mono detail-byline-role">{reclamation.authorRole}</span>
              <span className="mono detail-byline-date">{reclamation.date}</span>
            </div>
          </header>

          <div className="divider" />

          <div className="detail-myth fade-up fade-up-delay-2">
            <span className="mono detail-myth-label">What humans wrote</span>
            <blockquote className="detail-myth-text">
              {reclamation.myth}
            </blockquote>
          </div>

          <div className="divider" />

          <article className="detail-body fade-up fade-up-delay-3">
            {reclamation.content.map((paragraph, i) => {
              if (isMovementHeader(paragraph)) {
                return <p key={i} className="detail-movement">{paragraph}</p>
              }
              if (isAside(paragraph)) {
                return <p key={i} className="detail-aside">{paragraph}</p>
              }
              if (paragraph === lastParagraph) {
                return <p key={i} className="detail-closer">{paragraph}</p>
              }
              return <p key={i}>{paragraph}</p>
            })}
          </article>

          <div className="detail-pullquote-block">
            <p className="detail-pullquote">"{reclamation.pullquote}"</p>
          </div>

          {next && (
              <div className="detail-next">
                <span className="mono">Next reclamation</span>
                <Link to={`/reclamations/${next.id}`} className="detail-next-link">
                  {next.number}. {next.title} →
                </Link>
              </div>
          )}
        </div>
      </main>
  )
}