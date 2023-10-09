import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';

const Home = () => {
    const [displayCurrentLocation, setDisplayCurrentLocation] = useState("Loading location...");

    const checkIfLocationEnabled = () => {

    };
    
    const getCurrentLocation = () => {

    };

    useEffect(() => {

    }, [])
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})