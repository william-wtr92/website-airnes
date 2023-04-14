import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import axios from "axios"
import routes from "@/web/routes"

const Carousel = () => {
  const [slides, setSlides] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api${routes.api.admin.carousel.getImages()}`
      )

      const sortedSlides = data.result.sort((a, b) => a.order - b.order)
      setIsLoading(false)
      setSlides(sortedSlides)
    }

    fetchImages()
  }, [])

  const prevSlide = () =>
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)

  const nextSlide = () =>
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [currentIndex, slides.length])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (slides.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No images available!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: slides[currentIndex].url }}
        style={styles.image}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.prevButton} onPress={prevSlide}>
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  prevButton: {
    position: "absolute",
    left: 10,
    top: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nextButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
})

export default Carousel
