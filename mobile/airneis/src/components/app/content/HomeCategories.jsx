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

const HomepageCategories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(
        `${
          Constants.manifest.extra.apiBaseUrl
        }/api${routes.api.admin.selectCategory.getSelectCategory()}`
      )

      const sortedCategories = data.result.sort((a, b) => a.order - b.order)

      setIsLoading(false)
      setCategories(sortedCategories)
    }

    fetchCategories()
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryContainer}>
      <Text style={styles.categoryText}>{item.user.name}</Text>
      <Image
        source={{ uri: item.user.image }}
        style={styles.categoryImage}
        accessibilityLabel={item.user.name}
      />
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
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.user.id.toString()}
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
  categoryContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 25,
    fontWeight: "bold",
    position: "absolute",
    top: "65%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: "black",
    zIndex: 1,
    textAlign: "center",
  },
  categoryImage: {
    width: 250,
    height: 250,
    opacity: 50,
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

export default HomepageCategories
