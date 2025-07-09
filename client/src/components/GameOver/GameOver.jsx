import styles from "./GameOver.module.css"

export default function GameOver() {
    return (
        <div className={styles.container}>
            <div className={styles.gameOverBox}>
                <a href='/' className={styles.exit}><span>+</span></a>
                <div className={styles.title}>GAME OVER</div>
                <div className={styles.subtitle}>Ran out of attempts</div>
            </div>
        </div>
    )
}