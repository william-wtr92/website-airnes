import Categories from "@/components/home/Categories"

const allCategories = () => {
    const categories = [
        {
            id: 0,
            name: "Salle de bain"
        },
        {
            id: 1,
            name: "Chambre"
        },
        {
            id: 2,
            name: "Salle à manger"
        },
        {
            id: 3,
            name: "Véranda"
        },
        {
            id: 3,
            name: "Salon"
        },
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
                        (category) => (
                            <Categories
                                key={category.id}
                                id={category.id}
                                catName={category.name}
                            />
                        )
                    )
                }
            </div>
        </>
    )
}

export default allCategories