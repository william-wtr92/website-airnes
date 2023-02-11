import {NavLink} from "@/components/utils/NavLink"

const Categories = (props) => {
    const {catName, id} = props

    return (
        <NavLink href="/category/`${id}`/category">
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
        </NavLink>

    )
}

export default Categories
