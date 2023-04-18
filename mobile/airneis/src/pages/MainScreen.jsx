import React from "react"
import { StyleSheet, View } from "react-native"
import AppContainer from "@/components/app/layout/AppHomeContainer"

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <AppContainer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default MainScreen
