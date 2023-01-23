import { NavLink } from "./NavLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faLinkedin,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons"

const FooterMenu = () => {
  return (
    <footer>
      <div className="flex bg-[#ffffff] text-[#615043] h-14 border-t-2 border-[#615043] shadow-2xl relative bottom-0 w-full">
        <div className="flex ml-10 items-center gap-10 font-semibold">
          <NavLink href="/">
            <div className="hover:text-[#b3825c] hover:scale-110">CGU</div>
          </NavLink>
          <NavLink href="/">
            <div className="hover:text-[#b3825c] hover:scale-110">
              Mentions légales
            </div>
          </NavLink>
          <NavLink href="/">
            <div className="hover:text-[#b3825c] hover:scale-110">Contact</div>
          </NavLink>
        </div>

        <div className="flex items-center ml-auto mr-16 gap-10">
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
