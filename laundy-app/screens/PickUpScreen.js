import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <SafeAreaView style={{ padding: 5 }}>
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
        Enter address
      </Text>
      <TextInput
        style={{
          padding: 40,
          borderColor: "gray",
          borderWidth: 1,
          paddingVertical: 80,
          borderRadius: 15,
          margin: 10,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginHorizontal: 10,
        }}
      >
        Pick Up Date
      </Text>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date("2020-08-20")}
        endDate={new Date("2020-08-31")}
        initialSelectedDate={new Date("2020-08-22")}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
      ;
    </SafeAreaView>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
