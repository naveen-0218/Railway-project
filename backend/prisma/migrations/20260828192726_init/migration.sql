-- CreateTable
CREATE TABLE "Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "platform" TEXT,
    "floor" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "wheelchairAccessible" BOOLEAN NOT NULL DEFAULT false,
    "liftAvailable" BOOLEAN NOT NULL DEFAULT false,
    "rampAvailable" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Facility_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_code_key" ON "Station"("code");
