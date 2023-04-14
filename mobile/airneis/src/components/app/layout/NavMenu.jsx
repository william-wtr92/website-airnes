import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#615043",
    padding: 5,
    zIndex: 1,
  },
  icon: {
    color: "#615043",
  },
  homeButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#615043",
    position: "relative",
    bottom: 20,
    padding: 5,
  },
})

const NavMenu = () => {
  return (
    <>
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton}>
          <Ionicons name="home-outline" size={30} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={28} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default NavMenu
