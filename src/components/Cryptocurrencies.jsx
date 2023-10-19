import { useQuery } from "react-query";
import { getCoins } from "../services/api";
import millify from "millify";
import { useState } from "react";
import { Link } from "react-router-dom";

const CryptoCard = ({rank, name, price, marketCap, url, change, uuid}) => {

  return (
        <Link to={`cryptocurrencies/${uuid}`}>
            <div className="shadow">
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
    const [currentPage, setCurrentPage] = useState(0);
    const cryptoPerPage = 15;
    const count = simplified ? "10" : "50";
    const {data: coins, isLoading, isError, error} = useQuery('cryptocurrencies', {
        queryFn: () => getCoins(count),
        refetchOnWindowFocus: false,
    })

    if(isLoading){
        return <h4>Loading Cyptocurrencies...</h4>
    }

    if(isError){
        return <h4>Error: {error.message}</h4>
    }

    const pageCount = Math.ceil(count / cryptoPerPage);
    const cryptos = simplified ? coins?.data.coins : coins?.data.coins.slice(currentPage * cryptoPerPage, cryptoPerPage * (currentPage + 1));
    // console.log(cryptos);
    console.log(pageCount)

    function handleNext(){
        setCurrentPage(prev => prev + 1)
    }

    function handlePrev(){
        setCurrentPage(prev => prev - 1)
    }


    return (
        <div className="w-full flex flex-col gap-5">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                {
                    cryptos.map((coin) => {
                        return (
                            <CryptoCard key={coin.uuid} uuid={coin.uuid} rank={coin.rank} name={coin.name} price={coin.price} marketCap={coin.marketCap} url={coin.iconUrl} change={coin.change} />
                        )
                    })
                }
            </div>
            {!simplified && (
                <div className=" self-end inline-flex gap-2">
                    <button 
                    disabled={currentPage == 0}
                    onClick={handlePrev}
                    className="p-2 px-4 border-2 border-primary disabled:border-grayish/[0.7] disabled:bg-grayish/[0.7]"
                    >Prev</button>
                    <button 
                    disabled={currentPage + 1 == pageCount}
                    onClick={handleNext}
                    className="p-2 px-4 border-2 border-primary disabled:border-grayish/[0.7] disabled:bg-grayish/[0.7]"
                    >Next</button>
                </div>
            )}
        </div>
    )
}

export default Cryptocurrencies