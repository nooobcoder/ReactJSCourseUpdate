import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/db/mongo";

// Authentication options
const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: String(process.env.GOOGLE_CLIENT_ID),
			clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
		}),
	],
	adapter: MongoDBAdapter(clientPromise),
	callbacks: {
		// async signIn(user, account, profile) { return true },
		// async redirect(url, baseUrl) { return baseUrl },
		// async session(session, user) { return session },
		// async jwt(token, user, account, profile, isNewUser) { return token }
	},
	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {
		signIn: ({ user, account, profile, isNewUser }) => {
			// console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
		},
		// updateUser({ user })
	},
	// debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
