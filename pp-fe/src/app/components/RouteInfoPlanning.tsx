import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

const RouteInfoPlanning: React.FC = () => {
  const PlanPathButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity onPress={onPress} className="bg-[#ccfbf1] rounded-lg py-3 mt-4">
        <Text className="text-[#334155] text-center text-lg font-bold">{title}</Text>
      </TouchableOpacity>
    );
  };

  const handleButtonPress = () => {
    console.log("Button pressed!");
  };

  const [start_Text, onChangeStartText] = useState("");
  const [end_Text, onChangeEndText] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-[#2dd4bf] p-4 rounded-xl my-4 mx-3 shadow-md">
          <View className="mb-3">
            <Text className="text-sm font-bold text-[#334155] mb-1">Start</Text>
            <TextInput
              className="bg-white rounded-lg p-2 text-[#334155]"
              placeholder="Starting Address"
              value={start_Text}
              onChangeText={onChangeStartText}
            />
          </View>

          <View className="mb-3">
            <Text className="text-sm font-bold text-[#334155] mb-1">End</Text>
            <TextInput
              className="bg-white rounded-lg p-2 text-[#334155]"
              placeholder="Ending Address"
              value={end_Text}
              onChangeText={onChangeEndText}
            />
          </View>

          <PlanPathButton onPress={handleButtonPress} title="PLAN PATH" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RouteInfoPlanning;
