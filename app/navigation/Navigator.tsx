import { useContext } from "react";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../services/auth";

// Jeśli nie ma tokenu w providerze, wyświetla LoginScreen
const Navigator = () => {
	const { token } = useContext(AuthContext);

	return token ? <AnnouncementScreen /> : <LoginScreen />;
};

export default Navigator;
