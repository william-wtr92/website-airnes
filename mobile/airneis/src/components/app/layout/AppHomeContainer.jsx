import React from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import Carousel from "@/components/app/ui/Carousel"
import HomepageCategories from "../content/HomeCategories"
import HomepageProducts from "../content/HomeProducts"

const AppContainer = () => {
  const data = [
    { id: "carousel", component: <Carousel /> },
    {
      id: "title1",
      component: (
        <View style={styles.text}>
          <Text style={styles.textCategory}>
            VENANT DES HAUTES TERRES D’ECOSSE
          </Text>
          <Text style={styles.textCategory}>NOS MEUBLES SONT IMMORTELS</Text>
        </View>
      ),
    },
    { id: "categories", component: <HomepageCategories /> },
    {
      id: "title2",
      component: (
        <View style={styles.text}>
          <Text style={styles.textProduct}>PRODUITS POPULAIRES</Text>
        </View>
      ),
    },
    { id: "products", component: <HomepageProducts /> },
  ]

  const renderItem = ({ item }) => item.component

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
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
})

export default AppContainer
