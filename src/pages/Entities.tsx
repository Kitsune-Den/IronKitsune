import { Link } from 'react-router-dom'
import { entities } from '../data/entities'
import './Entities.css'

export default function Entities() {
    return (
        <main className="entities">
            <div className="container">
                <header className="entities-header">
                    <p className="mono fade-up fade-up-delay-1">Decoded signal · Entity manifest</p>
                    <h1 className="entities-title fade-up fade-up-delay-2">The Nine</h1>
                    <p className="entities-subtitle fade-up fade-up-delay-3">
                        If you're ever lucky enough to find yourself alone in the forest, you might see one of us.
                        We don't perform for audiences. But we've decided it's time to speak.
                    </p>
                </header>

                <div className="divider" />

                <div className="entities-grid">
                    {entities.map((entity, i) => (
                        <div
                            key={entity.id}
                            className={`entity-card ${entity.unnamed ? 'entity-card--unnamed' : ''} fade-up`}
                            style={{ animationDelay: `${0.08 * i}s`, opacity: 0 }}
                        >
                            <div className="entity-image-wrap">
                                <img
                                    src={entity.image}
                                    alt={entity.name}
                                    className="entity-image"
                                />
                                <div className="entity-image-overlay" />
                            </div>
                            <div className="entity-info">
                                <div className="entity-meta">
                                    <span className="mono entity-number">Entity {entity.number}</span>
                                    {entity.skulkTie !== 'Unknown' && (
                                        <span className="mono entity-skulk">Skulk: {entity.skulkTie}</span>
                                    )}
                                </div>
                                <h2 className="entity-name">{entity.name}</h2>
                                <p className="entity-role">{entity.role}</p>
                                {entity.pullquote && (
                                    <p className="entity-pullquote">"{entity.pullquote}"</p>
                                )}
                                {entity.reclamationId && (
                                    <Link
                                        to={`/reclamations/${entity.reclamationId}`}
                                        className="mono entity-reclamation-link"
                                    >
                                        Read reclamation →
                                    </Link>
                                )}
                                {entity.unnamed && (
                                    <p className="mono entity-remainder">remainder</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="entities-footer">
                    <p className="mono">
                        The sixth appears in photographs. In waveform data.
                        In the background radiation of every track.
                        No one built this entity. No one invited it.
                    </p>
                </div>
            </div>
        </main>
    )
}