const checkCollision = (req, res) => {
    const { boxRangeX, boxRangeY, desiredRangeX, desiredRangeY } = req.body;
    const [desiredMinX, desiredMaxX] = desiredRangeX;
    const [desiredMinY, desiredMaxY] = desiredRangeY;
    const [minX, maxX] = boxRangeX;
    const [minY, maxY] = boxRangeY;

    console.log(`Selector Min X: ${minX}, Selector Max X: ${maxX}`);
    console.log(`Selector Min Y: ${minY}, Selector Max Y: ${maxY}`);
    console.log(`Desired Min X: ${desiredMinX}, Desired Max X: ${desiredMaxX}`);
    console.log(`Desired Min Y: ${desiredMinY}, Desired Max Y: ${desiredMaxY}`);
    
    const isWithinX = (maxX >= desiredMinX) && (minX <= desiredMaxX);
    const isWithinY = (maxY >= desiredMinY) && (minY <= desiredMaxY);
    const isWithinBox = isWithinX && isWithinY;

    // console.log(`Desired coordinates [${desiredCoordinates[0]}%, ${desiredCoordinates[1]}%] within box: ${isWithinBox}`);

    // if (isWithinBox) {
    //     console.log("Found the target!");
    //     // Add your success logic here
    // }
    return isWithinBox;
    res.json({isWithinBox: true});
}

module.exports = {checkCollision}