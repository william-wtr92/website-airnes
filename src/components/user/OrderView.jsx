import { NavLink } from "@/components/home/NavLink"

const OrderView = () => {
  return (
    <div>
      <div className="flex justify-center my-14">
        <h1 className="font-bold text-4xl hover:cursor-pointer hover:text-[#615043]">
          Mes Commandes
        </h1>
      </div>
      <div>
        <div className="py-4 border-b-2 font-bold text-3xl">
          <h2 className="ml-10 hover:text-[#b3825c] hover:cursor-pointer lg:ml-80">
            2022
          </h2>
        </div>
        <div className="flex items-center flex-col my-6">
          <div className="grid grid-cols-2 gap-6 my-6 hover:cursor-pointer">
            <NavLink href="/">
              <p className="mr-20 font-bold text-xl hover:text-[#b3825c]">
                2022/09/10 - #365255412
              </p>
            </NavLink>
            <p className="ml-20 mr-0 font-bold text-xl">En cours</p>
            <p className="mr-20 text-[#7c7b81] font-bold">5 articles</p>
            <p className="ml-28 mr-0 font-bold">1200 €</p>
          </div>
          <div className="grid grid-cols-2 gap-6 my-6 hover:cursor-pointer">
            <NavLink href="/">
              <p className="mr-20 font-bold text-xl hover:text-[#b3825c]">
                2022/09/10 - #365255412
              </p>
            </NavLink>
            <p className="ml-20 mr-0 font-bold text-xl">En cours</p>
            <p className="mr-20 text-[#7c7b81] font-bold">5 articles</p>
            <p className="ml-28 mr-0 font-bold">1200 €</p>
          </div>
        </div>
      </div>
      <div>
        <div className="py-4 border-b-2 font-bold text-3xl">
          <h2 className="ml-10 hover:text-[#b3825c] hover:cursor-pointer lg:ml-80">
            2023
          </h2>
        </div>
        <div className="flex items-center flex-col my-6">
          <div className="grid grid-cols-2 gap-6 my-6 hover:cursor-pointer">
            <NavLink href="/">
              <p className="mr-20 font-bold text-xl hover:text-[#b3825c]">
                2022/09/10 - #365255412
              </p>
            </NavLink>
            <p className="ml-20 mr-0 font-bold text-xl">En cours</p>
            <p className="mr-20 text-[#7c7b81] font-bold">5 articles</p>
            <p className="ml-28 mr-0 font-bold">1200 €</p>
          </div>
          <div className="grid grid-cols-2 gap-6 my-6 hover:cursor-pointer">
            <NavLink href="/">
              <p className="mr-20 font-bold text-xl hover:text-[#b3825c]">
                2022/09/10 - #365255412
              </p>
            </NavLink>
            <p className="ml-20 mr-0 font-bold text-xl">En cours</p>
            <p className="mr-20 text-[#7c7b81] font-bold">5 articles</p>
            <p className="ml-28 mr-0 font-bold">1200 €</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderView
