import { useState, useEffect, useRef } from "react"
import styles from './Timer.module.css';
import formatTime from "../../../helpers/formatTime";

export default function Timer({elapsedTime, setElapsedTime, hasWon}) {
    const [isRunning, setIsRunning] = useState(false);
    // const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
       start(); 
    }, [])

    useEffect(() => {
        if (hasWon) stop();
    }, [hasWon])

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => setElapsedTime(Date.now() - startTimeRef.current), 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning, setElapsedTime]);

    const start = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    const stop = () => {
        setIsRunning(false);
    }

    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    }

    // const formatTime = () => {
    //     let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    //     let seconds = Math.floor(elapsedTime / (1000) % 60);
    //     let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    //     minutes = String(minutes).padStart(2, '0');
    //     seconds = String(seconds).padStart(2, '0');
    //     milliseconds = String(milliseconds).padStart(2, '0');


    //     return `${minutes}:${seconds}:${milliseconds}`;
    // }

    return (
        <div className={styles.stopWatch}> 
            <div className={styles.display}>{formatTime(elapsedTime)}</div>
        </div>
    )
}