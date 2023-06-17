import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { styled } from "nativewind";
import { withExpoSnack } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledMapView = styled(MapView);
const StyledImage = styled(Image);

function Map() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [liveMarker, setLiveMarker] = useState([]);
  const [vehicleMarkersArr, setVehicleMarkersArr] = useState([]);
  const mapRef = useRef(null);

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
        timeInterval: 1000, // Update every 1 second
        distanceInterval: 10, // Update every 10 meters
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
          const hasCoordinates = vehicleMarkersArr.some(
            (obj) =>
              obj.latitude === location.latitude &&
              obj.longitude === location.longitude &&
              obj.notLive === true
          );

          if (hasCoordinates) {
            console.log("Location already exists!");
            return;
          }

          const markersArr = [...vehicleMarkersArr];
          const newMarkerLocation = {
            longitude: location.longitude,
            latitude: location.latitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            notLive: true,
          };
          markersArr.push(newMarkerLocation);
          setVehicleMarkersArr(markersArr);
          console.log(vehicleMarkersArr);
        }}
        className="absolute flex justify-center items-center rounded-full bg-emerald-500 w-12 aspect-square bottom-48 right-6 z-10"
      >
        <StyledImage
          className="h-10 aspect-square"
          source={require("../../assets/icons8-add.png")}
        />
      </StyledTouchable>
      <StyledMapView ref={mapRef} style={styles.map}>
        {vehicleMarkersArr.map((item, index) => {
          return (
            <Marker
              onPress={() => openIOSMaps(item.latitude, item.longitude)}
              title={item.latitude + " " + item.longitude}
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            >
              <StyledImage
                className="h-14 aspect-square -z-10"
                source={require("../../assets/icons8-sedan.png")}
              />
            </Marker>
          );
        })}

        {liveMarker.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            >
              <StyledImage
                className="h-6 aspect-square z-10"
                source={require("../../assets/location-icon.png")}
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
