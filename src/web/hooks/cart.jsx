import { useState, useEffect } from "react"

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const taxRate = 0.2

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      setCartItems(parsedCart)
      calculateTotalAndTax(parsedCart)
    }
  }, [])

  const calculateTotalAndTax = (items) => {
    const calculatedTotal = items.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.product_quantity,
      0
    )
    const calculatedTax = calculatedTotal * taxRate

    setTotal(calculatedTotal)
    setTax(calculatedTax)
  }

  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || []
    const existingItemIndex = currentCart.findIndex(
      (item) => item.id === product.id
    )

    let newCartItems = []

    if (existingItemIndex !== -1) {
      newCartItems = [...currentCart]
      newCartItems[existingItemIndex].product_quantity += 1
    } else {
      newCartItems = [...currentCart, { ...product, product_quantity: 1 }]
    }

    setCartItems(newCartItems)
    localStorage.setItem("cart", JSON.stringify(newCartItems))
    calculateTotalAndTax(newCartItems)
  }

  const removeFromCart = (productId) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId)
    setCartItems(newCartItems)
    localStorage.setItem("cart", JSON.stringify(newCartItems))
    calculateTotalAndTax(newCartItems)
  }

  const clearCart = () => {
    setCartItems([])
    setTotal(0)
    setTax(0)
    localStorage.removeItem("cart")
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === productId) {
          return { ...item, product_quantity: newQuantity }
        }

        return item
      })
      setCartItems(updatedCartItems)
      localStorage.setItem("cart", JSON.stringify(updatedCartItems))
      calculateTotalAndTax(updatedCartItems)
    }
  }

  return {
    cartItems,
    total,
    tax,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  }
}
