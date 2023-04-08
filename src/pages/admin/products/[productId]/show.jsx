import Return from "@/components/app/ui/Return"
import axios from "axios"
import routes from "@/web/routes"
import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"

export const getServerSideProps = async (context) => {
  const { productId } = context.params

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.admin.products.productData(
      productId
    )}`
  )

  if (!data.result) {
    return {
      redirect: {
        destination: "/admin/products/all",
        permanent: false,
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
  const { product } = props

  return (
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
      <div className="font-bold py-1">En Stock ({product.stock})</div>
      <div className="font-bold py-1">{product.description}</div>
      <div className="py-1">
        <div className="font-bold pb-1">Matériaux :</div>
        <p>{product.material}</p>
      </div>
      <div className="flex gap-5">
        <NavLink href={`/admin/products/${product.id}/edit`}>
          <button className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1">
            Edit
          </button>
        </NavLink>
        <NavLink href={"/"}>
          <button className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1">
            Delete
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default ShowProduct
