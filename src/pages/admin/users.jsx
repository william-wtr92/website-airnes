import NavMenuAdmin from "@/components/home/NavMenuAdmin"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

const UsersView = () => {
  return (
    <>
      <div>
        <div className="flex justify-center w-5/6 absolute top-[12%] left-[15%]">
          <MagnifyingGlassIcon className="h-6 absolute left-[35%] top-[30%]" />
          <input
            type="search"
            className="py-4 pl-12 pr-40 rounded-md border-2 border-black focus:outline-none"
          />
        </div>
      </div>
      <NavMenuAdmin />
    </>
  )
}

export default UsersView
