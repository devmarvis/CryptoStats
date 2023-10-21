import { Link } from "react-router-dom"
import News from "../components/News"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import Footer from "../components/Footer"

const CryptoNews = () => {

  return (
    <>
    <section className="w-full min-h-screen pt-3 md:pt-10 p-10 px-6 md:px-10">
        <Link to=".." className="mb-4 text-[20px] p-2 inline-block">
            <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <News />
    </section>
    <Footer />
    </>
  )
}
export default CryptoNews