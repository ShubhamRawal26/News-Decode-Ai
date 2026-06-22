// NewsDecodedAI — user session helper
// Uses a guest user per browser (cookie) so personalization
// (saved articles, followed topics, history) works seamlessly.

import { cookies } from "next/headers";
import { db } from "@/lib/db";

const GUEST_COOKIE = "nda_guest_uid";

export async function getOrCreateCurrentUser(): Promise<{
  id: string;
  name: string | null;
  email: string;
  isGuest: boolean;
}> {
  const cookieStore = await cookies();
  let uid = cookieStore.get(GUEST_COOKIE)?.value;

  if (uid) {
    const existing = await db.user.findUnique({ where: { id: uid } });
    if (existing) {
      return {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        isGuest: existing.isGuest,
      };
    }
  }

  // create a new guest user
  const guest = await db.user.create({
    data: {
      email: `guest-${Math.random().toString(36).slice(2, 10)}@newsdecoded.ai`,
      name: "Guest",
      isGuest: true,
      preferences: JSON.stringify({ followedTopics: [], alertCategories: [] }),
    },
  });

  cookieStore.set(GUEST_COOKIE, guest.id, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return {
    id: guest.id,
    name: guest.name,
    email: guest.email,
    isGuest: guest.isGuest,
  };
}

export async function getCurrentUserId(): Promise<string> {
  const u = await getOrCreateCurrentUser();
  return u.id;
}
