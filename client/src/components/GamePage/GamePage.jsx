import src from '../../assets/wg0Npy8.jpeg';
import styles from './GamePage.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Selector from '../Selector/Selector';
import Target from '../Target/Target';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function GamePage() {
    const [left, setLeft] = useState(null);
    const [top, setTop] = useState(null);
    const [boxRangeX, setBoxRangeX] = useState([null, null]);
    const [boxRangeY, setBoxRangeY] = useState([null, null]);
    const [desiredCoordinatesPercent, setDesiredCoordinatesPercent] = useState([93, 58]);
     const imageRef = useRef(null);
    const boxSize = 80; 

    // const desiredCoordinatesPercent = [93, 58]; // 65% from left, 30% from top

    // Calculate actual pixel coordinates from percentages
    const getActualCoordinates = useCallback(() => {
        if (!imageRef.current) return [0, 0];
        
        const imageWidth = imageRef.current.offsetWidth;
        const imageHeight = imageRef.current.offsetHeight;
        
        const actualX = (desiredCoordinatesPercent[0] / 100) * imageWidth;
        const actualY = (desiredCoordinatesPercent[1] / 100) * imageHeight;
        
        return [actualX, actualY];
    }, []);

    useEffect(() => {
        if (left !== null && top !== null && boxRangeX[0] !== null && boxRangeY[0] !== null) {
            const [desiredX, desiredY] = getActualCoordinates();
            const [minX, maxX] = boxRangeX;
            const [minY, maxY] = boxRangeY;

            const isWithinX = desiredX >= minX && desiredX <= maxX;
            const isWithinY = desiredY >= minY && desiredY <= maxY;
            const isWithinBox = isWithinX && isWithinY;

            console.log(`Desired coordinates [${desiredX.toFixed(0)}, ${desiredY.toFixed(0)}] within box: ${isWithinBox}`);

            if (isWithinBox) {
                console.log("Found the target!");
                // Add your success logic here
            }
        }
    }, [left, top, boxRangeX, boxRangeY, getActualCoordinates]);
    

    const handleClick = (e) => {
        console.log(`X: ${e.clientX}, Y: ${e.clientY}`);

        // const adjustedY = e.clientY + window.scrollY;
        const rect = e.currentTarget.getBoundingClientRect();
        // const relativeX = e.clientX - rect.left;
        const relativeX = e.nativeEvent.offsetX;
        // const relativeY = e.clientY - rect.top;
        const relativeY = e.nativeEvent.offsetY;


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
                <Selector left={left} top={top} boxSize={boxSize}/>
                <Target left={getActualCoordinates()[0]} top={getActualCoordinates()[1]} boxSize={boxSize} />
                <img className={styles.image} src={src} ref={imageRef}></img>
            </div>
            <Footer />
        </div>
    )
}