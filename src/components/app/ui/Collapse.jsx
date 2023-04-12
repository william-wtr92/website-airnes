import { useState } from "react"
import { NavLink } from "@/components/utils/NavLink"

export const Collapse = (props) => {
  const [isCollapsed, setCollapse] = useState(false)
  const { title, content } = props

  const handleCollapse = () => {
    setCollapse(!isCollapsed)
  }

  return (
    <div>
      <div
        onClick={handleCollapse}
        className="hover:scale-105 hover:cursor-pointer hover:text-[#6f5e3f]"
      >
        {title}
      </div>
      <div className={isCollapsed ? "block" : "hidden"}>
        <ul>
          {content.map((list) => (
            <li className="indent-4" key={list.id}>
              <NavLink href={`/categories/${list.id}/category`}>
                <p className="hover:text-[#6f5e3f]">{list.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
