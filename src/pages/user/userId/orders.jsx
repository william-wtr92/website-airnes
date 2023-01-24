import FooterMenu from "@/components/home/FooterMenu"
import OrderView from "@/components/user/OrdersView"

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
