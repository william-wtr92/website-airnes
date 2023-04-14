import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Airneis</Text>
      <StatusBar style="auto" />
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ddd",
    padding: 10,
  },
})
