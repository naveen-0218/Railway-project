const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Railway Navigation Backend is running!"
    });
});

app.get("/api/stations", async (req, res) => {
    try {
        const stations = await prisma.station.findMany({
            include: {
                facilities: true
            }
        });

        res.json(stations);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch stations"
        });
    }
});

app.get("/api/facilities/search", async (req, res) => {
    try {
        const search = req.query.q || "";

        const facilities = await prisma.facility.findMany({
            where: {
                name: {
                    contains: search
                }
            },
            include: {
                station: true
            }
        });

        res.json(facilities);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to search facilities"
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("=================================");
    console.log("Railway Backend Started");
    console.log("http://localhost:5000");
    console.log("=================================");
});
