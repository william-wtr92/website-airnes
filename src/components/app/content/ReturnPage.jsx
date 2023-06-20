import Image from "next/image"

const ReturnPage = (props) => {
  const { products } = props

  return <>
    {products.map((product, index) => (
      <div key={index} className="flex flex-col gap-5 md:w-3/4 lg:w-1/2">
        <div className="flex flex-col items-center xs:flex-row gap-5">
          <label htmlFor={`checkbox-${index}`}>
            <Image
              src={products[index].productData.image[0].url}
              alt={products[index].productData.name}
              width={100}
              height={100}
              className="h-28 w-32 object-cover"
            />
          </label>
          <div className="flex flex-col gap-5">
            <h1 className="text-xl">{products[index].productData.name}</h1>
            <h2 className="text-lg">{products[index].productData.price} €</h2>
          </div>
        </div>
        {product.return && (
          <div>{product.return}</div>
        )}
      </div>
    ))}
  </>
}

export default ReturnPage