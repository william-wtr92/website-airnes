const Filters = (props) => {
  const { data, name, handleClick, query, defaultValue } = props

    const isChecked = (id) => {
        const checkedItem = parseInt(defaultValue, 10)

        return checkedItem === id
    }

  return (
    <section className="filters" aria-labelledby="filters-header">
      <header id="filters-header" className="pb-6 font-bold text-black text-xl">
        {name}
      </header>

      <ul className="container overflow-y-scroll w-full">
        {data.map((val) => (
          <li key={val.id}>
            <label className="text-black text-md flex content-center gap-4 pb-4 pl-4">
              <input
                type="radio"
                className="border border-black h-4 w-4"
                value={val.id}
                name={name}
                onClick={(e) => handleClick(e.target.value, query)}
                checked={isChecked(val.id)}
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
