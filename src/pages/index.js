import Carousel from "@/components/utils/Carousel"
import Categories from "@/components/home/Categories"
import FooterMenu from "@/components/home/FooterMenu"

const Main = () => {
    const categories = [
        "Chambre",
        "Salon",
        "Salle de bain"
    ]

    return (
        <>
            <main>
                <Carousel/>

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
