import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Playfair_Display, Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

// fonte de títulos: pesada e com personalidade, no estilo "cinematográfico" da referência
const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], weight: ["500", "700", "800"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
// texto do modelo Médico: sem serifa limpa, com cara de clínica
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codexa Tecnologia — Crie seu site da forma que desejar",
  description:
    "Somos uma empresa especializada em soluções web: sites, lojas virtuais, landing pages e sistemas sob medida. Veja modelos para barbearia, transportadora, joalheria, clínica, restaurante e médicos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${space.variable} ${jetbrains.variable} ${playfair.variable} ${display.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
