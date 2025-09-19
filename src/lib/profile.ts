// lib/profile.ts
import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getOrCreateGuestProfile() {
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;

  console.debug("guestId from cookie:", guestId);

  if (!guestId) {
    throw new Error("guestId not found - middleware should have set it");
  }

  // 以 guestId 當作 Profile.id
  const profile = await prisma.profile.upsert({
    where: { id: guestId },
    update: {},
    create: { id: guestId, type: "GUEST" },
  });

  return profile;
}
