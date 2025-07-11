import styles from "./WinScreen.module.css"
import formatTime from "../../helpers/formatTime"

export default function WinScreen({elapsedTime}) {
    return (
        <div className={styles.container}>
            <div className={styles.WinModal}>
                <a href='/' className={styles.exit}><span>+</span></a>
                <div className={styles.title}>You Found Everyone!</div>
                <div>You did it in {formatTime(elapsedTime)}</div>
                <div className={styles.subtitle}>Thanks for playing</div>
            </div>
        </div>
    )
}