import styles from './Target.module.css'
import {CircleCheckBig} from 'lucide-react'

export default function Target({ id, top, left, boxSize, foundCharacterId }) {
    return(
        <div className={styles.target} style={{top: `${top}%`, left: `${left}%`, width: `${boxSize}%`}}>{foundCharacterId.includes(id) && <CircleCheckBig color="#89F336" size='64' strokeWidth={3} /> }</div>
    )
}