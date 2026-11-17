/** Flip NEXT_PUBLIC_LAUNCHED to "true" on launch day. False = coming-soon home. */
export const LAUNCHED = process.env.NEXT_PUBLIC_LAUNCHED === "true";

export const SITE = {
  name: "Paradise Cove Surf Club",
  where: "Find it at ATLAS · Westfield UTC",
  store: "ATLAS at Westfield UTC",
  city: "La Jolla, California",
  address: "Coast Blvd · La Jolla, CA 92037",
  coords: "32°N · 117°W",
  instagram: { handle: "@paradisecovesurf", url: "https://www.instagram.com/paradisecovesurf/" },
  houseRules: ["Surf early", "Nap often", "Leave no towel", "Stay for sunset", "Bring a friend"],
};
