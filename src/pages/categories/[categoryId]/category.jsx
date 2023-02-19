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
        name: "Chaise 2",
        price: 456,
        image: "/images/chair.png"
    },
    {
        id: 2,
        name: "Chaise 3",
        price: 789,
        image: "/images/chair.png"
    },
    {
        id: 3,
        name: "Chaise 4",
        price: 987,
        image: "/images/chair.png"
    },
    {
        id: 4,
        name: "Chaise 5",
        price: 654, 
        image: "/images/chair.png"
    }
]


const Category = () => {
    return (
        <>
            <img
                src="/images/categories.png"
                alt=""
                className="w-full h-72 object-cover"/>
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

export default Category