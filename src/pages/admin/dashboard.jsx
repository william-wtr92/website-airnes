import {
  BanknotesIcon,
  UsersIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid"
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Doughnut, Bar } from "react-chartjs-2"
import { faker } from "@faker-js/faker"
import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getApi from "@/web/getAPI"
import getStatsService from "@/web/services/admin/dashboard/getStats"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)
  const api = getApi(context)

  if (redirect) {
    return redirect
  }

  const getStats = getStatsService({ api })

  const [err, data] = await getStats()

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      users: data.user,
      products: data.product,
      total: data.sell,
      topSell: data.topSell,
    },
  }
}

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const dayLabels = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
]

const sellData = {
  labels: dayLabels,
  datasets: [
    {
      label: "Ventes",
      data: dayLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(139, 134, 137, 0.67)",
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
}

const Dashboard = (props) => {
  const { users, products, total, topSell } = props

  const topProducts = topSell.map((item) => item.name)

  const ctgData = {
    labels: topProducts,
    datasets: [
      {
        label: "Ventes: ",
        data: topProducts.map((item) => item.sales),
        backgroundColor: [
          "rgba(0, 0, 0, 0.67)",
          "rgba(130, 124, 127, 0.67)",
          "rgba(119, 99, 51, 0.67)",
          "rgba(74, 63, 35, 0.95)",
        ],
      },
    ],
  }

  return (
    <>
      <div className="overflow-y-auto">
        <div className="text-gray-600 flex justify-center mt-10 gap-2 lg:gap-4 lg:absolute lg:top-0 lg:left-[15%] lg:w-5/6">
          <div className="bg-gray-200 h-20 w-24 lg:h-40 lg:w-64 rounded-xl p-2 lg:p-4">
            <div className="flex lg:gap-3">
              <BanknotesIcon className="h-4 lg:h-6" />
              <p className="text-xs lg:text-md">Ventes</p>
            </div>
            <div className="font-black text-md flex justify-center relative top-[20%] lg:text-3xl">
              {total} €
            </div>
          </div>
          <div className="bg-gray-200 h-20 w-24 lg:h-40 lg:w-64 rounded-xl p-2 lg:p-4">
            <div className="flex lg:gap-3">
              <ShoppingBagIcon className="h-4 lg:h-6" />
              <p className="text-xs lg:text-md">Produits</p>
            </div>
            <div className="font-black text-md flex justify-center relative top-[20%] lg:text-5xl">
              {products}
            </div>
          </div>
          <div className="bg-gray-200 h-20 w-24 lg:h-40 lg:w-64 rounded-xl p-2 lg:p-4">
            <div className="flex lg:gap-3">
              <UsersIcon className="h-4 lg:h-6" />
              <p className="text-xs lg:text-md">Utilisateurs</p>
            </div>
            <div className="font-black text-md flex justify-center relative top-[20%] lg:text-5xl">
              {users}
            </div>
          </div>
        </div>

        <div className="mt-10 lg:absolute lg:right-[10%] lg:top-[30%]">
          <h1 className="flex justify-center text-gray-600 font-black mb-6">
            Répartition des ventes par produits
          </h1>
          <div className="flex justify-center">
            <div className="h-64 w-64">
              <Doughnut data={ctgData} />
            </div>
          </div>
        </div>

        <div className="mt-10 w-full lg:absolute lg:left-[21%] lg:top-[30%] lg:w-[40%]">
          <div className="flex justify-center">
            <h2 className="text-gray-600 font-black">
              Ventes des 7 derniers jours
            </h2>
          </div>
          <div>
            <Bar data={sellData} options={options} />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-screen lg:w-[60%] lg:relative lg:pb-10 lg:left-[27%]">
          <div>
            <h3 className="flex justify-center text-md font-black text-gray-600 pb-6 lg:text-2xl lg:relative lg:right-[35%]">
              Meilleurs Ventes
            </h3>
          </div>
          <div className="bg-gray-100 relative h-[300px] overflow-x-auto rounded-lg">
            <table className="w-screen text-sm text-left text-gray-700 dark:text-gray-400 lg:w-full">
              <thead className="text-xs sticky top-0 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                <tr className="hover:cursor-pointer">
                  <th className="px-4 py-3">Image</th>
                  <th className="px-6 py-3">Nom de l'article</th>
                  <th className="flex justify-center px-6 py-3">
                    Nombres de ventes
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {topSell.map((item) => (
                  <>
                    <tr
                      key={item.id}
                      className="text-black border-b bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
                    >
                      <td className="px-4 py-2">
                        <NavLink href="/productid/product">
                          <Image
                            src={item.image}
                            alt="meuble"
                            width={100}
                            height={1}
                            className="w-12 h-12 lg:h-16 lg:w-16 hover:cursor-pointer"
                          />
                        </NavLink>
                      </td>
                      <td className="px-6 whitespace-nowrap">{item.name}</td>
                      <td className="flex justify-center px-6 pt-8">
                        {item.sales}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
