import Categories from "@/components/home/Categories"

const allCategories = () => {
    const categories = [
        "Chambre",
        "Salle à manger",
        "Salon",
        "Salle de bain",
    ]

    return (
        <>
            <h1
                className="flex justify-center font-bold tracking-wide text-xl my-10 uppercase"
            >
                Toutes nos catégories
            </h1>
            <div className="flex flex-wrap justify-center gap-10">
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
        </>
    )
}

export default allCategories