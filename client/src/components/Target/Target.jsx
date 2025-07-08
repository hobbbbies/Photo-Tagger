import styles from './Target.module.css'

export default function Target({ top, left, boxSize }) {
    return(
        <div className={styles.target} style={{top: `${top}%`, left: `${left}%`, width: `${boxSize}%`}}></div>
    )
}