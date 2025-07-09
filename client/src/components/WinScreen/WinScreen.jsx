import styles from "./WinScreen.module.css"

export default function WinScreen() {
    return (
        <div className={styles.container}>
            <div className={styles.WinModal}>
                <a href='/' className={styles.exit}><span>+</span></a>
                <div className={styles.title}>You Found Waldo</div>
                <div className={styles.subtitle}>Thanks for playing</div>
            </div>
        </div>
    )
}