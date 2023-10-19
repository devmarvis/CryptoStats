import { Link } from "react-router-dom"
import Cryptocurrencies from "../components/Cryptocurrencies"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

const Cryptos = () => {

  return (
    <section className="w-full">
        <Link to=".." className="mb-4 text-[20px] p-2 inline-block">
            <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <Cryptocurrencies />
    </section>
  )
}
export default Cryptos