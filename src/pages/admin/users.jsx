import { NavLink } from "@/components/utils/NavLink"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

const UsersView = () => {
  return (
    <>
      <div className="flex justify-center my-5 lg:absolute lg:top-[12%] lg:left-[15%] lg:w-5/6">
        <MagnifyingGlassIcon className="h-6 relative left-8 top-2 text-gray-400" />
        <input
          type="search"
          className="w-2/3 py-2 pl-8 rounded-md border-2 focus:border-black bg-gray-100 focus:outline-none lg:w-2/5 lg:pl-10"
        />
      </div>
      <div className="flex w-screen justify-center lg:w-5/6 lg:absolute lg:top-[25%] lg:left-[15%]">
        <div className="relative h-[420px] lg:h-[500px] overflow-x-auto rounded-lg">
          <table className="w-60 text-sm text-left text-gray-700 dark:text-gray-400 lg:w-full">
            <thead className="text-xs sticky top-0 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
              <tr className="hover:cursor-pointer">
                <th className="px-6 py-3">Id</th>
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Date de création</th>
                <th className="px-6 py-3">Groupe</th>
                <th className="px-6 py-3 flex justify-center">Actions</th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              <tr className="text-black border-b bg-gray-100 hover:bg-gray-200 hover:cursor-pointer">
                <td className="px-6 py-4">_156516156</td>
                <td className="px-6 py-4 whitespace-nowrap">Louis Jean</td>
                <td className="flex justify-center px-6 py-4">12/12/2022</td>
                <td className="px-6 py-4">Admin</td>
                <td className="flex items-center px-6 py-4 space-x-3">
                  <NavLink href="#">
                    <p className="text-blue-600 hover:text-blue-500">
                      Modifier
                    </p>
                  </NavLink>
                  <NavLink href="#">
                    <p className="text-red-600 hover:text-red-500">Remove</p>
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default UsersView
