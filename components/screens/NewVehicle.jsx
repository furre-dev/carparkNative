import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text, View, Image, TextInput } from "react-native";
import { styled } from "nativewind";
import { withExpoSnack } from "nativewind";
import { useNavigation, useRoute } from "@react-navigation/native";
import { VehiclesContext } from "../../AppContext/MarkersContext";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledInput = styled(TextInput);

export default function NewVehicle() {
  const route = useRoute();
  const { lat, long } = route.params;

  const navigation = useNavigation();

  const { handleAddVehicle } = useContext(VehiclesContext);
  const [vName, setVName] = useState("");
  const [regNum, setRegNum] = useState("");
  const [color, setColor] = useState("default");

  const handleRegNum = (regNum) => {
    setRegNum(regNum.toUpperCase());
  };

  return (
    <StyledView className="h-screen w-screen flex justify-center items-center bg-emerald-600 space-y-5">
      <StyledView>
        <StyledText className="text-xl mb-1 text-white text-center">
          Vehicle Name
        </StyledText>
        <StyledInput
          maxLength={15}
          onChangeText={setVName}
          value={vName}
          className="border-white mx-auto bg-slate-400 border-2 w-44 h-8 rounded-lg px-3"
        />
      </StyledView>
      <StyledView>
        <StyledText className="text-xl mb-1 text-white text-center">
          License plate
        </StyledText>
        <StyledInput
          maxLength={6}
          onChangeText={handleRegNum}
          value={regNum}
          className="border-white mx-auto bg-slate-400 border-2 w-44 h-8 rounded-lg px-3"
        />
      </StyledView>
      <StyledView className="mb-10">
        <StyledText className="text-xl mb-1 text-white text-center">
          Pick a color
        </StyledText>
        <StyledView className="max-w-max w-72 bg-gray-600 rounded-md p-2 flex-row justify-center space-x-4">
          <StyledTouchable
            onPress={() => setColor("blue")}
            className="h-10 aspect-square bg-sky-600 rounded-md"
          />
          <StyledTouchable
            onPress={() => setColor("red")}
            className="h-10 aspect-square bg-red-500 rounded-md"
          />
          <StyledTouchable
            onPress={() => setColor("green")}
            className="h-10 aspect-square bg-emerald-500 rounded-md"
          />
          <StyledTouchable
            onPress={() => setColor("black")}
            className="h-10 aspect-square bg-black rounded-md"
          />
          <StyledTouchable
            onPress={() => setColor("white")}
            className="h-10 aspect-square bg-white rounded-md"
          />
        </StyledView>
      </StyledView>
      <StyledTouchable
        onPress={() => {
          if (vName.length < 3 && regNum.length < 3) {
            console.error(
              "Please enter minimun 3 characters on name and plate"
            );
            return null;
          }
          navigation.goBack();
          handleAddVehicle(vName, regNum, lat, long, color);
        }}
        className="w-44 py-1 bg-white flex items-center rounded-md"
      >
        <StyledText className="text-2xl text-emerald-600">
          Add vehicle!
        </StyledText>
      </StyledTouchable>
    </StyledView>
  );
}
