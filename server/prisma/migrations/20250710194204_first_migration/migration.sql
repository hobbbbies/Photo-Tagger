-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordsX" DOUBLE PRECISION NOT NULL,
    "coordsY" DOUBLE PRECISION NOT NULL,
    "boxSize" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
