// import logo from "../../assets/wildex-high-resolution-logo.png";
import styles from "./Header.module.css";
import ScrollingText from "../ScrollingText/ScrollingText";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Timer from "./Timer/Timer";

export default function Header({ tries, elapsedTime, setElapsedTime, hasWon }) {
    const navigate = useNavigate();

    return (
        <>
        <header className={styles.header}>   
            <div className={styles.leftSide}>
                {/* <img alt="Logo" src={logo}/> */}
                <h2 className={styles.title}>📸Tagger</h2>
            </div>
            <div className={styles.rightSide}>
                <Link to='/'>Home</Link>
                <Link to='/products'>Play</Link>
            </div>
        </header>
        <div className={styles.headerFooter}><Timer elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} hasWon={hasWon}/> Attempts: {tries}/10</div>
        {/* <Outlet context={{ cartItems: cartItems, setCartItems: setCartItems }}/> */}
        </>
    )

}