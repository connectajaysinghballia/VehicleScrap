"use client"

import React from 'react'
import styles from './CardStack.module.css'

const CardStack = () => {
    // Store indices pointing to styles.c1 (0), styles.c2 (1), styles.c3 (2)
    const [indices, setIndices] = React.useState([0, 1, 2])

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndices((prev) => {
                // Current state: [i1, i2, i3]
                // Goal: Rotate indices so colors shift
                // If Black(c1/0) is at pos 1, next it goes to pos 3 (c3/2)
                // Order of classes: c1, c2, c3
                // Logic: (index + 2) % 3 gives a backward rotation 0->2->1->0
                const [i1, i2, i3] = prev
                return [
                    (i1 + 2) % 3,
                    (i2 + 2) % 3,
                    (i3 + 2) % 3
                ]
            })
        }, 4000)

        return () => clearInterval(timer)
    }, [])

    // Card content data
    const cards = [
        {
            title: "STEP 1",
            desc: "Submit Your Details and Get Your Estimated value",
            // Local Video
            videoSrc: "/videos/step1vi.mp4",
            // Orange Filter (Adjust from Gold/Original)
            videoFilter: "none",
            videoTransform: "scale(1)",
            textBgColor: "#e65100" // Orange
        },
        {
            title: "STEP 2",
            desc: "Get a Call From Our Kabadi Center and Executive will help you in taking decision",
            // Local Video
            videoSrc: "/videos/step2vi.mp4",
            // Blue Filter
            videoFilter: "none",
            videoTransform: "scale(1.1)", // Zoom in
            textBgColor: "#0d47a1" // Blue
        },
        {
            title: "STEP 3",
            desc: "Get Instant Payment and Explore the benifits",
            // Local Video
            videoSrc: "/videos/step3vi.mp4",
            // Green Filter
            videoFilter: "none",
            videoTransform: "scale(1.1)", // Zoom in
            textBgColor: "#1b5e20" // Green
        }
    ]

    // Rotating position classes
    const posClasses = [styles.top, styles.mid, styles.bot]

    return (
        <div className={styles.main}>
            {cards.map((card, i) => (
                <div
                    key={i}
                    className={`${styles.card} ${posClasses[indices[i]]}`}
                >
                    <div className={styles.cardContent}>
                        <div className={styles.imageArea}>
                            <video
                                src={card.videoSrc}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={styles.videoBg}
                                style={{
                                    filter: card.videoFilter,
                                    transform: card.videoTransform
                                }}
                            />
                        </div>
                        <div
                            className={styles.textArea}
                            style={{ backgroundColor: card.textBgColor }}
                        >
                            <h3 className={styles.title}>{card.title}</h3>
                            <p className={styles.description}>{card.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default CardStack
