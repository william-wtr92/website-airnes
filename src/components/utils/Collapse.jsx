import {useState} from "react"
import {NavLink} from "@/components/utils/NavLink"

export const Collapse = (props) => {
    const [collapsed, setCollapse] = useState(true)
    const {title} = props
    const content = [
        {
            name: "Table",
            redirection: ""
        },
        {
            name: "Table",
            redirection: ""
        }
        ,
        {
            name: "Table",
            redirection: ""
        }
        ,
        {
            name: "Table",
            redirection: ""
        }
    ]

    return (
        <div>
            <div>{title}</div>
            <div className={collapsed ? "block" : "hidden"}>
                <ul>
                    {
                        content.map(
                            (list, index) => (
                                <li key={index}>
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