"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export interface AuthContextProps {
	children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
	return (
		<ThemeProvider attribute="class">
			<SessionProvider>{children}</SessionProvider>
		</ThemeProvider>
	);
}
