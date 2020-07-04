import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";

import Detail from "./components/Detail";
import Main from "./components/Main";
import Random from "./components/Random";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Random" component={Random} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
