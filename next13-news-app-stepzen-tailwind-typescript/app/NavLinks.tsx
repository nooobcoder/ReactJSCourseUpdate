"use client";

import NavLink from "@/app/NavLink";
import { categories } from "@/constants";
import { Roboto } from "@next/font/google";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathName = usePathname();
  const isActive = (path: string) => pathName?.split("/").pop() === path;

  return (
    <nav
      className={
        "mx-auto grid max-w-6xl grid-cols-4 gap-4 border-b border-gray-300 pb-10 text-xs md:grid-cols-7 md:text-sm"
      }
    >
      {categories.map((category) => (
        <NavLink
          key={category}
          category={category}
          isActive={isActive(category)}
        />
      ))}
    </nav>
  );
}
