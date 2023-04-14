import React from "react"
import { View, StyleSheet, SafeAreaView } from "react-native"
import Navbar from "@/components/app/layout/NavMenu"
import AppContainer from "@/components/app/layout/AppHomeContainer"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AppContainer />
      </View>
      <Navbar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
})
