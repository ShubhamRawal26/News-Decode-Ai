// NewsDecodedAI — client session helper
const GUEST_KEY = "nda_guest_uid";

export function getOrCreateCurrentUser(): {
  id: string;
  name: string | null;
  email: string;
  isGuest: boolean;
} {
  let uid = typeof window !== "undefined" ? localStorage.getItem(GUEST_KEY) : null;

  if (!uid) {
    uid = `guest_${Math.random().toString(36).slice(2, 11)}`;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(GUEST_KEY, uid);
      } catch {}
    }
  }

  return {
    id: uid,
    name: "Guest",
    email: `${uid}@newsdecoded.ai`,
    isGuest: true,
  };
}

export function getCurrentUserId(): string {
  const u = getOrCreateCurrentUser();
  return u.id;
}
