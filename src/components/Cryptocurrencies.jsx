import { useQuery } from "react-query";
import { getCoins } from "../services/api";
import millify from "millify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const CryptoCard = ({rank, name, price, marketCap, url, change, uuid}) => {

  return (
        <Link to={`/cryptocurrencies/${uuid}`}>
            <div className="hover:shadow-md bg-[#F5F7F8]">
                <header className="flex justify-between items-center p-3 px-4 border-b font-heading     font-medium">
                    <h3>{rank}. {name}</h3>
                    <img 
                    src={url} 
                    alt={name} 
                    className=" w-7 h-7"
                    />
                </header>
                <div className="p-4 py-6 flex flex-col gap-[5px]">
                    <p>Price: ${millify(price)}</p>
                    <p>Market Cap: {millify(marketCap)}</p>
                    <p>Daily Change: {change}%</p>
                </div>
            </div>
        </Link>
  )
}

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? "10" : "50";
    const {data: coins, isLoading, isError, error} = useQuery('cryptocurrencies', {
        queryFn: () => getCoins(count),
        refetchOnWindowFocus: false,
    })
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        window.scrollTo(0,0)
        const filteredData = coins?.data?.coins.filter(coin => coin?.name?.toLowerCase().includes(searchTerm?.toLowerCase()));
        setCryptos(filteredData);
    }, [coins, searchTerm])

    if(isLoading){
        return <h4>Loading Cyptocurrencies...</h4>
    }

    if(isError){
        return <h4>Error: {error.message}</h4>
    }


    return (
        <div className="w-full flex flex-col gap-5">
            {!simplified && <div className="w-full max-w-[260px] mx-auto flex flex-row-reverse items-center bg-[#F5F7F8] shadow-sm rounded overflow-hidden">
                <input 
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text" 
                className="w-full py-[6px] px-[10px] bg-transparent outline-none"
                />
                <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className="p-1 px-2"
                />
            </div>}
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                {
                    cryptos?.map((coin) => {
                        return (
                            <CryptoCard key={coin.uuid} uuid={coin.uuid} rank={coin.rank} name={coin.name} price={coin.price} marketCap={coin.marketCap} url={coin.iconUrl} change={coin.change} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cryptocurrencies