const Categories = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-10 text-[#EDE4E0] text-4xl font-bold lg:gap-16 lg:flex-row">
      <div className="lg:hover:scale-105">
        <p className="flex justify-center relative top-40">CATEGORIE</p>
        <img
          src="/images/categories.png"
          alt="cat1"
          className="object-cover h-64 w-80"
        />
      </div>
      <div className="lg:hover:scale-105">
        <p className="flex justify-center relative top-40">CATEGORIE</p>
        <img
          src="/images/categories.png"
          alt="cat2"
          className="object-cover h-64 w-80"
        />
      </div>
      <div className="lg:hover:scale-105">
        <p className="flex justify-center relative top-40">CATEGORIE</p>
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
