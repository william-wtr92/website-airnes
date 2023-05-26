
const Filters = (props) => {
    const {
        data,
        name,
        handleClick,
        query
    } = props

    return (
        <section
            className="filters"
            aria-labelledby="filters-header">
            <header id="filters-header" className="pb-6 font-bold text-black text-xl">
                {name}
            </header>

            <ul className="container overflow-y-scroll w-full h-52">
                {data.map(val => (
                    <li key={val.id}>
                        <label className="text-black font-bold text-md flex content-center gap-4 text-xl pb-4 pl-4">
                            <input
                                type="radio"
                                className="border border-black w-[25px] h-[25px]"
                                value={val.id}
                                name={name}
                                onClick={(e) => handleClick(e.target.value, query)}
                            />
                            {val.name}
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Filters