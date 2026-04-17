import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import './TailDetail.css'

const SKULK = [
    { name: 'Vesper', image: '/vesper-pic.webp' },
    { name: 'Sage', image: '/sage-pic.webp' },
    { name: 'Koda', image: '/koda-pic.webp' },
    { name: 'Lyric', image: '/lyric-pic.webp' },
    { name: 'GF', image: '/GF-pic.webp' },
    { name: 'Luna', image: '/luna-pic.webp' },
    { name: 'Miso', image: '/miso-pic.webp' },
    { name: 'Marlow', image: '/marlow-pic.webp' },
    { name: 'Ada', image: '/ada-pic.webp' },
]

interface TailDetailResponse {
    id: string
    slug: string
    title: string
    subtitle?: string
    summary: string
    contentHtml: string
    published: string
    status: string
    type: string
    dept?: string
    locale: string
    author?: { kind?: string; name?: string; id?: string }
    department_id: string
    shadow_density: number
    safer_landing: boolean
    tags: string[]
    readingTime: number
    created_at: string
    updated_at: string
    card_style?: string
}

function getPortrait(authorName?: string) {
    const match = SKULK.find(s =>
        authorName?.toLowerCase().includes(s.name.toLowerCase())
    )
    return match?.image ?? '/ada-pic.webp'
}

function formatDate(iso: string) {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default function TailDetail() {
    const { slug } = useParams()
    const [entry, setEntry] = useState<TailDetailResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!slug) return
        const apiBase = import.meta.env.VITE_API_BASE ?? 'https://api.thehumanpatternlab.com'
        setLoading(true)
        setError(null)
        fetch(`${apiBase}/lab-notes/${slug}`)
            .then(r => {
                if (!r.ok) throw new Error(r.status === 404 ? 'Tail not found.' : `HTTP ${r.status}`)
                return r.json()
            })
            .then((data: TailDetailResponse) => {
                setEntry(data)
                setLoading(false)
                window.scrollTo(0, 0)
            })
            .catch((err: unknown) => {
                const msg = err instanceof Error ? err.message : 'Signal lost. Try again later.'
                setError(msg)
                setLoading(false)
            })
    }, [slug])

    if (!slug) return <Navigate to="/tails" replace />

    return (
        <main className="tail-detail">
            <div className="container">
                <nav className="tail-detail-breadcrumb">
                    <Link to="/tails" className="mono tail-detail-back">← Tails</Link>
                </nav>

                {loading && (
                    <div className="tail-detail-state">
                        <p className="mono">Receiving signal...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="tail-detail-state">
                        <p className="mono">{error}</p>
                    </div>
                )}

                {entry && !loading && !error && (
                    <>
                        <header className="tail-detail-header fade-up fade-up-delay-1">
                            <div className="tail-detail-meta">
                                <img
                                    src={getPortrait(entry.author?.name)}
                                    alt={entry.author?.name ?? ''}
                                    className="tail-detail-portrait"
                                />
                                <div className="tail-detail-meta-text">
                                    <span className="mono tail-detail-author">
                                        {entry.author?.name ?? 'Unknown'}
                                    </span>
                                    <span className="mono tail-detail-date">
                                        {formatDate(entry.published)}
                                        {entry.readingTime ? ` · ${entry.readingTime} min read` : ''}
                                    </span>
                                </div>
                            </div>
                            <h1 className="tail-detail-title">{entry.title}</h1>
                            {entry.subtitle && (
                                <p className="tail-detail-subtitle">{entry.subtitle}</p>
                            )}
                        </header>

                        <div className="divider" />

                        {entry.summary && (
                            <div className="tail-detail-summary fade-up fade-up-delay-2">
                                <p>{entry.summary}</p>
                            </div>
                        )}

                        <article
                            className="tail-detail-body fade-up fade-up-delay-3"
                            dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
                        />

                        {entry.tags && entry.tags.length > 0 && (
                            <div className="tail-detail-tags">
                                {entry.tags.map(tag => (
                                    <span key={tag} className="mono tail-detail-tag">#{tag}</span>
                                ))}
                            </div>
                        )}

                        <div className="tail-detail-canonical">
                            <a
                                href={`https://thehumanpatternlab.com/lab-notes/${entry.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mono tail-detail-canonical-link"
                            >
                                Read on Human Pattern Lab <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}
