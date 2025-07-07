import ScrollingText from "../ScrollingText/ScrollingText"
import styles from "./Footer.module.css";

export default function Footer() {

    return (
        <footer>
            <ScrollingText 
                fontSize="1em" 
                text="Clocks Ticking! Where's Waldo???"
                speed="15"
            />
            <div style={{justifySelf: 'center'}}>Vitanov ©</div>
        </footer>
    )
}