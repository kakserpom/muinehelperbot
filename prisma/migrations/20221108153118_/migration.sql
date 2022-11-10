-- CreateTable
CREATE TABLE "qa" (
    "id" SERIAL NOT NULL,
    "keywords" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "links" TEXT NOT NULL,

    CONSTRAINT "qa_pkey" PRIMARY KEY ("id")
);
