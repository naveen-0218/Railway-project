const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

    // Create stations
    const chennaiCentral = await prisma.station.upsert({
        where: { code: "MAS" },
        update: {},
        create: {
            name: "Chennai Central",
            code: "MAS",
            city: "Chennai",
            latitude: 13.0827,
            longitude: 80.2707
        }
    });

    const chennaiEgmore = await prisma.station.upsert({
        where: { code: "MS" },
        update: {},
        create: {
            name: "Chennai Egmore",
            code: "MS",
            city: "Chennai",
            latitude: 13.0782,
            longitude: 80.2609
        }
    });

    const cuddalore = await prisma.station.upsert({
        where: { code: "CUPJ" },
        update: {},
        create: {
            name: "Cuddalore Port",
            code: "CUPJ",
            city: "Cuddalore",
            latitude: 11.7480,
            longitude: 79.7714
        }
    });

    const villupuram = await prisma.station.upsert({
        where: { code: "VM" },
        update: {},
        create: {
            name: "Villupuram Junction",
            code: "VM",
            city: "Villupuram",
            latitude: 11.9401,
            longitude: 79.4861
        }
    });

    // Add facilities
    await prisma.facility.createMany({
        data: [
            {
                stationId: chennaiCentral.id,
                name: "Main Entrance Lift",
                type: "Lift",
                platform: "1",
                floor: "Ground",
                latitude: 13.0828,
                longitude: 80.2708,
                wheelchairAccessible: true,
                liftAvailable: true,
                rampAvailable: false
            },
            {
                stationId: chennaiCentral.id,
                name: "Platform 1 Ramp",
                type: "Ramp",
                platform: "1",
                floor: "Ground",
                latitude: 13.0829,
                longitude: 80.2709,
                wheelchairAccessible: true,
                liftAvailable: false,
                rampAvailable: true
            },
            {
                stationId: chennaiCentral.id,
                name: "Accessible Toilet",
                type: "Toilet",
                platform: "1",
                floor: "Ground",
                latitude: 13.0830,
                longitude: 80.2710,
                wheelchairAccessible: true,
                liftAvailable: false,
                rampAvailable: false
            },
            {
                stationId: chennaiCentral.id,
                name: "Ticket Counter",
                type: "Ticket Counter",
                platform: null,
                floor: "Ground",
                latitude: 13.0826,
                longitude: 80.2706,
                wheelchairAccessible: true,
                liftAvailable: false,
                rampAvailable: true
            },

            {
                stationId: chennaiEgmore.id,
                name: "Platform 2 Lift",
                type: "Lift",
                platform: "2",
                floor: "Ground",
                latitude: 13.0783,
                longitude: 80.2610,
                wheelchairAccessible: true,
                liftAvailable: true,
                rampAvailable: false
            },
            {
                stationId: chennaiEgmore.id,
                name: "Waiting Hall",
                type: "Waiting Hall",
                platform: null,
                floor: "Ground",
                latitude: 13.0781,
                longitude: 80.2608,
                wheelchairAccessible: true,
                liftAvailable: false,
                rampAvailable: true
            },

            {
                stationId: cuddalore.id,
                name: "Main Ticket Counter",
                type: "Ticket Counter",
                platform: null,
                floor: "Ground",
                latitude: 11.7481,
                longitude: 79.7715,
                wheelchairAccessible: true,
                liftAvailable: false,
                rampAvailable: true
            },
            {
                stationId: cuddalore.id,
                name: "Waiting Hall",
                type: "Waiting Hall",
                platform: null,
                floor: "Ground",
                latitude: 11.7482,
                longitude: 79.7716,
                wheelchairAccessible: true,
                liftAvailable: false,
                rampAvailable: true
            },

            {
                stationId: villupuram.id,
                name: "Platform 1 Lift",
                type: "Lift",
                platform: "1",
                floor: "Ground",
                latitude: 11.9402,
                longitude: 79.4862,
                wheelchairAccessible: true,
                liftAvailable: true,
                rampAvailable: false
            },
            {
                stationId: villupuram.id,
                name: "Platform 1 Ramp",
                type: "Ramp",
                platform: "1",
                floor: "Ground",
                latitude: 11.9403,
                longitude: 79.4863,
                wheelchairAccessible: true,
                liftAvailable: false,
                rampAvailable: true
            }
        ]
    });

    console.log("Stations and facilities added successfully!");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });