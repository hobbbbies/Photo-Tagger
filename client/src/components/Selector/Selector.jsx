import styles from './Selector.module.css'

export default function Selector({left, top, boxSize}) {
    return (
        <div className={styles.box} style={{top: `${top}px`, left: `${left}px`, width: `${boxSize}px`}}></div>
    )
}