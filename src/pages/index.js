import Carousel from "@/components/utils/Carousel"
import Categories from "@/components/home/Categories"
import FooterMenu from "@/components/home/FooterMenu"
import Product from "@/components/category/Product"

const Main = () => {
    const categories = [
        "Chambre",
        "Salon",
        "Salle de bain"
    ]

    const exampleState = [
        {
            id: 0,
            name: "Chaise",
            price: 123,
            image: "/images/meuble2.jpg",
        },
        {
            id: 1,
            name: "Chaise 2",
            price: 456,
            image: "/images/meuble2.jpg",
        },
        {
            id: 2,
            name: "Chaise 3",
            price: 789,
            image: "/images/meuble2.jpg",
        },
        {
            id: 3,
            name: "Chaise 4",
            price: 987,
            image: "/images/meuble2.jpg",
        },
        {
            id: 4,
            name: "Chaise 5",
            price: 654,
            image: "/images/meuble2.jpg",
        },
        {
            id: 5,
            name: "Chaise 5",
            price: 654,
            image: "/images/meuble2.jpg",
        },
        {
            id: 6,
            name: "Chaise 5",
            price: 654,
            image: "/images/meuble2.jpg",
        },
    ]


    return (
        <>
            <main className="space-y-12">
                <Carousel/>

                <div className="flex justify-center">
                    <div className="w-full lg:w-3/5 ">
                        <div className="flex flex-col items-center space-y-10">
                            <h3 className="uppercase font-extrabold text-xl tracking-widest">Promotions</h3>
                            <div className="overflow-x-auto flex bg-slate-300 w-full space-x-10 px-5 lg:px-0">
                                {exampleState.map((product) => (
                                    <div key={product.id} className="flex-none w-3/5 lg:w-2/5">
                                        <Product
                                            alt="test"
                                            image={product.image}
                                            productName={product.name}
                                            productPrice={product.price}
                                            promotion={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="MainText flex flex-col text-[13px] font-bold items-center py-6 hover:cursor-pointer hover:text-[#615043] lg:text-xl">
                    <p>VENANT DES HAUTES TERRES D’ECOSSE NOS</p>
                    <p>MEUBLES SONT IMMORTELS</p>
                </div>

                <div className="flex flex-wrap justify-center gap-5">
                    {
                        categories.map(
                            (category, index) => (
                                <Categories
                                    key={index}
                                    catName={category}
                                />
                            )
                        )
                    }
                </div>
            </main>
            <FooterMenu position="relative"/>
        </>
    )
}

export default Main
