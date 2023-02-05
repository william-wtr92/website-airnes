import Product from "@/components/category/Product"
import { useState, useEffect } from "react"
import Filters from "@/components/find/Filters"
import {
    FunnelIcon,
    AdjustmentsVerticalIcon
} from "@heroicons/react/24/solid"
import FooterMenu from "@/components/home/FooterMenu"

const SearchPage = () => {
    const [filterShow, setFilterShow] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [filterPriceMin, setFilterPriceMin] = useState(1)
    const [filterPriceMax, setFilterPriceMax] = useState(100000)

    useEffect(() => {
        setData(example)
    }, [])

    const handlePriceFilterMin = (e) => {
        setFilterPriceMin(parseInt(e.target.value))
    }
    const handlePriceFilterMax = (e) => {
        setFilterPriceMax(parseInt(e.target.value))
    }
    const handleLeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleShowFilter = () => {
        setFilterShow(!filterShow)
    }

    return(
        <>
            <div className="flex flex-rows">
                <div className={`${filterShow ? `block` : `hidden`} flex flex-col border-r-2 p-4 fixed inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[36%] pb-10 overflow-y-auto`}>
                    <div  className="flex justify-between pb-4">
                        <button className="underline text-xl" onClick={handleShowFilter}>Réintialiser</button>
                        <button className="underline text-xl" onClick={handleShowFilter}>Fermer</button>
                    </div>
                    <div  className={`flex flex-col lg:flex-row justify-between`}>
                        <div className="flex flex-col">
                            <div className="font-bold pb-2 text-2xl text-black">Prix min €</div>
                            <input
                                className={`px-4 border rounded-full border-black bg-[#EDE5E0] text-black placeholder-[#443021] p-4`}
                                type="search"
                                placeholder=". . . €"
                                onChange={handlePriceFilterMin}
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold pb-2 text-2xl text-black">Prix max €</div>
                            <input
                                className={`px-4 border rounded-full border-black bg-[#EDE5E0] text-black placeholder-[#443021] p-4`}
                                type="search"
                                placeholder=". . . €"
                                onChange={handlePriceFilterMax}
                            />
                        </div>
                    </div>
                    <div id={"filtres"} className="flex flex-col gap-6 relative leading-6">
                        <Filters categories={material} name={"Matériaux"}  />
                        <Filters categories={stock} name={"Stock"} />
                        <Filters categories={product} name={"Produit"} />
                    </div>
                </div>
                <div className={`${filterShow ? `hidden md:pl-[36%] md:block mx-auto w-full ` : `block mx-auto w-full`} gap-4 flex flex-col justify-center mx-6 mt-20 pb-10 px-6  lg:mt-8`}>
                    <div  className="text-center text-3xl text-black font-bold pb-6">
                        Recherche
                    </div>
                    <div className="flex justify-center gap-4">
                        <div className="flex justify-center gap-4 ">
                            <AdjustmentsVerticalIcon onClick={handleShowFilter}
                                                     className=" h-10 w-10 color-[#615043]"
                            />
                            <div className="text-xl flex-none text-center">Filtrer</div>
                            <div className="flex-1">
                                <input
                                    className={`pl-6 pr-[35%] border border-gray-500 bg-transparent text-black placeholder-[#443021] py-2`}
                                    type="search"
                                    placeholder="Rechercher"
                                    onChange={handleLeSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-3xl font-bold text-black mt-5">
                        Résultat
                    </div>
                    <div className="text-center flex justify-center gap-2 mt-5">
                        <FunnelIcon className="flex-none h-10 w-10 color-[#615043]" />
                        Trier par : (asc)
                    </div>
                    <div className="flex flex-col items-center">
                        <div className={`${filterShow ? `lg:grid-cols-2` : `lg:grid-cols-3`} w-5/6 grid gap-8 grid-cols-1 md:grid-cols-2 mb-20 mt-10`}>
                            {
                                data.filter(val => val.name.includes(search) && (val.price >= filterPriceMin && val.price <= filterPriceMax)).map((val) => (
                                    <Product
                                        key={val.id}
                                        alt="test"
                                        image={val.image}
                                        productName={val.name}
                                        productPrice={val.price}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <FooterMenu position="relative"/>
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
        image: "/images/chair.png",
        material: "acier",
        stock: true,
        product: "chaise"
    }
    ,
    {
        id: 1,
        name: "Chaise 2",
        price: 456,
        image: "/images/chair.png",
        material: "metal",
        stock: true,
        product: "chaise"
    },
    {
        id: 2,
        name: "Chaise 3",
        price: 789,
        image: "/images/chair.png",
        material: "verre",
        stock: false,
        product: "canape"
    },
    {
        id: 3,
        name: "Chaise 4",
        price: 987,
        image: "/images/chair.png",
        material: "cuivre",
        stock: true,
        product: "canape"
    },
    {
        id: 4,
        name: "Terra",
        price: 654,
        image: "/images/chair.png",
        material: "cuivre",
        stock: false,
        product: "canape"
    },
    {
        id: 5,
        name: "Cs.go",
        price: 123,
        image: "/images/chair.png",
        material: "acier",
        stock: false,
        product: "chaise"
    },
    {
        id: 6,
        name: "Laink",
        price: 123,
        image: "/images/chair.png",
        material: "plastique",
        stock: false,
        product: "table"
    },
    {
        id: 7,
        name: "Alde",
        price: 123,
        image: "/images/chair.png",
        material: "plastique",
        stock: false,
        product: "table"
    },
    {
        id: 8,
        name: "Chaise",
        price: 123,
        image: "/images/chair.png",
        material: "bois",
        stock: true,
        product: "table"
    },
    {
        id: 9,
        name: "Sheesh",
        price: 123,
        image: "/images/chair.png",
        material: "acier",
        stock: true,
        product: "lit"
    },
    {
        id: 10,
        name: "Chaise",
        price: 123,
        image: "/images/chair.png",
        material: "bois",
        stock: true,
        product: "lit"
    },
    {
        id: 11,
        name: "legend",
        price: 123,
        image: "/images/chair.png",
        material: "metal",
        stock: true,
        product: "lit"
    },
]
export default SearchPage


