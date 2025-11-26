import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const batchSize = 1000; // insert in chunks to avoid memory issues
  const total = 100_000;

  for (let i = 0; i < total; i += batchSize) {
    const data = Array.from({ length: batchSize }, (_, j) => ({
      shortId: BigInt(i + j + 1), // simple ascending IDs, or use random generator
    }));

    await prisma.pool.createMany({
      data,
      skipDuplicates: true,
    });
    console.log(`Inserted batch ${i / batchSize + 1}`);
  }
}

main()
  .then(() => {
    console.log("Seeding finished ✅");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
