
const Filters = (props) => {
    const {
        categories,
        name,
        onFilterChange,
    } = props

    return (
        <section
            className="filters"
            aria-labelledby="filters-header">
            <header id="filters-header" className="pb-6 font-bold text-black text-xl">
                {name}
            </header>

            <ul>
                {categories.map(category => (
                    <li key={category} >
                        <label className="text-black font-bold text-md flex content-center gap-4 text-xl pb-4 pl-4">
                            <input
                                type="checkbox"
                                onChange={onFilterChange}
                                className="border border-black w-[25px] h-[25px]"
                                value={category}
                            />
                            {category}
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Filters