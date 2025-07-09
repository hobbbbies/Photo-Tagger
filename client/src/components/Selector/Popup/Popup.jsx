import styles from './Popup.module.css'

export default function Popup({characters}) {
    return (
        <div className={styles.popup}>
            <ul>
                {characters.map(character => {
                    <li>{character}</li>
                })}
            </ul>
        </div>
    )
}