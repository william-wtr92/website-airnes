import React from "react"
import { StyleSheet, View } from "react-native"
import Carousel from "@/components/app/ui/Carousel"
import NavMenu from "@/components/app/layout/NavMenu"

const AppContainer = () => {
  return (
    <View style={styles.container}>
      <Carousel />
      <NavMenu />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default AppContainer
