import { createContext } from "react";

export interface AuthContextProps {
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
	token: null,
	login: async () => {}
});
