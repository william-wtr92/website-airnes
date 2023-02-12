import Product from "@/components/category/Product"
import {useState} from "react"
import Filters from "@/components/find/Filters"

const SearchPage = () => {
    const [filterShow, setFilterShow] = useState(false)

    const handleShowFilter = () => {
        setFilterShow(!filterShow)
    }

    return(
        <>
            <div className="flex flex-row">
                <div className={`${filterShow ? `basis-0 hidden` : `basis-3/12 block`} flex flex-col border-r-2 p-4`}>
                    <div  className="flex gap-64 pb-4">
                        <button className="underline">Réintialiser</button>
                        <button className="underline" onClick={handleShowFilter}>Fermer</button>
                    </div>
                    <div  className="flex pb-6 gap-2">
                        <div className="flex flex-col">
                            <div className="font-bold pb-2 text-xl text-black">Prix min €</div>
                            <input
                                className={`px-6 border rounded-full border-black bg-[#EDE5E0] text-black placeholder-[#443021] p-4`}
                                type="search"
                                placeholder=". . . €"
                            />
                        </div>
                        <div className="flex flex-col pb-6">
                            <div className="font-bold pb-2 text-xl text-black">Prix max €</div>
                            <input
                            className={`px-6 border  rounded-full border-black bg-[#EDE5E0] text-black placeholder-[#443021] p-4`}
                                type="search"
                                placeholder=". . . €"
                            />
                        </div>
                    </div>
                    <div id={"filtres"} className="flex flex-col gap-6">
                        <Filters categories={material} name={"Matériaux"}/>
                        <Filters categories={stock} name={"Stock"}/>
                        <Filters categories={product} name={"Produit"}/>
                    </div>
                </div>
                <div className={`${filterShow ? `basis-full` : `basis-9/12`} gap-4 flex flex-col justify-center mx-6 mt-20 py-10 px-10 lg:py-16 lg:mx-auto lg:mt-8`}>
                    <div  className="text-center text-3xl text-black font-bold">
                        Recherche
                    </div>
                    <div  className="flex justify-center">
                        <div  className="pr-6 pt-2">
                            <button onClick={handleShowFilter}>Filtrer</button>
                        </div>
                        <div>
                            <input
                                className={`px-6 border border-gray-500 bg-transparent text-black placeholder-[#443021] p-2`}
                                type="search"
                                placeholder="Rechercher"
                            />
                        </div>
                    </div>
                    <div className="text-center text-xl text-black">
                        Résultat
                    </div>
                    <div className="text-center">
                        Trier par : (asc)
                    </div>
                    <div className="flex flex-col items-center">
                        <div className={`${filterShow ? `lg:grid-cols-3` : `lg:grid-cols-2`} w-5/6 grid gap-8 grid-cols-1 md:grid-cols-2 my-20`}>
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
                </div>
            </div>
        </>
    )
}
export const material = [
    "acier",
    "metal",
    "verre",
    "cuivre",
    "bois",
    "plastique",

]
export const stock = [
    "disponible"
]
export const product = [
    "table",
    "canape",
    "lit",
    "chaise"
]
export const example = [
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
        name: "Terra",
        price: 654,
        image: "/images/chair.png"
    },
    {
        id: 5,
        name: "Cs.go",
        price: 123,
        image: "/images/chair.png"
    },
    {
        id: 6,
        name: "Laink",
        price: 123,
        image: "/images/chair.png"
    },
    {
        id: 7,
        name: "Alde",
        price: 123,
        image: "/images/chair.png"
    },
    {
        id: 8,
        name: "Chaise",
        price: 123,
        image: "/images/chair.png"
    },
    {
        id: 9,
        name: "Sheesh",
        price: 123,
        image: "/images/chair.png"
    },
    {
        id: 10,
        name: "Chaise",
        price: 123,
        image: "/images/chair.png"
    },
    {
        id: 11,
        name: "legend",
        price: 123,
        image: "/images/chair.png"
    },
]
export default SearchPage


