import React, { useState } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { styled } from "nativewind";
import { withExpoSnack } from "nativewind";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledImage = styled(Image);

function Home() {
  const navigation = useNavigation();

  return (
    <StyledView className="items-center h-full bg-red-500 py-24">
      <StyledText className="mb-7 text-4xl text-white">
        Parked Vehicles
      </StyledText>
      <StyledView className="w-full items-center space-y-5">
        <StyledView className="relative w-4/5 h-24 bg-gray-200 rounded-2xl items-center justify-between px-7 flex-row">
          <StyledView className="absolute -top-4 right-0 bg-gray-200 px-6 py-1 rounded-t-xl">
            <StyledText className="text-lg text-center font-semibold text-slate-500">
              Furkan BMW
            </StyledText>
          </StyledView>
          <StyledImage
            className="h-16 w-16"
            source={require("../../assets/icons8-sedan.png")}
          />
          <StyledText className="text-3xl font-bold">HCA 531</StyledText>
        </StyledView>
        <StyledTouchable
          onPress={() => navigation.navigate("Map")}
          className="w-4/5 h-24 bg-gray-200 rounded-2xl items-center justify-center px-4 flex-row"
        >
          <StyledText className="text-3xl font-bold text-emerald-500">
            Add vehicle!
          </StyledText>
        </StyledTouchable>
      </StyledView>
    </StyledView>
  );
}

export default withExpoSnack(Home);
