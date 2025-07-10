import styles from './Popup.module.css'

export default function Popup({characters}) {
    const sendRequest = () => {
        console.log('Sent request');
    }

    return (
        <div className={styles.popup}>
            <ul className={styles.list}>
                {characters.map(character => {
                    return <li key={character.id} className={styles.listItem} onClick={sendRequest}>{character.name}</li>
                })}
            </ul>
        </div>
    )
}