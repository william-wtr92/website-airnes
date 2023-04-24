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

  const path =
    renderContent === "category" || renderContent === "products"
      ? "/add"
      : "/create"

  return (
    <div
      className={classNames(
        "flex flex-col lg:relative lg:left-1/4 w-full px-8",
        className
      )}
    >
      <div className="flex flex-col gap-6 lg:gap-32 lg:flex-row">
        <div>
          <h1 className="text-2xl font-bold w-full lg:w-36 whitespace-nowrap mb-4">
            Home {sectionName}
          </h1>
        </div>
        <div className="w-full lg:w-auto">
          <ul className="flex flex-col items-start gap-4">
            {contents.map((content) => {
              return (
                <li key={content.id} className="flex gap-6 items-center">
                  <Bars3Icon className="h-6" />
                  <p className="truncate w-24">
                    {renderContent === "carousel"
                      ? content.label
                      : content.user.name}
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
            <li className="flex gap-6 mt-4 items-center">
              <NavLink href={`/admin/${sectionLink}${path}`}>
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
