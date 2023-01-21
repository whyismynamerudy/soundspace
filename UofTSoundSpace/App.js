import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, Text, View } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>UofTSoundSpace</Text>
			<View style={styles.recordButton}></View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 0.1 * width,
		fontWeight: "bold",
		color: "rgb(37, 53, 90)",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	recordButton: {
		marginTop: height * 0.3,
		width: width * 0.4,
		height: width * 0.4,
		borderRadius: width * 0.2,
		backgroundColor: "rgb(37, 53, 90)",
	},
});
