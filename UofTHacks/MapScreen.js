import * as React from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons/faSquareCheck";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function MapScreen({ navigation, route }) {
	const [pin, setPin] = React.useState({
		latitude: 43.664486,
		longitude: -79.399689,
	});
	const [region, setRegion] = React.useState({
		latitude: 43.664486,
		longitude: -79.399689,
		latitudeDelta: 0.009999,
		longitudeDelta: 0.00999,
	});

	return (
		<View style={{ flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance",
				}}
				onPress={(data, details = null) => {
					console.log("hello");
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					});
				}}
				query={{
					key: "AIzaSyDX7hsXMs9FVOxpr1w-buo67i-0VvW1QAw",
					language: "en",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`,
				}}
				styles={{
					container: {
						flex: 0,
						position: "absolute",
						width: "100%",
						zIndex: 1,
					},
					listView: { backgroundColor: "white" },
				}}
			/>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 43.664486,
					longitude: -79.399689,
					latitudeDelta: 0.00922,
					longitudeDelta: 0.00421,
				}}
				provider="google"
			>
				<Marker
					coordinate={{
						latitude: region.latitude,
						longitude: region.longitude,
					}}
				/>
				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates);
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude,
						});
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={100} />
			</MapView>
			<TouchableOpacity
				style={{
					position: "absolute",
					bottom: 30,
					right: 30,
					zIndex: 100,
					width: 60,
					height: 60,
					backgroundColor: "rgb(37, 53, 90)",
					borderRadius: 20,
				}}
				onPress={() => {
					navigation.navigate("Record");
				}}
			>
				<FontAwesomeIcon
					style={{}}
					icon={faSquareCheck}
					size={30}
				></FontAwesomeIcon>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});
