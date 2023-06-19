import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native"
import axios from "axios"
import routes from "@/web/routes"
import Constants from "expo-constants"

const HomepageProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `${
          Constants.manifest.extra.apiBaseUrl
        }/api${routes.api.admin.selectProduct.getSelectProducts()}`
      )

      const sortedProducts = data.result.sort((a, b) => a.order - b.order)

      setIsLoading(false)
      setProducts(sortedProducts)
    }

    fetchProducts()
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer}>
      <Image
        source={{ uri: item.product.image[0].url }}
        style={styles.productImage}
        alt={item.product.name}
      />
      <Text style={styles.productText}>{item.product.name}</Text>
    </TouchableOpacity>
  )

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading ...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  productContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  productText: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    zIndex: 1,
    position: "relative",
    left: 4,
    textAlign: "left",
  },
  productImage: {
    width: 250,
    height: 250,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
})

export default HomepageProducts
