import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../services/auth";
import { connectSocket } from "../services/socket";
import { AnnouncementPayload } from "../types/announcement";

const AnnouncementScreen = () => {
	const { token } = useContext(AuthContext);
	const [announcement, setAnnouncement] = useState<AnnouncementPayload | null>(
		null
	);

	useEffect(() => {
		if (token) {
			const disconnectSocket = connectSocket(token, setAnnouncement); // Funkcja zwraca cleanup
			return () => disconnectSocket();
		}
	}, [token]);

	return (
		<View>
			{announcement ? (
				<>
					<Text style={styles.payload}>{announcement.message}</Text>
					<Text style={styles.payload}>{announcement.numbers.join(", ")}</Text>
				</>
			) : (
				<ActivityIndicator />
			)}
		</View>
	);
};

export default AnnouncementScreen;

const styles = StyleSheet.create({
	payload: { fontSize: 18, textAlign: "center" }
});
