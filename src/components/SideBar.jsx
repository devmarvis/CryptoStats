
import { faCoins, faHome, faNewspaper } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink } from "react-router-dom"

const SideBar = ({ openNav, setOpenNav }) => {

    const handleActiveLink = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "",
            fontSize: isActive ? "18px" : "",
        }
    }


  return (
    <div className={`absolute top-0 left-0 -translate-x-full md:translate-x-0 w-[70vw] max-w-[450px] md:w-auto md:relative col-span-1 bg-primary h-screen text-whitish p-7 pl-5 ${openNav ? "translate-x-0" : ""} transition-transform ease-linear duration-200 overflow-hidden`}>
        <div className="font-logo font-extrabold text-2xl mb-5 p-2 cursor-default">
            <Link onClick={() => setOpenNav(false)}>CryptoStats</Link>
        </div>
        <nav className="w-full">
            <ul className="w-full flex flex-col gap-1">
                <NavLink
                to="/" 
                style={handleActiveLink}
                onClick={() => setOpenNav(false)}
                className="flex gap-2 items-center py-3 ">
                    <FontAwesomeIcon icon={faHome}/>
                    <span>Home</span>
                </NavLink>
                <NavLink
                to="cryptocurrencies" 
                style={handleActiveLink}
                onClick={() => setOpenNav(false)}
                className="flex gap-2 items-center py-3">
                    <FontAwesomeIcon icon={faCoins}/>
                    <span>Cryptocurrencies</span>
                </NavLink>
                <NavLink
                to="news" 
                style={handleActiveLink}
                onClick={() => setOpenNav(false)}
                className="flex gap-2 items-center py-3">
                    <FontAwesomeIcon icon={faNewspaper}/>
                    <span>News</span>
                </NavLink>
            </ul>
        </nav>
    </div>
  )
}
export default SideBar