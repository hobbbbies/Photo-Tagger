import styles from './Popup.module.css'

export default function Popup({characters, checkCollision}) {
    return (
        <div className={styles.popup}>
            <ul className={styles.list}>
                {characters.map(character => {
                    return <li 
                        key={character.id} className={styles.listItem} onClick={() => checkCollision(character.id)}>
                        <img className={styles.charImage} src={`http://localhost:3000/images/${character.name}.png`} alt="Waldo"/>
                    </li>
                })}
            </ul>
        </div>
    )
}