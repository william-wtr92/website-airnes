import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import Carousel from "@/components/app/ui/Carousel"
import HomepageCategories from "../content/HomeCategories"
import HomepageProducts from "../content/HomeProducts"

const AppContainer = () => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Carousel />
        <View style={styles.text}>
          <Text style={styles.textCategory}>
            VENANT DES HAUTES TERRES D’ECOSSE
          </Text>
          <Text style={styles.textCategory}>NOS MEUBLES SONT IMMORTELS</Text>
        </View>
        <View style={styles.categories}>
          <HomepageCategories />
        </View>
        <View style={styles.text}>
          <Text style={styles.textProduct}>PRODUITS POPULAIRES</Text>
        </View>
        <View style={styles.categories}>
          <HomepageProducts />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },
  contentContainer: {
    paddingBottom: 60,
    height: 60,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 50,
  },
  textCategory: {
    textAlign: "center",
    fontWeight: "bold",
  },
  textProduct: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  categories: {
    marginVertical: 50,
  },
})

export default AppContainer
