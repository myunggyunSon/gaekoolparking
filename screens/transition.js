import React from "react-native";
import { StyleSheet, Text, Image, View } from "react-native";
import Map from "./map";
import { useNavigation } from "@react-navigation/native";

export default function Transition() {
  const navigate = useNavigation();
  setTimeout(() => {
    navigate.navigate({
      name: "Map",
      component: { Map },
    });
  }, 3000);
  return (
    <View style={styles.image}>
      <Image
        style={{ height: 200, width: 200 }}
        source={require("../assets/mainlogo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  text: {
    color: "darkorange",
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 10,
  },
});
