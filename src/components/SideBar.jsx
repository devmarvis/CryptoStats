
import { faCoins, faHome, faNewspaper } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink } from "react-router-dom"

const SideBar = () => {

    const handleActiveLink = ({ isActive }) => {
        return {
            fontWeight: isActive ? "bold" : "",
            fontSize: isActive ? "18px" : "",
        }
    }


  return (
    <div className="absolute top-0 left-0 -translate-x-full md:translate-x-0 w-full md:w-auto md:relative col-span-1 bg-primary h-screen text-whitish p-7 pl-5">
        <div className="font-logo font-extrabold text-2xl mb-5 p-2 cursor-default">
            <h3>CryptoStats</h3>
        </div>
        <nav className="">
            <ul className="flex flex-col gap-1">
                <NavLink
                to="/" 
                style={handleActiveLink}
                className="flex gap-2 items-center p-2">
                    <FontAwesomeIcon icon={faHome}/>
                    <span>Home</span>
                </NavLink>
                <NavLink
                to="cryptocurrencies" 
                style={handleActiveLink}
                className="flex gap-2 items-center p-2">
                    <FontAwesomeIcon icon={faCoins}/>
                    <span>Cryptocurrencies</span>
                </NavLink>
                <NavLink
                to="news" 
                style={handleActiveLink}
                className="flex gap-2 items-center p-2">
                    <FontAwesomeIcon icon={faNewspaper}/>
                    <span>News</span>
                </NavLink>
            </ul>
        </nav>
    </div>
  )
}
export default SideBar