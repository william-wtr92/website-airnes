const Categories = () => {
  return (
    <div className="flex gap-16 mt-4 mb-10 justify-center text-[#EDE4E0] text-4xl font-bold">
      <div className="hover:scale-105">
        <p className="relative top-40 left-14">CATEGORIE</p>
        <img
          src="/images/categories.png"
          alt="cat1"
          className="object-cover h-64 w-80"
        />
      </div>
      <div className="hover:scale-105">
        <p className="relative top-40 left-14">CATEGORIE</p>
        <img
          src="/images/categories.png"
          alt="cat2"
          className="object-cover h-64 w-80"
        />
      </div>
      <div className="hover:scale-105">
        <p className="relative top-40 left-14">CATEGORIE</p>
        <img
          src="/images/categories.png"
          alt="cat3"
          className="object-cover h-64 w-80"
        />
      </div>
    </div>
  )
}

export default Categories
