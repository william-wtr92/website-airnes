import Return from "@/components/app/ui/Return"
import { NavLink } from "@/components/utils/NavLink"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import { useRouter } from "next/router"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import productDataServices from "@/web/services/admin/products/productData"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"
import ProductCarousel from "@/components/app/ui/ProductCarrousel"
import getMaterialsAndCategoryServices from "@/web/services/admin/materials/getMaterialsAndCategory"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { productId } = context.params

  const api = getApi(context)

  const productData = productDataServices({ api })
  const getMaterialsAndCategory = getMaterialsAndCategoryServices({ api })

  const [errProduct, product] = await productData(productId)

  const [errRaterialsAndCategories, materialsAndCategories] =
      await getMaterialsAndCategory()

  if (errProduct && errRaterialsAndCategories) {
    return {
      props: {
        errorMessage: errProduct + " & " + errRaterialsAndCategories,
      },
    }
  }

  if (errProduct || errRaterialsAndCategories) {
    return {
      props: {
        errorMessage: errProduct || errRaterialsAndCategories,
      },
    }
  }

  return {
    props: {
      product: product.result,
      categories: materialsAndCategories.categories,
      materials: materialsAndCategories.materials,
    },
  }
}

const ShowProduct = (props) => {
  const { product, errorMessage, categories, materials } = props

  const category = categories.find(cat => cat.id === product.categoryId)
  const material = materials.find(mat => mat.id === product.materialId)



  const router = useRouter()
  const {
    actions: { deleteProduct },
  } = useAppContext()

  const handleDelete = useCallback(async () => {
    await deleteProduct(product.id)

    router.push("/admin/contacts/all")
  }, [deleteProduct, product.id, router])

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
          <Return name="products" back={"/admin/products/all"} />
          <ProductCarousel images={product.image}/>
          <div className="font-bold py-1">{product.name}</div>
          <div className="py-1">
            <div className="font-bold pb-1">Category :</div>
            <p>{category.name}</p>
          </div>
          <div className="font-bold py-1">{product.price} €</div>
          <div className="font-bold py-1">
            {product.quantity > 0
              ? `En stock (${product.quantity})`
              : "Rupture de stock"}
          </div>
          <div className="font-bold py-1">{product.description}</div>
          <div className="py-1">
            <div className="font-bold pb-1">Material :</div>
            <p>{material.name}</p>
          </div>
          <div className="flex gap-5">
            <NavLink href={`/admin/products/${product.id}/edit`}>
              <button className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1">
                Edit
              </button>
            </NavLink>
            <button
              onClick={handleDelete}
              className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ShowProduct
