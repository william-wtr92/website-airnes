import Return from "@/components/app/ui/Return"
import axios from "axios"
import routes from "@/web/routes"
import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"
import Confirm from "@/components/app/ui/Confirm"
import classNames from "classnames"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router"

export const getServerSideProps = async (context) => {
  const { categoryId } = context.params

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.admin.categories.categoryData(
      categoryId
    )}`
  )

  if (!data.result) {
    return {
      redirect: {
        destination: "/admin/categories/all",
        permanent: false,
      },
    }
  }

  return {
    props: {
      category: data.result,
    },
  }
}

const ShowCategory = (props) => {
  const { category } = props
  const [itemToDelete, setItemToDelete] = useState(false)
  const router = useRouter()

  const {
    actions: { deleteCategory },
  } = useAppContext()

  const isNoCategory = (category) => {
    return category.name === "No category"
  }

  const onDeleteClick = (id) => {
    setItemToDelete(id)
  }

  const handleDeletion = useCallback(
    async (id) => {
      await deleteCategory(id)
      setItemToDelete(false)

      router.push("/admin/categories/all")
    },
    [deleteCategory]
  )

  return (
    <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
      <Return name="categories" back={"/admin/categories/all"} />
      <Image
        src={category.image}
        alt={category.name}
        className="object-cover md:w-96 md:h-64"
        width={500}
        height={500}
      />
      <div className="font-bold">{category.name}</div>
      <div>{category.description}</div>
      <div className="flex gap-5">
        {!isNoCategory(category) && (
          <>
            <NavLink href={`/admin/categories/${category.id}/edit`}>
              <button className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1">
                Edit
              </button>
            </NavLink>
            <>
              <button
                className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1"
                onClick={() => onDeleteClick(category.id)}
              >
                Delete
              </button>
              <Confirm
                className={classNames(itemToDelete ? "block" : "hidden")}
                display={setItemToDelete}
                action={handleDeletion}
                textValue="Are you sure you want to delete this item?"
                params={itemToDelete}
              />
            </>
          </>
        )}
      </div>
    </div>
  )
}

export default ShowCategory
