import SearchBar from "@/components/app/ui/SearchBar"
import {PlusCircleIcon, TrashIcon} from "@heroicons/react/24/outline"
import {PencilSquareIcon} from "@heroicons/react/24/outline"
import {NavLink} from "@/components/utils/NavLink"
import axios from "axios"
import routes from "@/web/routes"

export const getServerSideProps = async () => {
    const {data} = await axios.get(
        `http://localhost:3000/api${routes.api.getProducts()}`
    )

    return {
        props: {
            categories: data.result,
        },
    }
}

const AllProduct = (props) => {
    const { products } = props

    return (
        <div className="p-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
            <div className="flex flex-col justify-center gap-10">
                <SearchBar section="category"/>
                <div className="flex flex-row gap-2 items-center">
                    <NavLink href="/admin/categories/create">
                        <PlusCircleIcon className="h-8 w-8"/>
                    </NavLink>
                    <p>Add a new category</p>
                </div>
                <div
                    className="flex flex-col overflow-x-auto overflow-hidden py-2 inline-block min-w-full sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8">
                    <table className="table-auto">
                        <thead className="bg-white border-b">
                        <tr>
                            <th className="text-sm font-medium text-gray-900 p-4 text-left">
                                Name
                            </th>
                            <th>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.map((product) => {
                                return <tr className="bg-gray-100 border-b"
                                           key={product.id}>
                                    <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <NavLink href={`/admin/categories/${product.id}/show`}>
                                            {product.name}
                                        </NavLink>
                                    </td>
                                    <td className="flex flex-row gap-5 text-sm text-gray-900 font-light p-4">
                                        <NavLink href={`/admin/categories/${product.id}/edit`}>
                                            <PencilSquareIcon className="h-6 w-6"/>
                                        </NavLink>
                                        <NavLink href={`/admin/categories/${product.id}/delete`}>
                                            <TrashIcon className="h-6 w-6"/>
                                        </NavLink>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllProduct
