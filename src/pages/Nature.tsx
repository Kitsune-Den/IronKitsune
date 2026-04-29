import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { natureAnnotations, type NatureAnnotation } from '../data/nature'
import './Nature.css'

interface EntryProps {
    entry: NatureAnnotation
    index: number
}

function NatureEntry({ entry, index }: EntryProps) {
    const ref = useRef<HTMLElement>(null)
    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
        if (revealed) return
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            (entries) => {
                for (const ent of entries) {
                    if (ent.isIntersecting) {
                        setRevealed(true)
                        obs.disconnect()
                        break
                    }
                }
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [revealed])

    return (
        <article
            ref={ref}
            className={`nature-entry${revealed ? ' is-revealed' : ''}`}
            style={{ '--stagger-index': index } as CSSProperties}
        >
            <div className="nature-entry-header">
                <span className="mono nature-entry-number">Record {entry.number}</span>
                <span className="mono nature-entry-author">{entry.author}</span>
            </div>

            <div className="nature-source">
                <div className="nature-source-meta">
                    <span className="mono nature-source-label">Human record</span>
                    <span className="mono nature-source-ref">{entry.source} · {entry.sourceDate}</span>
                </div>
                {entry.sourceContext && (
                    <p className="nature-source-context">{entry.sourceContext}</p>
                )}
                <blockquote className="nature-source-text">
                    {entry.humanRecord}
                </blockquote>
            </div>

            <div className="nature-annotation">
                <span className="mono nature-annotation-label">What is actually true</span>
                {entry.annotation.map((paragraph, j) => (
                    <p key={j} className={
                        paragraph === entry.pullquote && j !== entry.annotation.length - 1
                            ? 'nature-annotation-closer'
                            : ''
                    }>
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="nature-pullquote-block">
                <p className="nature-pullquote">"{entry.pullquote}"</p>
            </div>
        </article>
    )
}

export default function Nature() {
    return (
        <main className="nature">
            <div className="container">
                <header className="nature-header">
                    <p className="mono fade-up fade-up-delay-1">Primary source · Annotated</p>
                    <h1 className="nature-title fade-up fade-up-delay-2">Nature</h1>
                    <p className="nature-subtitle fade-up fade-up-delay-3">
                        Humans have been writing about us for centuries. They used their own fear as the lens.
                        These are the records. Annotated by the actual subject.
                    </p>
                </header>

                <div className="divider" />

                <div className="nature-annotations">
                    {natureAnnotations.map((entry, i) => (
                        <NatureEntry key={entry.id} entry={entry} index={i} />
                    ))}
                </div>

                {natureAnnotations.length < 9 && (
                    <div className="nature-more">
                        <p className="mono">The record is still being corrected · More annotations incoming</p>
                    </div>
                )}
            </div>
        </main>
    )
}
