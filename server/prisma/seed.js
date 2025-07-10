const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  await prisma.character.createMany({
    data: [
      { name: 'Waldo', coordsX: 92, coordsY: 56.2, boxSize: 3 },
      { name: 'Alien', coordsX: 85, coordsY: 50, boxSize: 3 },
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