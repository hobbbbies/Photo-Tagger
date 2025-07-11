const { check } = require('express-validator');
const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient()

const checkCollision = async (req, res) => {
    const { boxRangeX, boxRangeY, charId } = req.body;
    const character = await prisma.character.findUnique({
        where: {id: charId}
    });
    
    const desiredRangeX = [
        character.coordsX - character.boxSize / 2,
        character.coordsX + character.boxSize / 2
    ];
    const desiredRangeY = [
        character.coordsY - character.boxSize,
        character.coordsY + character.boxSize
    ];

    console.log(`Selector Min X: ${boxRangeX[0]}, Selector Max X: ${boxRangeX[1]}`);
    console.log(`Selector Min Y: ${boxRangeY[0]}, Selector Max Y: ${boxRangeY[1]}`);
    console.log(`Desired Min X: ${desiredRangeX[0]}, Desired Max X: ${desiredRangeX[1]}`);
    console.log(`Desired Min Y: ${desiredRangeY[0]}, Desired Max Y: ${desiredRangeX[1]}`);
    
    const isWithinX = (boxRangeX[1] >= desiredRangeX[0]) && (boxRangeX[0] <= desiredRangeX[1]);
    const isWithinY = (boxRangeY[1] >= desiredRangeY[0]) && (boxRangeY[0] <= desiredRangeY[1]);
    const isWithinBox = isWithinX && isWithinY;

    // console.log(`Desired coordinates [${desiredCoordinates[0]}%, ${desiredCoordinates[1]}%] within box: ${isWithinBox}`);

    if (isWithinBox) {
        return res.json({isWithinBox: true});
        // Add your success logic here
    } 
    res.json({isWithinBox: false});
}

module.exports = checkCollision