import NavLinks from "@/app/NavLinks";
import SearchBox from "@/app/SearchBox";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import { tinos } from "@/app/fonts";

export default function Header() {
  return (
    <header>
      <div className={`${tinos.variable} grid grid-cols-3 items-center p-10`}>
        <Bars3Icon className="h-8 w-8 cursor-pointer" />
        <Link href="/" prefetch={false}>
          <h1 className="text-center font-sans text-4xl sm:text-2xl">
            The{" "}
            <span className="decoration-6 underline decoration-orange-400">
              nooobcoder
            </span>{" "}
            News
          </h1>
        </Link>

        <div className="flex items-center justify-end space-x-2">
          {/* Dark mode button and it's logic */}
          <DarkModeButton />
          <button
            className="hidden rounded-full bg-slate-900 px-4 text-white disabled:cursor-not-allowed disabled:bg-diagonal-grey dark:bg-slate-800 sm:py-2 md:inline lg:px-8 lg:py-4"
            disabled
          >
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Nav Links */}
      <NavLinks />

      {/* Search */}
      <SearchBox />
    </header>
  );
}
