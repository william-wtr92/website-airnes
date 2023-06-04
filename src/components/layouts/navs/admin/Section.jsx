import { NavLink } from "@/components/utils/NavLink"

export const Section = (props) => {
  const { section, router, handleBurgerMenu } = props

  return (
    <NavLink
      key={section.name}
      href={
        section.name === "dashboard" || section.name === "homepage"
          ? `/admin/${section.name}`
          : `/admin/${section.name}/all`
      }
      onClick={handleBurgerMenu}
    >
      <div
        className={`p-2 flex flex-row gap-4 hover:scale-105 ${
          router.pathname.startsWith(`/admin/${section.name}`)
            ? "bg-gray-300"
            : ""
        }`}
      >
        <section.icon className="h-6 w-6" />
        <div>{section.name}</div>
      </div>
    </NavLink>
  )
}
