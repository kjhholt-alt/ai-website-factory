import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const firstNames = [
  "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
  "Isabella", "Lucas", "Mia", "Alexander", "Charlotte", "James", "Amelia",
];

const lastNames = [
  "Johnson", "Martinez", "Williams", "Brown", "Jones", "Garcia", "Miller",
  "Davis", "Rodriguez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore",
  "Jackson",
];

const parentFirstNames = [
  "Michael", "Jennifer", "David", "Sarah", "Robert", "Lisa", "William",
  "Maria", "Thomas", "Jessica", "Christopher", "Amanda", "Daniel", "Emily",
  "Matthew",
];

const serviceIds = [
  { id: "summer-elite-u10", name: "Summer Elite Camp - U10", price: 299 },
  { id: "summer-elite-u14", name: "Summer Elite Camp - U14", price: 349 },
  { id: "goalkeeper-intensive", name: "Goalkeeper Intensive", price: 249 },
  { id: "fall-skills-clinic", name: "Fall Skills Clinic", price: 199 },
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAge(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDOB(age: number): string {
  const year = new Date().getFullYear() - age;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.waiverSignature.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.message.deleteMany();

  for (let i = 0; i < 15; i++) {
    const playerFirst = firstNames[i];
    const playerLast = randomFrom(lastNames);
    const parentFirst = parentFirstNames[i];
    const parentLast = playerLast;
    const service = randomFrom(serviceIds);
    const age = randomAge(7, 15);
    const dob = randomDOB(age);

    await prisma.registration.create({
      data: {
        serviceId: service.id,
        serviceName: service.name,
        parentFirstName: parentFirst,
        parentLastName: parentLast,
        parentEmail: `${parentFirst.toLowerCase()}.${parentLast.toLowerCase()}@example.com`,
        parentPhone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        parentAddress: `${Math.floor(Math.random() * 9999) + 1} ${randomFrom(["Oak", "Elm", "Pine", "Maple", "Cedar"])} ${randomFrom(["St", "Ave", "Blvd", "Dr", "Ln"])}`,
        parentCity: "Austin",
        parentState: "TX",
        parentZip: `787${String(Math.floor(Math.random() * 90) + 10)}`,
        playerFirstName: playerFirst,
        playerLastName: playerLast,
        playerDateOfBirth: dob,
        playerAge: age,
        playerGender: randomFrom(["male", "female"]),
        playerSkillLevel: randomFrom(["beginner", "intermediate", "advanced"]),
        medicalConditions: randomFrom(["", "", "", "Asthma", "Type 1 Diabetes"]),
        allergies: randomFrom(["", "", "", "Bee stings", "Peanuts"]),
        medications: randomFrom(["", "", "", "Inhaler", "EpiPen"]),
        emergencyContactName: `${randomFrom(parentFirstNames)} ${parentLast}`,
        emergencyContactPhone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        emergencyRelationship: randomFrom(["grandparent", "aunt-uncle", "family-friend", "neighbor"]),
        status: "confirmed",
        paymentStatus: randomFrom(["pending", "paid", "paid", "paid"]),
        totalAmount: service.price,
        waiver: {
          create: {
            signedName: `${parentFirst} ${parentLast}`,
            agreedToTerms: true,
            ipAddress: "127.0.0.1",
          },
        },
      },
    });

    console.log(`  Created registration ${i + 1}/15: ${playerFirst} ${playerLast} -> ${service.name}`);
  }

  // Create a sample message
  await prisma.message.create({
    data: {
      subject: "Welcome to Summer Camp 2025!",
      body: "We are excited to welcome all registered players to our upcoming summer camp sessions. Please make sure to bring water, sunscreen, and shin guards. See you on the field!",
      sentTo: "all registered families",
      sentBy: "admin",
      status: "sent",
    },
  });

  console.log("\nSeeding complete! Created 15 registrations and 1 sample message.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
