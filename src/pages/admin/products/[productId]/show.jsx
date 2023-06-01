import Return from "@/components/app/ui/Return"
import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import { useRouter } from "next/router"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import productDataServices from "@/web/services/admin/products/productData"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { productId } = context.params

  const api = getApi(context)

  const productData = productDataServices({ api })

  const [err, data] = await productData(productId)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      product: data.result,
    },
  }
}

const ShowProduct = (props) => {
  const { product, errorMessage } = props

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
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover md:w-96 md:h-64"
            width={500}
            height={500}
          />
          <div className="font-bold py-1">{product.name}</div>
          <div className="font-bold py-1">{product.price} €</div>
          <div className="font-bold py-1">
            {product.quantity > 0
              ? `En stock (${product.quantity})`
              : "Rupture de stock"}
          </div>
          <div className="font-bold py-1">{product.description}</div>
          <div className="py-1">
            <div className="font-bold pb-1">Material :</div>
            <p>{product.material}</p>
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
