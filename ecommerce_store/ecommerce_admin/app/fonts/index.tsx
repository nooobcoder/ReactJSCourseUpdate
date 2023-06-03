import localFont from "next/font/local";

const DankMonoFont = localFont({
	src: "./DankMono/Dank Mono Regular.otf",
	variable: "--font-dank-mono-regular",
	display: "swap",
	preload: true,
});

export { DankMonoFont };
