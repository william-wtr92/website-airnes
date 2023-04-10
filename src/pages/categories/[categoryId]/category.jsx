import Image from "next/image"
import axios from "axios"
import routes from "@/web/routes"
import Product from "@/components/app/content/Product"

export const getServerSideProps = async (context) => {
  const { categoryId } = context.params

  const returnCategories = () => {
    return {
      redirect: {
        destination: "/categories/all",
        permanent: false,
      },
    }
  }

  const noCategoryId = 0

  if (!categoryId || categoryId === noCategoryId) {
    returnCategories()
  }

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.admin.categories.categoryData(
      categoryId
    )}?showProducts=true`
  )

  if (!data.result) {
    returnCategories()
  }

  const categoryData = data.result

  return {
    props: {
      category: categoryData,
    },
  }
}

const Category = (props) => {
  const { category } = props

  const products = category.products

  return (
    <>
      <Image
        src={category.image}
        alt={category.name}
        className="w-full h-72 object-cover"
        height={500}
        width={500}
      />
      <div className="flex flex-col items-center">
        <div className="w-5/6 grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-20">
          {products.map(
            (product) =>
              product.quantity && (
                <Product
                  key={product.id}
                  alt={product.name}
                  image={product.image}
                  productId={product.id}
                  productName={product.name}
                  productPrice={product.price}
                />
              )
          )}
        </div>
      </div>
    </>
  )
}

export default Category
