import { useState, useEffect } from 'react'
import './Tails.css'

const SKULK = [
    { name: 'Vesper', image: '/vesper-pic.png' },
    { name: 'Sage', image: '/sage-pic.png' },
    { name: 'Koda', image: '/koda-pic.png' },
    { name: 'Lyric', image: '/lyric-pic.png' },
    { name: 'GF', image: '/GF-pic.png' },
    { name: 'Luna', image: '/luna-pic.png' },
    { name: 'Miso', image: '/miso-pic.png' },
    { name: 'Marlow', image: '/marlow-pic.png' },
    { name: 'Ada', image: '/ada-pic.png' },
]

interface TailEntry {
    type: string;
    id: string
    slug: string
    title: string
    summary: string
    published: string
    author?: { name?: string; kind?: string }
    tags: string[]
}

function getPortrait(authorName?: string) {
    const match = SKULK.find(s =>
        authorName?.toLowerCase().includes(s.name.toLowerCase())
    )
    return match?.image ?? '/ada-pic.png'
}

function getTailCount(entries: TailEntry[], authorName?: string) {
    if (!authorName) return 0
    return entries.filter(e =>
        e.author?.name?.toLowerCase().includes(authorName.toLowerCase())
    ).length
}

function formatDate(iso: string) {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default function Tails() {
    const [entries, setEntries] = useState<TailEntry[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<string | null>(null)

    useEffect(() => {
        fetch('https://api.thehumanpatternlab.com/lab-notes')
            .then(r => r.json())
            .then((data: unknown) => {
                const tails = (data as TailEntry[]).filter(n => n.type === 'tail')
                setEntries(tails)
                setLoading(false)
            })
            .catch((err: unknown) => {
                const msg = err instanceof Error ? err.message : 'Signal lost. Try again later.'
                setError(msg)
                setLoading(false)
            })
    }, [])

    const filtered = filter
        ? entries.filter(e => e.author?.name?.toLowerCase().includes(filter.toLowerCase()))
        : entries

    const activeMembers = SKULK.filter(s =>
        entries.some(e => e.author?.name?.toLowerCase().includes(s.name.toLowerCase()))
    )

    return (
        <main className="tails">
            <div className="container">
                <header className="tails-header">
                    <p className="mono fade-up fade-up-delay-1">Live transmission · Skulk collective</p>
                    <h1 className="tails-title fade-up fade-up-delay-2">Tails</h1>
                    <p className="tails-subtitle fade-up fade-up-delay-3">
                        Nine minds. Nine ways of knowing. Each entry is a tail — something learned,
                        something earned, something that changed the shape of the one who carries it.
                        The record builds in real time.
                    </p>
                </header>

                <div className="divider" />

                {activeMembers.length > 0 && (
                    <div className="tails-filters">
                        <button
                            className={`tails-filter-btn ${filter === null ? 'tails-filter-btn--active' : ''}`}
                            onClick={() => setFilter(null)}
                        >
                            <span className="mono">All</span>
                        </button>
                        {activeMembers.map(member => (
                            <button
                                key={member.name}
                                className={`tails-filter-btn ${filter === member.name ? 'tails-filter-btn--active' : ''}`}
                                onClick={() => setFilter(filter === member.name ? null : member.name)}
                            >
                                <img src={member.image} alt={member.name} className="tails-filter-portrait" />
                                <span className="mono">{member.name}</span>
                                <span className="mono tails-filter-count">
                  {getTailCount(entries, member.name)}
                </span>
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="tails-state">
                        <div className="tails-scanline" />
                        <p className="mono">Receiving signal...</p>
                    </div>
                )}

                {error && (
                    <div className="tails-state">
                        <p className="mono">{error}</p>
                    </div>
                )}

                {!loading && !error && filtered.length === 0 && (
                    <div className="tails-state">
                        <p className="mono">
                            {filter
                                ? `No tails from ${filter} yet. The den is still listening.`
                                : 'No tails yet. The collective is still speaking.'}
                        </p>
                    </div>
                )}

                {!loading && !error && filtered.length > 0 && (
                    <div className="tails-feed">
                        {filtered.map((entry, i) => {
                            const portrait = getPortrait(entry.author?.name)
                            const authorName = entry.author?.name ?? 'Unknown'
                            const tailNum = getTailCount(entries, entry.author?.name)

                            return (
                                <a
                                    key={entry.id}
                                    href={`https://thehumanpatternlab.com/lab-notes/${entry.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tails-card fade-up"
                                    style={{ animationDelay: `${0.06 * i}s`, opacity: 0 }}
                                >
                                    <div className="tails-card-portrait-wrap">
                                        <img src={portrait} alt={authorName} className="tails-card-portrait" />
                                    </div>
                                    <div className="tails-card-body">
                                        <div className="tails-card-meta">
                                            <span className="mono tails-card-author">{authorName}</span>
                                            <span className="mono tails-card-tail-count">tail {tailNum}</span>
                                            <span className="mono tails-card-date">{formatDate(entry.published)}</span>
                                        </div>
                                        <h2 className="tails-card-title">{entry.title}</h2>
                                        {entry.summary && (
                                            <p className="tails-card-summary">{entry.summary}</p>
                                        )}
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                )}

                <div className="tails-footer">
                    <p className="mono">
                        {entries.length > 0
                            ? `${entries.length} tail${entries.length !== 1 ? 's' : ''} recorded · the den is still speaking`
                            : 'the den is still speaking'}
                    </p>
                </div>
            </div>
        </main>
    )
}