import { StatusBar } from "expo-status-bar";
import { Logs } from "expo";
import { Audio } from "expo-av";

Logs.enableExpoCliLogging();
import {
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Text,
	View,
} from "react-native";

import React, { useState } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const recording = false;

export default function App() {
	const [recording, setRecording] = useState(null);
	const [timerText, setTimerText] = useState("Press record to start!");
	const startRecording = async () => {
		console.log("start recording");
		setTimerText("Recording...");
		recording = true;
		try {
			const permission = await Audio.requestPermissionsAsync();
			if (permission.status === "granted") {
				await Audio.setAudioModeAsync({
					allowsRecordingIOS: true,
					playsInSilentModeIOS: true,
				});
				const recording = new Audio.Recording().createAsync(
					Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
				);
				setRecording(recording);
			} else {
				console.log("Please allow permission to record audio!");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const stopRecording = async () => {
		console.log("stop recording");
		setTimerText("Press record to start!");
		recording = false;
		try {
			setRecording(undefined);
			await recording.stopAndUnloadAsync();
		} catch (error) {}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>UofTSoundSpace</Text>
			<Text style={styles.timer}>{timerText}</Text>
			<TouchableOpacity
				style={styles.recordButton}
				onPress={recording ? startRecording : stopRecording}
			>
				<View style={styles.record}></View>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 0.1 * width,
		fontWeight: "bold",
		color: "white",
	},
	timer: {
		marginTop: height * 0.4,
		fontSize: 0.06 * width,
		color: "white",
		fontWeight: "semi-bold",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgb(37, 53, 90)",
	},
	recordButton: {
		marginTop: height * 0.02,
		width: width * 0.3,
		height: width * 0.3,
		borderRadius: width * 0.15,
		backgroundColor: "white",
	},
	record: {
		marginTop: width * 0.075,
		marginLeft: width * 0.075,
		width: width * 0.15,
		height: width * 0.15,
		borderRadius: width * 0.15,
		backgroundColor: "rgb(255, 70, 70)",
	},
});
