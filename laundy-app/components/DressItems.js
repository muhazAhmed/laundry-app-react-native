import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const DressItems = ({ item }) => {
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: "#F8F8F8",
          borderRadius: 20,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 14,
        }}
      >
        <View>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: item.image }}
          />
        </View>
        <View>
          <Text
            style={{
              width: 80,
              fontSize: 15,
              fontWeight: "500",
              marginBottom: 7,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ width: 80, color: "gray", fontSize: 15 }}>
            ${item.price}
          </Text>
        </View>
        <View>
          <Pressable>
            <Text
              style={{
                borderColor: "gray",
                borderWidth: 2,
                marginVertical: 10,
                borderRadius: 25,
                color: "#088F8F",
                textAlign: "center",
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              Add
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export default DressItems;

const styles = StyleSheet.create({});
