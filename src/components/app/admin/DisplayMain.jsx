import { NavLink } from "@/components/utils/NavLink"
import {
  TrashIcon,
  PlusIcon,
  Bars3Icon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid"
import classNames from "classnames"

const DisplayMain = (props) => {
  const {
    sectionName,
    sectionLink,
    contents,
    onDelete,
    onMove,
    renderContent,
    className,
  } = props

  return (
    <div className={classNames("relative left-[40%]", className)}>
      <div className="flex gap-32">
        <div>
          <h1 className="text-2xl font-bold w-36 whitespace-nowrap">
            Home {sectionName}
          </h1>
        </div>
        <div>
          <ul className="flex flex-col items-start gap-4 mt-2">
            {contents.map((content) => {
              return (
                <li key={content.id} className="flex gap-10 items-center">
                  <Bars3Icon className="h-6" />
                  <p className="truncate w-24">
                    {renderContent === "carousel"
                      ? content.label
                      : content.name}
                  </p>
                  <div className="ml-auto flex gap-6 items-center">
                    <div className="flex flex-row">
                      <ArrowUpIcon
                        className="h-4 hover:cursor-pointer"
                        onClick={() => onMove(content.id, "up")}
                      />
                      <ArrowDownIcon
                        className="h-4 hover:cursor-pointer"
                        onClick={() => onMove(content.id, "down")}
                      />
                    </div>
                    <TrashIcon
                      className="h-6 hover:cursor-pointer"
                      onClick={() => onDelete(content.id)}
                    />
                  </div>
                </li>
              )
            })}
            <li className="flex gap-10 mt-4">
              <NavLink href={`/admin/${sectionLink}/create`}>
                <PlusIcon className="h-6 text-gray-500" />
              </NavLink>
              <p className="font-bold">Add an item</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DisplayMain
