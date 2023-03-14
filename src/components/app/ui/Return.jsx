import {ArrowLeftCircleIcon} from "@heroicons/react/24/outline"
import {NavLink} from "@/components/utils/NavLink"

const Return = (props) => {
    const {name, back} = props

    return (
        <NavLink href={back}>
            <div className="flex flex-row gap-5">
                <ArrowLeftCircleIcon className="h-6 w-6"/>
                <div>Back to {name}</div>
            </div>
        </NavLink>
    )
}

export default Return