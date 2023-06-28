import React, { useContext, useState } from "react";
import { TouchableOpacity, Text, View, Image, Alert } from "react-native";
import { styled } from "nativewind";
import { withExpoSnack } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { VehiclesContext } from "../../AppContext/MarkersContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BlueCarIcon from "../../assets/cars/car-icon-blue.png";
import BlackCarIcon from "../../assets/cars/car-icon-black.png";
import RedCarIcon from "../../assets/cars/car-icon-red.png";
import GreenCarIcon from "../../assets/cars/car-icon-green.png";
import WhiteCarIcon from "../../assets/cars/car-icon-white.png";
import DefaultCarIcon from "../../assets/cars/car-icon-default.png";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledImage = styled(Image);

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

function Home() {
  const navigation = useNavigation();
  const { vehicles, deleteVehicle } = useContext(VehiclesContext);
  console.log(vehicles);

  return (
    <StyledView className="items-center h-full bg-red-500 py-24">
      <StyledText className="mb-7 text-4xl text-white">
        Parked Vehicles
      </StyledText>
      <StyledView className="w-full items-center space-y-5">
        {vehicles.map((vehicle) => {
          return (
            <StyledTouchable
              onLongPress={() => {
                Alert.alert(
                  "Are you sure you want to remove this vehicle?",
                  "Please select an option",
                  [
                    {
                      text: "Yes",
                      onPress: () => deleteVehicle(vehicle.id),
                    },
                    {
                      text: "No",
                    },
                  ]
                );
              }}
              delayLongPress={800}
              onPress={() =>
                navigation.navigate("Map", {
                  lat: vehicle.lat,
                  long: vehicle.long,
                })
              }
              key={vehicle.id}
              className="relative w-4/5 h-24 bg-gray-300 rounded-2xl items-center justify-between px-7 flex-row"
            >
              <StyledView className="absolute -top-4 right-0 bg-gray-300 px-6 py-1 rounded-t-xl">
                <StyledText className="text-lg text-center font-semibold text-slate-500">
                  {vehicle.vName}
                </StyledText>
              </StyledView>
              <StyledImage
                className="h-16 w-16"
                source={getCarIcon(vehicle.color)}
              />
              <StyledText className="text-3xl font-bold">
                {vehicle.regNum}
              </StyledText>
            </StyledTouchable>
          );
        })}
        {vehicles.length < 1 && (
          <StyledTouchable
            onPress={() => navigation.navigate("Map")}
            className="w-4/5 h-24 bg-gray-200 rounded-2xl items-center justify-center px-4 flex-row"
          >
            <StyledText className="text-3xl font-bold text-emerald-500">
              Add vehicle!
            </StyledText>
          </StyledTouchable>
        )}
      </StyledView>
    </StyledView>
  );
}

export default withExpoSnack(Home);
