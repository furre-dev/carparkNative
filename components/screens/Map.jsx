import React, { useContext, useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  TextInput,
} from "react-native";
import { styled } from "nativewind";
import { withExpoSnack } from "nativewind";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { VehiclesContext } from "../../AppContext/MarkersContext";

import BlueCarIcon from "../../assets/cars/car-icon-blue.png";
import BlackCarIcon from "../../assets/cars/car-icon-black.png";
import RedCarIcon from "../../assets/cars/car-icon-red.png";
import GreenCarIcon from "../../assets/cars/car-icon-green.png";
import WhiteCarIcon from "../../assets/cars/car-icon-white.png";
import DefaultCarIcon from "../../assets/cars/car-icon-default.png";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledMapView = styled(MapView);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);

const getCarIcon = (color) => {
  switch (color) {
    case "blue":
      return BlueCarIcon;
    case "red":
      return RedCarIcon;
    case "green":
      return GreenCarIcon;
    case "white":
      return WhiteCarIcon;
    case "black":
      return BlackCarIcon;
    default:
      return DefaultCarIcon;
  }
};

function Map() {
  const { vehicles, setVehicles } = useContext(VehiclesContext);
  const route = useRoute();
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [liveMarker, setLiveMarker] = useState([]);
  const mapRef = useRef(null);

  if (route.params) {
    console.log("With params");
    const { lat, long } = route.params;
    useEffect(() => {
      mapRef.current.animateToRegion(
        {
          longitude: long,
          latitude: lat,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }, []);
  } else {
    console.log("Without params");
    useEffect(() => {
      let isMounted = true;

      const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Please grant permissions!");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        const myLocation = {
          longitude: currentLocation.coords.longitude,
          latitude: currentLocation.coords.latitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        if (isMounted) {
          setLocation(myLocation);
          const markersArr = [...liveMarker];
          markersArr.push(myLocation);
          setLiveMarker(markersArr);
        }
        mapRef.current.animateToRegion(myLocation, 1000); // Center the map to current location
      };

      getPermissions();

      const locationUpdateSubscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 500, // Update every 1 second
          distanceInterval: 4, // Update every 10 meters
        },
        (location) => {
          const updatedLocation = {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          if (isMounted) {
            setLocation(updatedLocation);
            const markersArr = [...liveMarker];
            markersArr.push(updatedLocation);
            setLiveMarker(markersArr);
          }
        }
      );

      return () => {
        isMounted = false;
        if (locationUpdateSubscription) {
          locationUpdateSubscription.remove();
        }
      };
    }, []);
  }

  useEffect(() => {
    let isMounted = true;

    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permissions!");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const myLocation = {
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      if (isMounted) {
        setLocation(myLocation);
        const markersArr = [...liveMarker];
        markersArr.push(myLocation);
        setLiveMarker(markersArr);
      }
    };

    getPermissions();

    const locationUpdateSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 500, // Update every 1 second
        distanceInterval: 4, // Update every 10 meters
      },
      (location) => {
        const updatedLocation = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        if (isMounted) {
          setLocation(updatedLocation);
          const markersArr = [...liveMarker];
          markersArr.push(updatedLocation);
          setLiveMarker(markersArr);
        }
      }
    );

    return () => {
      isMounted = false;
      if (locationUpdateSubscription) {
        locationUpdateSubscription.remove();
      }
    };
  }, []);

  function goToLocation(location) {
    mapRef.current.animateToRegion(location, 1000);
  }

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const openIOSMaps = (latitude, longitude) => {
    const url = `http://maps.apple.com/?saddr=Current%20Location&daddr=${latitude},${longitude}`;
    Linking.openURL(url);
  };
  return (
    <StyledView className="w-screen h-screen bg-black">
      <StyledTouchable
        onPress={() => goToLocation(location)}
        className="absolute flex justify-center items-center rounded-full bg-emerald-500 w-12 aspect-square bottom-32 right-6 z-10"
      >
        <StyledImage
          className="h-10 aspect-square"
          source={require("../../assets/icons8-location_off.png")}
        />
      </StyledTouchable>
      <StyledTouchable
        onPress={() => {
          const hasCoordinates = vehicles.some(
            (obj) =>
              obj.lat === location.latitude && obj.long === location.longitude
          );

          if (hasCoordinates) {
            console.error("Location already exists!");
            return;
          } else {
            navigation.navigate("NewVehicle", {
              lat: location.latitude,
              long: location.longitude,
            });
          }
        }}
        className="absolute flex justify-center items-center rounded-full bg-emerald-500 w-12 aspect-square bottom-48 right-6 z-10"
      >
        <StyledImage
          className="h-10 aspect-square"
          source={require("../../assets/icons8-add.png")}
        />
      </StyledTouchable>
      <StyledMapView showsUserLocation={true} ref={mapRef} style={styles.map}>
        {vehicles &&
          vehicles.map((item, index) => {
            return (
              <Marker
                onPress={() => openIOSMaps(item.lat, item.long)}
                key={index}
                coordinate={{
                  latitude: item.lat,
                  longitude: item.long,
                }}
              >
                <StyledImage
                  className="h-14 aspect-square -z-10"
                  source={getCarIcon(item.color)}
                />
              </Marker>
            );
          })}
      </StyledMapView>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default withExpoSnack(Map);
