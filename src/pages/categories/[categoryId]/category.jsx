import ProductThumbnail from "@/components/app/content/ProductThumbnail"
import Image from "next/image"
import axios from "axios"
import routes from "@/web/routes"

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
      <div className="relative">
        <Image
          src={category.image}
          alt={category.name}
          className="w-full h-72 object-cover blur-[1px]"
          height={500}
          width={500}
        />
        <div className="absolute inset-0 bg-primary bg-opacity-30 flex items-center justify-center">
          <h1 className="text-3xl font-black text-white tracking-widest drop-shadow-xl drop-shadow-lg">
            {category.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="px-10 py-20">{category.description}</div>
        <div className="w-5/6 grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map(
            (product) =>
              product.quantity && (
                <ProductThumbnail
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
