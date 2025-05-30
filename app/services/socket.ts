import { Socket } from "phoenix";
import { AnnouncementPayload } from "../types/announcement";

const SOCKET_URL = "wss://rn.ltrlabsdev.pl/socket";
const CHANNEL_NAME = "games:lobby";

export const connectSocket = (
	token: string,
	handleAnnouncement: (payload: AnnouncementPayload) => void
) => {
	const socket = new Socket(SOCKET_URL, { params: { token } });
	socket.connect();

	const channel = socket.channel(CHANNEL_NAME);
	channel
		.join()
		.receive("ok", () => console.log("Joined", CHANNEL_NAME))
		.receive("error", (e) => console.error("Join error:", e));

	channel.on("announcement", (payload: AnnouncementPayload) => {
		console.log("Received announcement:", payload);
		handleAnnouncement(payload);
	});

	return () => {
		if (channel) channel.leave();
		if (socket) socket.disconnect();
	};
};
