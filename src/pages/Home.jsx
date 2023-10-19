import { useQuery } from "react-query";
import { getCoins } from "../services/api";
import millify from "millify";
import { Link } from "react-router-dom";
import Cryptocurrencies from "../components/Cryptocurrencies";
import News from "../components/News";


const Home = () => {
    const { data, isLoading, isError, error } = useQuery('stats', {
        queryFn: () => getCoins(),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    if(isLoading){
        return <h1>Loading Stats...</h1>
    }

    if(isError){
      return <h1>Error: {error.message}</h1>
    }

    const stats = data?.data.stats;


  return (
    <section className="w-full">
      <h3 className="font-heading text-xl font-medium mb-4">Global Crypto Stats</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-7">{/**Stats */}
        <article>
          <h4 className=" text-grayish mb-[2px]">Total Crytocurrencies</h4>
          <p>{millify(stats.totalCoins)}</p>
        </article>
        <article>
          <h4 className=" text-grayish mb-[2px]">Total Exchanges</h4>
          <p>{millify(stats.totalExchanges)}</p>
        </article>
        <article>
          <h4 className=" text-grayish mb-[2px]">Total Market Cap</h4>
          <p>${millify(stats.totalMarketCap)}</p>
        </article>
        <article>
          <h4 className=" text-grayish mb-[2px]">Total 24h Volume</h4>
          <p>${millify(stats.total24hVolume)}</p>
        </article>
        <article>
          <h4 className=" text-grayish mb-[2px]">Total Markets</h4>
          <p>{millify(stats.totalMarkets)}</p>
        </article>
      </div>
      <header className="w-full flex justify-between font-heading font-medium mb-4">
        <h3 className="md:text-xl capitalize">Top 10 Cryptos in the Word</h3>
        <Link 
        to="cryptocurrencies" 
        className=" text-primary font-semibold">Show more</Link>
      </header>
      <Cryptocurrencies simplified />
      <header className="w-full text-base flex justify-between font-heading font-medium mt-10 mb-4">
        <h3 className="md:text-xl capitalize">Latest Crypto News</h3>
        <Link 
        to="news"
        className=" text-primary font-semibold">Show more</Link>
      </header>
      <News simplified />
    </section>
  )
}
export default Home;