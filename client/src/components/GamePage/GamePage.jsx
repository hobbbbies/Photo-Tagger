import src from '../../assets/wg0Npy8.jpeg';
import styles from './GamePage.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Selector from '../Selector/Selector';
import { useState } from 'react';

export default function GamePage() {
    const [left, setLeft] = useState(null);
    const [top, setTop] = useState(null);

    const handleClick = (e) => {
        console.log(`X: ${e.clientX}, Y: ${e.clientY}`);
        setLeft(e.clientX);
        setTop(e.clientY);
    }

    return( 
        <div className={styles.gamePage}>
            <Header />
            <Selector left={left} top={top}/>
            <div onMouseDown={handleClick}>
                <img className={styles.image} src={src}></img>
            </div>
            <Footer />
        </div>
    )
}