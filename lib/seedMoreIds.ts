import prisma from "./prisma";

export const seedMoreIds = async () => {
  const batchSize = 1; // insert in chunks to avoid memory issues
  const total = 1;

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
};