import src from '../../assets/wg0Npy8.jpeg';
import styles from './GamePage.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Selector from '../Selector/Selector';
import Target from '../Target/Target';
import { useState, useEffect, useRef } from 'react';

export default function GamePage() {
    const [left, setLeft] = useState(null);
    const [top, setTop] = useState(null);
    const [boxRangeX, setBoxRangeX] = useState([null, null]);
    const [boxRangeY, setBoxRangeY] = useState([null, null]);
    const [desiredRangeX, setDesiredRangeX] = useState([null, null]);
    const [desiredRangeY, setDesiredRangeY] = useState([null, null]);
    const [desiredCoordinates, setDesiredCoordinates] = useState([93, 58]);

    const imageRef = useRef(null);
    const boxSize = 5; 

    useEffect(() => {
        const targetMinX = desiredCoordinates[0] - boxSize / 2;
        const targetMaxX = desiredCoordinates[0] + boxSize / 2;
        const targetMinY = desiredCoordinates[1] - boxSize / 2;
        const targetMaxY = desiredCoordinates[1] + boxSize / 2;
        setDesiredRangeX([targetMinX, targetMaxX]);
        setDesiredRangeY([targetMinY, targetMaxY]);
        
    }, [desiredCoordinates]);

    useEffect(() => {
        if (left !== null && top !== null && boxRangeX[0] !== null && boxRangeY[0] !== null) {
            const [desiredMinX, desiredMaxX] = desiredRangeX;
            const [desiredMinY, desiredMaxY] = desiredRangeY;
            const [minX, maxX] = boxRangeX;
            const [minY, maxY] = boxRangeY;

            console.log(`Selector Min X: ${minX}, Selector Max X: ${maxX}`);
            console.log(`Selector Min Y: ${minY}, Selector Max Y: ${maxY}`);
            console.log(`Desired Min X: ${desiredMinX}, Desired Max X: ${desiredMaxX}`);
            console.log(`Desired Min Y: ${desiredMinY}, Desired Max Y: ${desiredMaxY}`);
            
            const isWithinX = maxX >= desiredMinX && minX <= desiredMaxX;
            const isWithinY = maxY >= desiredMinY && minY <= desiredMaxY;
            const isWithinBox = isWithinX && isWithinY;

            console.log(`Desired coordinates [${desiredCoordinates[0]}%, ${desiredCoordinates[1]}%] within box: ${isWithinBox}`);

            if (isWithinBox) {
                console.log("Found the target!");
                // Add your success logic here
            }
        }
    }, [left, top, boxRangeX, boxRangeY, desiredCoordinates, desiredRangeX, desiredRangeY]);
    

    // Sets selector box
    const handleClick = (e) => {
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

    return( 
        <div className={styles.gamePage}>
            <Header />
            <div className={styles.imageContainer} onMouseDown={handleClick}>
                <Selector left={left} top={top} boxSize={boxSize} />
                {console.log(desiredCoordinates[0])}
                <Target left={desiredCoordinates[0]} top={desiredCoordinates[1]} boxSize={boxSize} />
                {/* <img className={styles.image} src={src} ref={imageRef} onLoad={getActualCoordinates}></img> */}
                <img className={styles.image} src={src} ref={imageRef}></img>
            </div>
            <Footer />
        </div>
    )
}