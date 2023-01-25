import CartView from "@/components/user/CartView"
import FooterMenu from "@/components/home/FooterMenu"

const UserCart = () => {
  return (
    <>
      <main>
        <CartView />
      </main>
      <FooterMenu position="relative" />
    </>
  )
}

export default UserCart
