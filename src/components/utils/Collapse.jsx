import {useState} from "react"
import {NavLink} from "@/components/utils/NavLink"

export const Collapse = (props) => {
    const [isCollapsed, setCollapse] = useState(false)
    const {title, content} = props

    const handleCollapse = () => {
        setCollapse(!isCollapsed)
    }

    return (
        <div>
            <div onClick={handleCollapse}>{title}</div>
            <div className={isCollapsed ? "block" : "hidden"}>
                <ul>
                    {
                        content.map(
                            (list, index) => (
                                <li className="indent-4" key={index}>
                                    <NavLink href={"/products/`${id}`/product"}>
                                        {list.name}
                                    </NavLink>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}