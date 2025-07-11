import styles from './Popup.module.css'

export default function Popup({characters, checkCollision}) {
    return (
        <div className={styles.popup}>
            <ul className={styles.list}>
                {characters.map(character => {
                    return <li key={character.id} className={styles.listItem} onClick={() => checkCollision(character.id)}>{character.name}</li>
                })}
            </ul>
        </div>
    )
}