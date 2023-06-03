"use client";
import { SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

const ThemeToggleButton = () => {
	const { systemTheme, theme, setTheme } = useTheme();
	const currentTheme = theme === "system" ? systemTheme : theme;

	return (
		<SunIcon
			onClick={() =>
				currentTheme == "dark" ? setTheme("light") : setTheme("dark")
			}
			className="h-10 p-2 transition-all duration-100 bg-orange-300 rounded-full dark:text-white dark:bg-orange-600 hover:bg-gray-600 dark:hover:bg-gray-300 bottom-32 dark:hover:text-black hover:text-white"
		>
			{/* Text with hover tip */}
			Toggle Mode
		</SunIcon>
	);
};

export default ThemeToggleButton;
