import * as React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons/faSquareCheck";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function MapScreen({ navigation, route }) {
  const [pin, setPin] = React.useState({
    latitude: 43.664486,
    longitude: -79.399689,
  });
  const [pin2, setPin2] = React.useState({
    latitude: 43.6598,
    longitude: -79.3973,
  });

  const [currpin, setcurrpin] = React.useState({
    latitude: 43.6606,
    longitude: -79.39686,
  });

  const [pin4, setPin4] = React.useState({
    latitude: 43.6663,
    longitude: -79.3913,
  });

  const [pin3, setPin3] = React.useState({
    latitude: 43.6592,
    longitude: -79.391,
  });

  const [region, setRegion] = React.useState({
    latitude: 43.664486,
    longitude: -77.399689,
    latitudeDelta: 0.009999,
    longitudeDelta: 0.00999,
  });

  function apple() {
    let lat1 = currpin.latitude;
    let lon1 = currpin.longitude;
    let finallat = 0;
    let finalon = 0;
    let curr_max = 0;

    const distances = [pin, pin2, pin3, pin4];
    let i = 0;
    while (i != 4) {
      let lat2 = distances[i].latitude;
      let lon2 = distances[i].longitude;

      let qwz =
        Math.acos(
          Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
        ) * 6371;

      if (qwz > curr_max) {
        curr_max = qwz;
        finallat = lat2;
        finalon = lon2;
      }
      i++;
    }
    console.log(curr_max);
    console.log([finallat, finalon]);
  }

  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      {/* <GooglePlacesAutocomplete
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
		  /> */}
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
        <Marker coordinate={pin} pinColor="blue" draggable={false}>
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Marker coordinate={pin2} pinColor="red" draggable={false}>
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>

        <Marker coordinate={pin3} pinColor="orange" draggable={false}>
          <Callout>
            <Text>Hello</Text>
          </Callout>
        </Marker>

        <Marker coordinate={pin4} pinColor="pink" draggable={false}>
          <Callout>
            <Text>Hello</Text>
          </Callout>
        </Marker>

        <Marker coordinate={currpin} pinColor="pink" draggable={false}>
          <Callout>
            <Text>Hello</Text>
          </Callout>
        </Marker>

        <Circle center={pin} radius={100} />
      </MapView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 50,
          right: 50,
          zIndex: 100,
          width: 100,
          height: 50,
          backgroundColor: "rgb(37, 53, 90)",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          apple();
          navigation.navigate("Record");
        }}
      >
        <Text style={styles.continueText}>Record</Text>
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
