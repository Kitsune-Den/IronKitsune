import './Placeholder.css'

interface PlaceholderProps {
  title: string
  number: string
  teaser: string
}

export default function Placeholder({ title, number, teaser }: PlaceholderProps) {
  return (
    <main className="placeholder">
      <div className="container">
        <span className="mono fade-up fade-up-delay-1">{number}</span>
        <h1 className="placeholder-title fade-up fade-up-delay-2">{title}</h1>
        <p className="placeholder-teaser fade-up fade-up-delay-3">{teaser}</p>
        <div className="placeholder-signal fade-up fade-up-delay-4">
          <span className="mono">Signal incoming · Den still speaking</span>
          <div className="placeholder-bar">
            <div className="placeholder-bar-fill" />
          </div>
        </div>
      </div>
    </main>
  )
}
