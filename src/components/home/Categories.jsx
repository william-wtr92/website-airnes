const Categories = (props) => {
    const {catName} = props

    return (
        <div className="h-64 w-80">
            <p className="flex justify-center relative top-1/2 font-bold tracking-widest text-lg">
                {catName}
            </p>
            <img
                src="/images/categories.png"
                alt="cat1"
                className="object-cover"
            />
        </div>
    )
}

export default Categories
