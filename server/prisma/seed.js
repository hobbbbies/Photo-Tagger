const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  await prisma.character.deleteMany({});
  await prisma.character.createMany({
    data: [
      { name: 'Waldo', coordsX: 92, coordsY: 56.2, boxSize: 3 },
      { name: 'Caveman', coordsX: 31.44, coordsY: 17.534, boxSize: 3 },
      { name: 'BurgerMan', coordsX: 68.886, coordsY: 73.09, boxSize: 3 },
      { name: 'ScaredMan', coordsX: 56.77, coordsY: 75.52, boxSize: 3 },
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });