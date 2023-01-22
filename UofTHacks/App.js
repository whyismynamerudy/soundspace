import { StatusBar } from "expo-status-bar";
import { Logs } from "expo";
import { Audio } from "expo-av";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UploadScreen from "./UploadScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import RecordScreen from "./RecordScreen";
import MapScreen from "./MapScreen";

import * as React from "react";

Logs.enableExpoCliLogging();

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Record" component={RecordScreen} />
				<Stack.Screen name="Upload" component={UploadScreen} />
				<Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="Map" component={MapScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
