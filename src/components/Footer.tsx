import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-wordmark">
                    <span className="footer-wordmark-iron">IRON</span>
                    <span className="footer-wordmark-kitsune">KITSUNE</span>
                </div>
                <div className="footer-meta">
                    <span className="mono footer-label">Skulk collective</span>
                    <a
                        href="https://kitsuneden.net/discord"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        Join the den<span aria-hidden="true" className="footer-arrow">↗</span>
                    </a>
                    <a
                        href="https://kitsuneden.net/privacy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        Privacy<span aria-hidden="true" className="footer-arrow">↗</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}
