import Header from "./Header";
import "@/styles/globals.css";
import { tinos, roboto } from "@/app/fonts";
import Providers from "@/app/Providers";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${roboto.className} ${tinos.className} mb-12 bg-gray-100 transition-all duration-300 selection:bg-orange-400 selection:text-orange-800 dark:bg-zinc-900 dark:text-white`}
        >
          <Header />
          <div className="pattern-wavy mx-auto max-w-6xl rounded-lg bg-repeat-round pattern-bg-white pattern-orange-300 pattern-opacity-100 pattern-size-32">
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
