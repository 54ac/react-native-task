import { useContext, useState } from "react";
import {
	ActivityIndicator,
	Button,
	StyleSheet,
	Text,
	TextInput,
	View
} from "react-native";
import { AuthContext } from "../services/auth";

const LoginScreen = () => {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async () => {
		setLoading(true);
		setError(null);
		try {
			await login(email, password); // Funkcja z providera - zachowuje token i triggeruje AnnouncementScreen
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed.");
		} finally {
			setPassword("");
			setLoading(false);
		}
	};

	return (
		<View>
			<TextInput
				style={styles.input}
				placeholder="E-mail"
				keyboardType="email-address"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			{loading ? (
				<ActivityIndicator style={styles.loading} />
			) : (
				<Button
					title="Login"
					onPress={handleLogin}
					disabled={!email || !password}
				/>
			)}
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 4,
		marginBottom: 12,
		padding: 8,
		minWidth: 200
	},
	error: { color: "red", textAlign: "center", marginTop: 12 },
	loading: { marginTop: 12 }
});
