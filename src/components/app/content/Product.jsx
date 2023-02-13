const Product = (props) => {
    const {image, alt, productName, productPrice, promotion} = props

    return <>
        <div>
            <img
                src={image}
                alt={alt}
                className="border-2 border-black w-full h-60 object-cover"
            />
            <div className="flex justify-between font-extrabold uppercase p-1">
                <h1>{productName}</h1>
                {
                    promotion ?
                        <div className="text-right">
                            <p className="line-through">
                                {productPrice} €
                            </p>
                            <p className="text-red-600 text-lg">
                                {promotion} €
                            </p>
                        </div> :
                        <p>
                            {productPrice} €
                        </p>
                }
            </div>
        </div>
    </>
}

export default Product