import { store } from "@/redux/store";

export const navLinks = [
	{ url: "/", name: "Home" },
	{ url: "/courses", name: "Courses" },
	{ url: "/about", name: "About" },
	{ url: "/policy", name: "Policy" },
	{ url: "/faq", name: "FAQ" },
];

export type RootState = ReturnType<typeof store.getState>;
