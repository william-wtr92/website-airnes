import React from "react"
import { StyleSheet, View, Text } from "react-native"

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Panier</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default CartScreen
