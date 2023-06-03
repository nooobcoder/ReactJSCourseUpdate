"use client";

import {
	ArchiveBoxIcon,
	CogIcon,
	ComputerDesktopIcon,
	ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";
import ThemeToggleButton from "./ThemeToggleButton";
import path from "path";

const Navbar = () => {
	const pathName = usePathname();

	//#region Tailwind Styles
	const linkStyle = `flex gap-1`;
	const asideStyle = `p-3 space-x-5 text-white bg-orange-500 shadow-md rounded-xl dark:text-black dark:bg-orange-300 shadow-purple-500 dark:shadow-purple-900`;
	const disabledAsideStyle = `p-3 space-x-5 text-white bg-gray-500 shadow-md rounded-xl dark:text-black dark:bg-gray-200 shadow-purple-500 dark:shadow-purple-900`;
	//#endregion

	//#region Navbar links
	const navbarLinks = [
		{
			name: "Dashboard",
			href: "/",
			icon: (
				<ComputerDesktopIcon className="h-6 text-gray-200 dark:text-gray-800" />
			),
		},
		{
			name: "Products",
			href: "/products",
			icon: <ArchiveBoxIcon className="h-6 text-gray-200 dark:text-gray-800" />,
		},
		{
			name: "Orders",
			href: "/orders",
			icon: (
				<ShoppingBagIcon className="h-6 text-gray-200 dark:text-gray-800" />
			),
		},
		{
			name: "Settings",
			href: "/settings",
			icon: <CogIcon className="h-6 text-gray-200 dark:text-gray-800" />,
		},
	];
	//#endregion

	return (
		<header className="sticky top-0 z-30 flex flex-row items-center justify-between py-6 align-middle bg-white shadow sm:flex-col rounded-r-xl sm:px-4">
			<div className="space-y-4">
				{navbarLinks.map((link) => (
					<aside
						className={
							// Ternary expression to check with equality for "/" otherwise check for inclusion (nested urls)
							link.href === "/"
								? pathName === link.href
									? asideStyle
									: disabledAsideStyle
								: pathName.includes(link.href)
								? asideStyle
								: disabledAsideStyle
						}
						key={link.name}
					>
						<Link href={link.href} className={linkStyle}>
							{link.icon}
							{/* Vertical divider line */}
							<div className="w-px h-6 mx-2 bg-white dark:bg-black" />
							<span className="">{link.name}</span>
						</Link>
					</aside>
				))}
			</div>

			{/* Bottom section */}
			<div className="flex space-x-3 text-sm">
				<AuthButton />
				<ThemeToggleButton />
			</div>
		</header>
	);
};

export default Navbar;
