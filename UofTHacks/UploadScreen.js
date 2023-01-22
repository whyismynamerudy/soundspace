import React, { useRef } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { StatusBar } from "expo-status-bar";

export default function UploadScreen({ navigation, route }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Upload your sound!</Text>
			<TouchableOpacity style={styles.uploadButton}>
				<Text style={styles.uploadText}>Upload</Text>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 0.08 * width,
		fontWeight: "bold",
		color: "white",
		marginTop: height * 0.1,
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "start",
		backgroundColor: "rgb(37, 53, 90)",
	},
	uploadButton: {
		marginTop: height * 0.4,
		width: width * 0.35,
		height: width * 0.15,
		borderRadius: width * 0.075,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	uploadText: {
		fontSize: 0.05 * width,
		fontWeight: "bold",
		color: "rgb(37, 53, 90)",
	},
});
