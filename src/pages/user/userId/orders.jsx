import FooterMenu from "@/components/home/FooterMenu"
import OrderView from "@/components/user/OrderView"

const UserOrderView = () => {
  return (
    <>
      <main>
        <OrderView />
      </main>
      <FooterMenu position="relative" />
    </>
  )
}

export default UserOrderView
