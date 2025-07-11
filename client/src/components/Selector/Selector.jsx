import styles from './Selector.module.css'
import Popup from './Popup/Popup'

export default function Selector({left, top, boxSize, characters, foundCharacterId, setFoundCharacterId, boxRangeX, boxRangeY}) {
    // const [selectedCharacter, setSelectedCharacter] = useState(null);

    const checkCollision = (charId) => {
        if (!charId) return console.error('No Char Id passed');
        console.log('fetching...');
        fetch('http://localhost:3000/api/checkCollision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ boxRangeX: boxRangeX, boxRangeY: boxRangeY, charId: charId})
        }).then(response => {
            if (!response.ok) {
                throw new Error('API response was not ok ');
            }
            console.log("Api response is okay.");
            return response.json();
        }).then(data => {
            console.log('data sent: ', data);
            if (data.isWithinBox) {
                if (foundCharacterId.includes(charId)) return;
                setFoundCharacterId([...foundCharacterId, charId]);
            }
        }).catch(error => {
            console.error("Error with the fetch: ", error);
        });
    };

    return (
            <div className={styles.box} 
                style={{top: `${top}%`, left: `${left}%`, width: `${boxSize}%`}}>
                <Popup characters={characters} checkCollision={checkCollision}/>
            </div>
    )
}