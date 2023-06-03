import Link from "next/link";

interface Props {
  category: string;
  isActive: boolean;
}

export default function NavLink({ category, isActive }: Props) {
  return (
    <Link
      href={`/news/${category}`}
      className={`navLink ${
        isActive &&
        "text-lg font-bold underline decoration-orange-400 underline-offset-4"
      }`}
    >
      {category[0].toUpperCase() + category.slice(1)}
    </Link>
  );
}
