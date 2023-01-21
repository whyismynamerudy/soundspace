import { StatusBar } from "expo-status-bar";
import { Logs } from "expo";
import { Audio } from "expo-av";

import {
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Text,
	View,
} from "react-native";

import React, { useState } from "react";

Logs.enableExpoCliLogging();

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

let recordingOngoing = false;

export default function App() {
	const [recording, setRecording] = useState(null);
	const [timerText, setTimerText] = useState("Press record to start!");

	async function startRecording() {
		recordingOngoing = true;
		setTimerText("Recording...");
		try {
			console.log("Requesting permissions..");
			await Audio.requestPermissionsAsync();
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});

			console.log("Starting recording..");
			const { recording } = await Audio.Recording.createAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY
			);
			setRecording(recording);
			console.log("Recording started");
		} catch (err) {
			console.error("Failed to start recording", err);
		}
	}

	async function stopRecording() {
		recordingOngoing = false;
		setTimerText("Press record to start!");
		console.log("Stopping recording..");
		setRecording(undefined);
		await recording.stopAndUnloadAsync();
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
		});
		const uri = recording.getURI();
		getAverageAmplitudefromAudio();
	}

	const getAverageAmplitudefromAudio = async () => {};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>UofTSoundSpace</Text>
			<Text style={styles.timer}>{timerText}</Text>
			<TouchableOpacity
				style={styles.recordButton}
				onPress={recordingOngoing ? stopRecording : startRecording}
			>
				<View
					style={recordingOngoing ? styles.stop : styles.record}
				></View>
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
	stop: {
		marginTop: width * 0.1,
		marginLeft: width * 0.1,
		width: width * 0.1,
		height: width * 0.1,
		borderRadius: 0,
		backgroundColor: "rgb(255, 70, 70)",
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
