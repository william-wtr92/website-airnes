// App.js
import React from "react"
import { View, StyleSheet } from "react-native"
import Navbar from "@/components/app/layout/NavMenu"
import AppContainer from "@/components/app/layout/AppHomeContainer"

export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer />
      <Navbar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
