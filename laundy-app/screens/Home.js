import {
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItems from "../components/DressItems";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const [displayCurrentLocation, setDisplayCurrentLocation] = useState(
    "Loading location..."
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  const checkIfLocationEnabled = async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location is not enabled",
        "Please enable location services",
        [
          {
            text: "Cancel",
            onPress: () => Alert.alert("Cancel Pressed"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              "This alert was dismissed by tapping outside of the alert dialog."
            ),
        }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Allow the app to access the location",
          [
            {
              text: "Enable",
              onPress: async () => {
                const { status: newStatus } =
                  await Location.requestForegroundPermissionsAsync();
                if (newStatus === "granted") {
                  getCurrentLocation();
                } else {
                  Alert.alert(
                    "Permission denied",
                    "Location access is required."
                  );
                }
              },
              style: "default",
            },
          ],
          {
            cancelable: true,
            onDismiss: () =>
              Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
              ),
          }
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
        const { latitude, longitude } = coords;

        const reverseGeocodeResult = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocodeResult.length > 0) {
          const firstLocation = reverseGeocodeResult[0];
          const { name, city, postalCode } = firstLocation;

          const address = `${name} ${city} ${postalCode}`;
          setDisplayCurrentLocation(address);
        } else {
          throw new Error("Reverse geocoding failed");
        }
      } else {
        throw new Error("Location coordinates not found");
      }
    } catch (error) {
      console.error("Error getting location:", error.message);
      Alert.alert("Error", `An error occurred: ${error.message}`);
    }
  };

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProduct = () => {
      products.map((item) => dispatch(getProducts(item)));
    };
    fetchProduct();
  }, []);

  const products = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 20,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 15,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 7,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <>
      <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 15 }}
        >
          <MaterialIcons name="location-on" size={30} color="#FF033E" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentLocation}</Text>
          </View>
          <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png",
              }}
            />
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: "#C0C0C0",
            borderRadius: 15,
          }}
        >
          <TextInput placeholder="Search Items" />
          <FontAwesome name="search" size={24} color="#FF033E" />
        </View>

        <Carousel />

        <Services />

        {product.map((item, index) => (
          <DressItems item={item} key={index} />
        ))}
      </ScrollView>

      {totalPrice === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 15,
            marginBottom: 40,
            margin: 15,
            borderRadius: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "white",
              }}
            >
              {cart.length} items | ${totalPrice}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "500",
                color: "#fff",
                marginVertical: 6,
              }}
            >
              Extra charges might apply
            </Text>
          </View>
          <Pressable 
          // onPress={() => navigation.navigate("PickUp")}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Proceed To Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
