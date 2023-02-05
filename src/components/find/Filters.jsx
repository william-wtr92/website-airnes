const Filters = (props) => {
    const {
        categories,
        onFilterChange,
        name,
    } = props

    return (
        <section
            className="filters"
            aria-labelledby="filters-header">
            <header id="filters-header" className="pb-3 font-bold">
                {name}
            </header>

            <ul>
                {categories.map(category => (
                    <li key={category} >
                        <label className="text-black font-bold text-md flex gap-2">
                            <input
                                onChange={onFilterChange}
                                type="checkbox"
                                value={category} />
                            {category}
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Filters