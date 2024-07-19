import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRETE || "",
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRETE || "",
		}),
	],
	secret: process.env.SECRET,
	// callbacks: {
	// 	async redirect({ url, baseUrl }: any) {
	// 		console.log("🚀 ~ redirect ~ url, baseUrl:", url, baseUrl);
	// 		// Allows relative callback URLs
	// 		if (url.startsWith("/")) return `${baseUrl}${url}`;
	// 		// Allows callback URLs on the same origin
	// 		else if (new URL(url).origin === baseUrl) return url;
	// 		return baseUrl;
	// 	},
	// },
};

export default NextAuth(authOptions);
