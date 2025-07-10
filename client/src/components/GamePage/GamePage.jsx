import src from '../../assets/wg0Npy8.jpeg';
import styles from './GamePage.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Selector from '../Selector/Selector';
import Target from '../Target/Target';
import GameOver from '../GameOver/GameOver';
import WinScreen from '../WinScreen/WinScreen';
import { checkCollision } from './checkCollision';
import { useState, useEffect, useRef } from 'react';

const desiredCoordinates = [92, 56.2];
const characters = [{name: 'Waldo', id: 1, coords: [92, 56.2], boxSize: 3}, {name: 'Alien', id: 2, coords: [85, 50],  boxSize: 3}];
for (let character of characters) {
    character.minX = character.coords[0] - character.boxSize / 2;
    character.maxX = character.coords[1] + character.boxSize / 2;
    character.minY = character.coords[0] - character.boxSize;
    character.maxX = character.coords[1] + character.boxSize
}
const boxSize = 3; 
const targetSize = 2;



export default function GamePage() {
    const [tries, setTries] = useState(0);
    const [left, setLeft] = useState(null);
    const [top, setTop] = useState(null);
    const [boxRangeX, setBoxRangeX] = useState([null, null]);
    const [boxRangeY, setBoxRangeY] = useState([null, null]);
    const [desiredRangeX, setDesiredRangeX] = useState([null, null]);
    const [desiredRangeY, setDesiredRangeY] = useState([null, null]);
    const [hasWon, setHasWon] = useState(false);
    const imageRef = useRef(null);
    
    const [popupOpen, setPopupOpen] = useState(false);
    // useEffect(() => {
    //     const targetMinX = desiredCoordinates[0] - boxSize / 2;
    //     const targetMaxX = desiredCoordinates[0] + boxSize / 2;
    //     // Don't divide Y range by 2 because... IDK but range is half of what it should be if you do.
    //     const targetMinY = desiredCoordinates[1] - boxSize;
    //     const targetMaxY = desiredCoordinates[1] + boxSize;
    //     setDesiredRangeX([targetMinX, targetMaxX]);
    //     setDesiredRangeY([targetMinY, targetMaxY]);
        
    // }, []);

    useEffect(() => {
        console.log(`left: ${left}, top: ${top}, boxRangeX[0]: ${boxRangeX[0]}, boxRangY[0]: ${boxRangeY[0]}`);
        if (left !== null && top !== null && boxRangeX[0] !== null && boxRangeY[0] !== null) {
            console.log('fetching...');
            fetch('/api/checkCollision', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boxRangeX: boxRangeX, boxRangeY: boxRangeY, desiredRangeX: desiredRangeX, desiredRangeY: desiredRangeY })
            }).then(response => {
                if (!response.ok) {
                    throw new Error('API response was not ok ');
                }
                console.log("Api response is okay.");
                return response.json();
            }).then(data => {
                console.log('data sent: ', data);
                if (data.isWithinBox) {
                    console.log('true');
                }
            }).catch(error => {
                console.error("Error with the fetch: ", error);
            });
        }
    }, [left, top, boxRangeX, boxRangeY, desiredRangeX, desiredRangeY]);

    // Sets selector box
    const handleClick = (e) => {
        if (popupOpen && !e.target.classList.contains(styles.box)) {
            setPopupOpen(false);
        } else {
            setPopupOpen(true);
            setTries(tries + 1);
        }
        console.log(`X: ${e.clientX}, Y: ${e.clientY}`);

        const relativeX = e.nativeEvent.offsetX / imageRef.current.offsetWidth * 100;
        const relativeY = e.nativeEvent.offsetY / imageRef.current.offsetHeight * 100;
        console.log(`X: ${relativeX}, Y: ${relativeY}`);
        
        setLeft(relativeX);
        setTop(relativeY);
        const minX = relativeX - boxSize / 2;
        const maxX = relativeX + boxSize / 2;
        const minY = relativeY - boxSize / 2;
        const maxY = relativeY + boxSize / 2;

        setBoxRangeX([minX, maxX]);
        setBoxRangeY([minY, maxY]);
    }

    // const handleImageContainerClick = (e) => {

    // }
    
    return( 
        <div className={styles.gamePage}>
            <Header tries={tries}/>
            {hasWon && <WinScreen />}
            {tries > 10 && <GameOver />}
            <div className={styles.imageContainer} >
                {popupOpen &&  <Selector left={left} top={top} boxSize={boxSize} characters={characters} popupOpen={popupOpen}/>}
                {characters.map(character => {
                    return <Target key={character.id} left={character.coords[0]} top={character.coords[1]} boxSize={character.boxSize} />
                })}
                {/* <Target left={desiredCoordinates[0]} top={desiredCoordinates[1]} boxSize={targetSize} /> */}
                <img className={styles.image} src={src} ref={imageRef} onMouseDown={handleClick}></img>
            </div>
            <Footer />
        </div>
    )
}