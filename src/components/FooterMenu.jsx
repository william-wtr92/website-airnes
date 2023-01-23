import { NavLink } from "./NavLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faLinkedin,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons"

const FooterMenu = (props) => {
  return (
    <footer>
      <div
        className={`flex bg-[#ffffff] text-[#615043] h-14 border-t-2 border-[#615043] ${props.position} bottom-0 w-full`}
      >
        <div className="flex ml-2 items-center gap-2 font-semibold lg:ml-10 lg:gap-10">
          <NavLink href="/">
            <div className="text-[12px] hover:text-[#b3825c] hover:scale-110 lg:text-sm">
              CGU
            </div>
          </NavLink>
          <NavLink href="/">
            <div className="text-[12px] hover:text-[#b3825c] hover:scale-110 lg:text-sm">
              Mentions légales
            </div>
          </NavLink>
          <NavLink href="/">
            <div className="text-[12px] hover:text-[#b3825c] hover:scale-110 lg:text-sm">
              Contact
            </div>
          </NavLink>
        </div>

        <div className="flex items-center gap-4 ml-auto mr-5 lg:mr-16 lg:gap-10">
          <NavLink href="/">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="h-6 text-white hover:scale-110"
            />
          </NavLink>
          <NavLink href="/">
            <FontAwesomeIcon
              icon={faInstagram}
              className="h-6 text-white hover:scale-110"
            />
          </NavLink>
          <NavLink href="/">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="h-6 text-white hover:scale-110"
            />
          </NavLink>
        </div>
      </div>
    </footer>
  )
}

export default FooterMenu
