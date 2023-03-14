import {NavLink} from "@/components/utils/NavLink"

export const Section = (props) => {
    const {name} = props

    return (
        <NavLink href={`/admin/${name}`} className="py-2 px-4 rounded hover:bg-gray-200">
            {name}
        </NavLink>
    )
}