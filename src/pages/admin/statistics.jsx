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

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const ctgLabels = ["Cat 1", "Cat 2", "Cat 3", "Cat 4"]

const ctgData = {
  labels: ctgLabels,
  datasets: [
    {
      label: "Ventes: ",
      data: ctgLabels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: [
        "rgba(0, 0, 0, 0.67)",
        "rgba(130, 124, 127, 0.67)",
        "rgba(119, 99, 51, 0.67)",
        "rgba(74, 63, 35, 0.95)",
      ],
    },
  ],
}

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

const statisticsView = () => {
  return (
    <>
      <div className="overflox-y-auto">
        <div className="absolute top-8 left-[30%]">
          <div className="text-gray-600 grid grid-cols-3 grid-rows-1 gap-10">
            <div className="bg-gray-200 h-40 w-64 rounded-xl p-4">
              <div className="flex gap-3">
                <BanknotesIcon className="h-6" />
                <p>Ventes</p>
              </div>
              <div className="font-black text-5xl flex justify-center relative top-[20%]">
                4521
              </div>
            </div>
            <div className="bg-gray-200 h-40 w-64 rounded-xl p-4">
              <div className="flex gap-3">
                <ShoppingBagIcon className="h-6" />
                <p>Produits</p>
              </div>
              <div className="font-black text-5xl flex justify-center relative top-[20%]">
                35
              </div>
            </div>
            <div className="bg-gray-200 h-40 w-64 rounded-xl p-4">
              <div className="flex gap-3">
                <UsersIcon className="h-6" />
                <p>Utilisateurs</p>
              </div>
              <div className="font-black text-5xl flex justify-center relative top-[20%]">
                1898
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 absolute right-[10%] top-[30%]">
          <h1 className="text-gray-600 font-black mb-6">
            Répartition des ventes par catégorie
          </h1>
          <div className="flex justify-center">
            <div className="h-64 w-64">
              <Doughnut data={ctgData} />
            </div>
          </div>
        </div>

        <div className="my-10 absolute left-[21%] top-[30%] w-[40%]">
          <div className="flex justify-center">
            <h2 className="text-gray-600 font-black mb-10">
              Ventes des 7 derniers jours
            </h2>
          </div>
          <div>
            <Bar data={sellData} options={options} />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-screen justify-center lg:w-3/6 lg:relative lg:-mt-10 lg:pb-10 lg:left-[35%]">
          <h3 className="flex justify-center font-black text-gray-600">
            Meilleurs Ventes
          </h3>
          <div className="bg-gray-100 relative h-[420px] lg:h-[300px] overflow-x-auto rounded-lg">
            <table className="w-60 text-sm text-left text-gray-700 dark:text-gray-400 lg:w-full">
              <thead className="text-xs sticky top-0 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                <tr className="hover:cursor-pointer">
                  <th className="px-4 py-3">Id</th>
                  <th className="px-6 py-3">Nom de l'article</th>
                  <th className="flex justify-center px-6 py-3">
                    Nombres de ventes
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                <tr className="text-black border-b bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
                  <td className="px-4 py-4">_156516156</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Armoire en liège
                  </td>
                  <td className="flex justify-center px-6 py-4">12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default statisticsView
