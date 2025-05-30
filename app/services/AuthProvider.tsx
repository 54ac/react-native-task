import { ReactNode, useState } from "react";
import { LoginResponse } from "../types/login";
import { AuthContext } from "./auth";

const LOGIN_URL = "https://rn.ltrlabsdev.pl/api/auth/login";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);

	// Login handling wg dokumentacji API - po wciśnięciu przycisku Login w LoginScreen
	const login = async (email: string, password: string) => {
		const response = await fetch(LOGIN_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		});
		if (!response.ok) throw new Error("Login failed");

		const json = (await response.json()) as LoginResponse;
		if (!json.success) throw new Error("Login failed");

		if (json.data.token.length) console.log("Login successful");
		setToken(json.data.token);
	};

	return (
		<AuthContext.Provider value={{ token, login }}>
			{children}
		</AuthContext.Provider>
	);
};
