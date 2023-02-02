// import classNames from "classnames"

const Product = (props) => {
    const { image, alt, productName, productPrice } = props

    return <>
        <div>
            <img
                src={image}
                alt={alt}
                className="border-2 border-black w-full h-60 object-cover"
            />
            <div className="flex justify-between font-extrabold uppercase p-1">
                <h1>{productName}</h1>
                <p>{productPrice} €</p>
            </div>
        </div>
    </>
}

export default Product