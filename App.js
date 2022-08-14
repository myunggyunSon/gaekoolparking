import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ParkingFee from "./screens/fee.js";
import InfoScreen from "./screens/InfoScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "./screens/map.tsx";
import Reviews from "./screens/reviews.tsx";
import ReviewDraft from "./screens/draft.tsx";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationContainer>
          <Stack.Navigator
              initialRouteName="Map"
              screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="InfoScreen" component={InfoScreen} />
            <Stack.Screen name="ParkingFee" component={ParkingFee} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="ReviewDraft" component={ReviewDraft} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
