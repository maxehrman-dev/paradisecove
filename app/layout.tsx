import type { Metadata, Viewport } from "next";
import { Grandstander, Montserrat, Archivo, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const grandstander = Grandstander({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-grandstander", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "800"], variable: "--font-montserrat", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const caslon = Libre_Caslon_Text({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-caslon", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Paradise Cove Surf Club", template: "%s · Paradise Cove Surf Club" },
  description: "Paradise Cove Surf Club. Sun · Salt · Surf. Born in Paradise Cove, sold in La Jolla. First drop coming soon at ATLAS, Westfield UTC.",
  openGraph: { title: "Paradise Cove Surf Club", description: "Sun · Salt · Surf. First drop coming soon at ATLAS, Westfield UTC.", images: ["/assets/logos/wave-navy.png"] },
};
export const viewport: Viewport = { themeColor: "#FBFAF6", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grandstander.variable} ${montserrat.variable} ${archivo.variable} ${caslon.variable}`}>
      <body>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
