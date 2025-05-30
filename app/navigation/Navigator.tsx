import { useContext } from "react";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../services/auth";

const Navigator = () => {
	const { token } = useContext(AuthContext);

	return token ? <AnnouncementScreen /> : <LoginScreen />;
};

export default Navigator;
