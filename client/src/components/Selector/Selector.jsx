import styles from './Selector.module.css'
import Popup from './Popup/Popup'

export default function Selector({left, top, boxSize, characters}) {
    return (
            <div className={styles.box} style={{top: `${top}%`, left: `${left}%`, width: `${boxSize}%`}}>
                <Popup characters={characters}/> 
            </div>
    )
}