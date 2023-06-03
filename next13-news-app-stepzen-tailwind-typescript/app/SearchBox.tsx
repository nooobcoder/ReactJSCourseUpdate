"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBox() {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return; // Defensive code

    router.push(`/search?query=${input}`);
  };

  return (
    <form
      className="mx-auto flex max-w-6xl items-center justify-between"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setInput(e.target.value)}
        className="mx-2 my-2 h-14 w-full flex-1 rounded-full bg-transparent px-4 text-black placeholder-gray-500 outline-orange-400 dark:text-white"
      />
      <button
        type="submit"
        disabled={!input}
        className="w-24 rounded-full bg-orange-400 px-4 py-2 text-black disabled:bg-gray-400 dark:text-white"
      >
        Search
      </button>
    </form>
  );
}
