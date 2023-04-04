import Categories from "@/components/app/content/Categories"

const allCategories = () => {
  return (
    <>
      <h1 className="flex justify-center font-bold tracking-wide text-xl my-10 uppercase">
        Toutes nos catégories
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        <Categories />
      </div>
    </>
  )
}

export default allCategories
