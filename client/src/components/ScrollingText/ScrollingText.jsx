import scrollingTextStyles from "./scrollingTextStyles.module.css"; 

function ScrollingText({fontSize, text, speed}) {
  const scrollSpeed = {
    "--animation-duration": `${speed}s`
  }

  return (
    <div className={scrollingTextStyles.mainContainer}>
        <section className={scrollingTextStyles.enableAnimation}>
            <div style={scrollSpeed} className={scrollingTextStyles.marquee}>
                <div className={scrollingTextStyles.content}>
                    <p style={{fontSize: fontSize}} className={scrollingTextStyles.item}>
                       {text}
                    </p>
                </div>
                <div aria-hidden="true" className={scrollingTextStyles.content}>
                    <p style={{fontSize: fontSize}} className={scrollingTextStyles.item}>
                        {text}
                    </p>
                </div>
                <div aria-hidden="true" className={scrollingTextStyles.content}>
                    <p style={{fontSize: fontSize}} className={scrollingTextStyles.item}>
                        {text}
                    </p>
                </div>
                <div aria-hidden="true" className={scrollingTextStyles.content}>
                    <p style={{fontSize: fontSize}} className={scrollingTextStyles.item}>
                        {text}
                    </p>
                </div>
            </div>
        </section>
    </div>
  );
}

export default ScrollingText;