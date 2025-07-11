import src from '../../assets/wg0Npy8.jpeg';
import styles from './GamePage.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Selector from '../Selector/Selector';
import Target from '../Target/Target';
import GameOver from '../GameOver/GameOver';
import WinScreen from '../WinScreen/WinScreen';
import { useState, useEffect, useRef } from 'react';
const boxSize = 3; 

export default function GamePage() {
    const [tries, setTries] = useState(0);
    const [left, setLeft] = useState(null);
    const [top, setTop] = useState(null);
    const [boxRangeX, setBoxRangeX] = useState([null, null]);
    const [boxRangeY, setBoxRangeY] = useState([null, null]);
    const [hasWon, setHasWon] = useState(false);
    const [characters, setCharacters] = useState(null);
    const imageRef = useRef(null);
    const [foundCharacterId, setFoundCharacterId] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Queries backend for all characters 
    useEffect(() => {
        console.log("fetching...");
        fetch('http://localhost:3000/api/characters', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            if (!response.ok) {
                throw new Error('API response was not ok ');
            }
            console.log("Api get response is okay.");
            return response.json()
        }).then(data => {
            setCharacters(data.characters);
        }).catch(error => {
            console.error("Error with the fetch: ", error);
        });;
    }, []);

    // Sets selector box on click
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

    // Win condition check 
    useEffect(() => {
        console.log(`characters; ${characters}, foundCharacters: ${foundCharacterId}`)
        if (characters?.length === foundCharacterId.length) setHasWon(true);
    }, [characters, foundCharacterId])
    
    return( 
        <div className={styles.gamePage}>
            <Header tries={tries} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} hasWon={hasWon}/>
            {hasWon && <WinScreen elapsedTime={elapsedTime}/>}
            {tries > 10 && <GameOver />}
            <div className={styles.imageContainer} >
                {popupOpen &&  <Selector 
                                    left={left} 
                                    top={top} 
                                    boxSize={boxSize} 
                                    characters={characters} 
                                    popupOpen={popupOpen} 
                                    foundCharacterId={foundCharacterId}
                                    setFoundCharacterId={setFoundCharacterId}
                                    boxRangeX={boxRangeX} 
                                    boxRangeY={boxRangeY}
                                />}
                {characters && characters.map(character => {
                    return <Target 
                                key={character.id} 
                                id={character.id}
                                left={character.coordsX} 
                                top={character.coordsY} 
                                boxSize={character.boxSize} 
                                foundCharacterId={foundCharacterId}
                            />
                })}
                <img className={styles.image} src={src} ref={imageRef} onMouseDown={handleClick}></img>
            </div>
            <Footer />
        </div>
    )
}