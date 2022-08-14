import React, { Component } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function MainScreen(props) {
  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Ionicons
          name="ios-chevron-back-circle-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.header}>{props.route.params.name}</Text>
        <View style={styles.space}></View>
        <View style={styles.gbox}>
          <View style={styles.gflex}>
            <Text style={styles.sub1}>심야권</Text>
            <Text style={styles.sub1}>4000원</Text>
          </View>
          <View style={styles.gflex}>
            <Text style={styles.sub2}>7/12 10:00부터 구매 가능</Text>
            <Text style={styles.sub2}>판매시간아님</Text>
          </View>
        </View>
        <View style={styles.space2}></View>

        <Text style={styles.time}>시간요금</Text>
        <View style={styles.flex1}>
          <View style={styles.info}>
            <Text style={styles.textstyle}>초기무료</Text>
            <Text style={styles.textstyle2}>+정보알려주기</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.textstyle}>기본요금</Text>
            <Text style={styles.textstyle}>30분 1,000원</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.textstyle}>추가요금</Text>
            <Text style={styles.textstyle}>30분당 1,000원</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.textstyle}>할증 기준시간</Text>
            <Text style={styles.textstyle2}>+정보알려주기</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.textstyle}>할증요금</Text>
            <Text style={styles.textstyle2}>+정보알려주기</Text>
          </View>
        </View>
        <Text style={styles.time}>일주차 요금</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    color: "black",
    paddingTop: 50,
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
  },
  subheader: {
    color: "grey",
    paddingTop: 10,
    alignSelf: "center",
  },
  space: {
    height: 40,
  },
  gbox: {
    backgroundColor: "lightgrey",
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  sub1: {
    color: "grey",
    fontSize: 16,
  },
  sub2: {
    color: "black",
  },
  location: {
    height: 45,
    width: "110%",
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 15,
    borderColor: "lightgrey",
    borderTopWidth: 1,
  },
  location2: {
    height: 45,
    width: "110%",
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 15,
    borderColor: "lightgrey",
    borderBottomWidth: 1,
  },
  time: {
    paddingLeft: 25,
    color: "darkorange",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  flex1: {
    flexDirection: "column",
  },
  info: {
    backgroundColor: "whitesmoke",
    borderColor: "lightgrey",
    height: 32,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    padding: 8,
    borderWidth: 0.25,
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textstyle: {
    color: "black",
    fontSize: 14,
  },
  textstyle2: {
    color: "grey",
    fontSize: 14,
  },
  gflex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  space2: {
    height: 10,
  },
  location3: {
    color: "grey",
  },
});
