import catalog from "@/data/catalog.json";

export type Product = (typeof catalog.products)[number];
export type Club = (typeof catalog.clubs)[number];
export const collections = catalog.collections;
export const products = catalog.products;
export const clubs = catalog.clubs;
export const productById = (id: string | null) => (id ? products.find((p) => p.id === id) : undefined);

export const INK = { rust: "#C2603A" } as const;
export const CARD = { cream: "#F4F0E4", paper: "#FBFAF6" } as const;
