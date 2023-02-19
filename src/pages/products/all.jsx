import Product from "@/components/app/content/Product"

const example = [
    {
        id: 0,
        name: "Chaise",
        price: 123,
        image: "/images/chair.png"
    }
    ,
    {
        id: 1,
        name: "Piece",
        price: 456,
        image: "/images/meuble2.jpg"
    },
    {
        id: 2,
        name: "Ensemble",
        price: 789,
        image: "/images/meuble3.png"
    },
]


const allProducts = () => {
    return (
        <>
            <h1
                className="flex justify-center font-bold tracking-wide text-xl my-10 uppercase"
            >
                Tous nos produits
            </h1>
            <div className="flex flex-col items-center">
                <div className="w-5/6 grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-20">
                    {
                        example.map((product) => (
                            <Product
                                key={product.id}
                                alt="test"
                                image={product.image}
                                productName={product.name}
                                productPrice={product.price}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default allProducts