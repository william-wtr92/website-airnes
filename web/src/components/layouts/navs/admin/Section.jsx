import { NavLink } from "@/components/utils/NavLink"

export const Section = (props) => {
  const { name } = props

  return (
    <NavLink
      href={
        name === "homepage" || name === "dashboard"
          ? `/admin/${name}`
          : `/admin/${name}/all`
      }
      className="py-2 px-4 rounded hover:bg-gray-200"
    >
      {name}
    </NavLink>
  )
}
