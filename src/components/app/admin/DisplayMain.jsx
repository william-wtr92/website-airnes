import { NavLink } from "@/components/utils/NavLink"
import {
  TrashIcon,
  PlusIcon,
  Bars3Icon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid"

const DisplayMain = (props) => {
  const { sectionName, sectionLink, contents, onDelete, onMove } = props

  return (
    <div className="relative left-[40%]">
      <div className="flex gap-32">
        <div>
          <h1 className="text-2xl font-bold">Home {sectionName}</h1>
        </div>
        <div>
          <ul className="flex flex-col gap-4">
            {contents.map((content) => {
              return (
                <li key={content.id} className="flex gap-10 items-center">
                  <Bars3Icon className="h-6" />
                  <p className="truncate w-24">{content.label}</p>
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
            <li className="flex gap-10 mt-4 items-center">
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
