import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import { withExpoSnack } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

function Navbar() {
  const navigation = useNavigation();
  return (
    <StyledView className="absolute bottom-10 left-0 w-screen">
      <StyledView className="w-5/6 mx-auto bg-blue-50 flex-row py-5 rounded-xl px-10">
        <StyledText
          onPress={() => navigation.navigate("Home")}
          className="text-xl flex-1"
        >
          Vehicle
        </StyledText>
        <StyledText
          onPress={() => navigation.navigate("Map")}
          className="text-xl flex-1 text-right"
        >
          Map
        </StyledText>
      </StyledView>
    </StyledView>
  );
}

export default withExpoSnack(Navbar);
