import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profileId = "guest-seed-kaku";

  await prisma.profile.upsert({
    where: { id: profileId },
    update: {},
    create: { id: profileId, type: "GUEST" },
  });
}

main().finally(() => prisma.$disconnect());
