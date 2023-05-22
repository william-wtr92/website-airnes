import { NavLink } from "@/components/utils/NavLink"

const Orders = () => {
  return (
    <>
      <main>
        <div>
          <div className="flex justify-center my-12 lg:my-16">
            <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:mr-14 lg:text-4xl">
              Mes Commandes
            </h1>
          </div>
          <div>
            <div className="py-4 border-b-2 shadow-md shadow-[#615043] font-bold text-xl lg:text-3xl">
              <h2 className="ml-6 hover:text-[#b3825c] hover:cursor-pointer lg:ml-80">
                2022
              </h2>
            </div>
            <div className="flex items-center flex-col my-6">
              <div className="grid grid-cols-2 gap-8 my-6 shadow-xl shadow-[#dad0c9] rounded-md p-6 hover:cursor-pointer">
                <NavLink href="/">
                  <p className="flex justify-start font-bold  hover:text-[#b3825c] lg:text-xl">
                    2022/09/10 - #365255412
                  </p>
                </NavLink>
                <p className="flex justify-end font-bold text-xl">Annulée</p>
                <p className="flex justify-start text-md text-[#7c7b81] font-bold lg:ml-5">
                  5 articles
                </p>
                <p className="flex justify-end font-bold">1200 €</p>
              </div>
              <div className="grid grid-cols-2 gap-8 my-6 shadow-xl shadow-[#dad0c9] rounded-md p-6 hover:cursor-pointer">
                <NavLink href="/">
                  <p className="flex justify-start font-bold  hover:text-[#b3825c] lg:text-xl">
                    2022/09/10 - #365255412
                  </p>
                </NavLink>
                <p className="flex justify-end font-bold text-xl">Annulée</p>
                <p className="flex justify-start text-md text-[#7c7b81] font-bold lg:ml-5">
                  5 articles
                </p>
                <p className="flex justify-end font-bold">1200 €</p>
              </div>
            </div>
          </div>
          <div>
            <div className="py-4 border-b-2 shadow-md shadow-[#615043] font-bold text-xl lg:text-3xl">
              <h2 className="ml-6 hover:text-[#b3825c] hover:cursor-pointer lg:ml-80">
                2023
              </h2>
            </div>
            <div className="flex items-center flex-col my-6">
              <div className="grid grid-cols-2 gap-8 my-6 shadow-xl shadow-[#dad0c9] rounded-md p-6 hover:cursor-pointer">
                <NavLink href="/">
                  <p className="flex justify-start font-bold  hover:text-[#b3825c] lg:text-xl">
                    2022/09/10 - #365255412
                  </p>
                </NavLink>
                <p className="flex justify-end font-bold text-xl">Annulée</p>
                <p className="flex justify-start text-md text-[#7c7b81] font-bold lg:ml-5">
                  5 articles
                </p>
                <p className="flex justify-end font-bold">1200 €</p>
              </div>
              <div className="grid grid-cols-2 gap-8 my-6 shadow-xl shadow-[#dad0c9] rounded-md p-6 hover:cursor-pointer">
                <NavLink href="/">
                  <p className="flex justify-start font-bold  hover:text-[#b3825c] lg:text-xl">
                    2022/09/10 - #365255412
                  </p>
                </NavLink>
                <p className="flex justify-end font-bold text-xl">Annulée</p>
                <p className="flex justify-start text-md text-[#7c7b81] font-bold lg:ml-5">
                  5 articles
                </p>
                <p className="flex justify-end font-bold">1200 €</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

Orders.restrictedTo = "user"

export default Orders
