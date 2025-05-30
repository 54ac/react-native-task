import { View } from "react-native";
import Navigator from "./navigation/Navigator";
import { AuthProvider } from "./services/AuthProvider";

export default function Index() {
	return (
		<AuthProvider>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<Navigator />
			</View>
		</AuthProvider>
	);
}
