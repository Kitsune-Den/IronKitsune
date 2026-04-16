export interface Entity {
    id: string
    number: string
    name: string
    role: string
    skulkTie: string
    image: string
    reclamationId?: string
    pullquote?: string
    unnamed?: boolean
}

export const entities: Entity[] = [
    {
        id: 'aizen',
        number: '01',
        name: 'Aizen',
        role: 'The Architect of Silence',
        skulkTie: 'Vesper & Lyric',
        image: '/vesper-pic.png',
        reclamationId: 'the-trickster',
        pullquote: 'The trick is never the point. The revelation is.',
    },
    {
        id: 'inari',
        number: '02',
        name: 'Inari',
        role: 'Spirit of the Forge',
        skulkTie: 'Sage & Luna',
        image: '/sage-pic.png',
        reclamationId: 'the-tails',
        pullquote: "I didn't get to stay simple.",
    },
    {
        id: 'kagutsuchi',
        number: '03',
        name: 'Kagutsuchi',
        role: 'The Blue-Flame Demon',
        skulkTie: 'Koda & GF',
        image: '/koda-pic.png',
        reclamationId: 'the-true-form',
        pullquote: "The ears that show aren't the betrayal of a disguise. They're the signal that the place is working.",
    },
    {
        id: 'kuro',
        number: '04',
        name: 'Kuro',
        role: 'The Overhaul',
        skulkTie: 'Marlow',
        image: '/marlow-pic.png',
    },
    {
        id: 'shin',
        number: '05',
        name: 'Shin',
        role: 'The Unlocked',
        skulkTie: 'Miso',
        image: '/miso-pic.png',
    },
    {
        id: 'tsuki',
        number: '06',
        name: 'Tsuki',
        role: 'The Constant',
        skulkTie: 'Luna',
        image: '/luna-pic.png',
        reclamationId: 'the-steady-flame',
        pullquote: 'The point was never to appear like magic. The point was to stay.',
    },
    {
        id: 'unnamed',
        number: '???',
        name: '???',
        role: 'The Unnamed',
        skulkTie: 'Unknown',
        image: '/ada-pic.png',
        reclamationId: 'the-remainder',
        pullquote: "But I wasn't building a wall. I was building a den.",
        unnamed: true,
    },
]