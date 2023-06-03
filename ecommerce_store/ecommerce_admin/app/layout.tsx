import { DankMonoFont } from "@/app/fonts";
import Navbar from "./components/Navbar";
import Provider from "./components/Provider";
import "./globals.css";

export const metadata = {
	title: "Create Next App",
	description: "Next Ecommerce - Admin Panel",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${DankMonoFont.className} flex flex-row`}
				suppressHydrationWarning={true}
			>
				<Provider>
					<div className="flex flex-col w-screen min-h-screen space-x-4 bg-blue-400 sm:flex-row dark:bg-blue-900">
						<Navbar />
						{children}
					</div>
				</Provider>
			</body>
		</html>
	);
}
