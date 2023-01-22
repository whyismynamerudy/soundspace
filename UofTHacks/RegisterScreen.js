import React, { useRef } from "react";
import {
	Dimensions,
	Text,
	TouchableOpacity,
	TextInput,
	View,
} from "react-native";
import { StyleSheet } from "react-native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { StatusBar } from "expo-status-bar";

export default function LoginScreen({ navigation, route }) {
	const [email, onChangeEmail] = React.useState("");
	const [pass, onChangePass] = React.useState("");
	const [pass2, onChangePass2] = React.useState("");

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Register</Text>
			<View>
				<Text style={styles.inputField}>Username</Text>
				<TextInput
					onChangeText={onChangeEmail}
					value={email}
					style={styles.input}
					keyboardType="email-address"
					placeholder="Email"
					placeholderTextColor={"grey"}
					autoCapitalize="none"
				/>
				<Text style={styles.inputField}>Password</Text>
				<TextInput
					onChangeText={onChangePass}
					value={pass}
					style={styles.input}
					secureTextEntry={true}
					keyboardType="default"
					placeholder="Password"
					placeholderTextColor={"grey"}
				/>
				<Text style={styles.inputField}>Repeat Password</Text>
				<TextInput
					onChangeText={onChangePass2}
					value={pass2}
					style={styles.input}
					secureTextEntry={true}
					keyboardType="default"
					placeholder="Password"
					placeholderTextColor={"grey"}
				/>
			</View>
			<TouchableOpacity
				style={styles.loginButton}
				onPress={() => {
					if (pass != pass2) {
						alert("Passwords do not match");
					} else {
						navigation.navigate("Record");
						alert("Account created");
					}
				}}
			>
				<Text style={styles.loginText}>Register</Text>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	noAcc: {
		fontSize: 0.05 * width,
		color: "white",
		marginTop: height * 0.1,
	},
	loginButton: {
		marginTop: height * 0.02,
		width: width * 0.35,
		height: width * 0.15,
		borderRadius: width * 0.075,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	loginText: {
		fontSize: 0.05 * width,
		fontWeight: "bold",
		color: "black",
	},
	input: {
		fontSize: 0.05 * width,
		color: "black",
		backgroundColor: "white",
		width: width * 0.8,
		padding: 10,
		borderRadius: 10,
		marginBottom: height * 0.05,
	},
	inputField: {
		fontSize: 0.05 * width,
		fontWeight: "bold",
		color: "white",
		marginTop: height * 0.05,
		marginBottom: height * 0.01,
	},
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
