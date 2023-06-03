import { Tinos, Roboto } from "@next/font/google"

const tinos = Tinos({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
  variable: "--font-tinos",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
  variable: "--font-roboto",
});

export { tinos, roboto }
