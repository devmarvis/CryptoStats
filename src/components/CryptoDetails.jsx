import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { getCoin } from "../services/api";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faDollar, faHashtag, faTrophy } from "@fortawesome/free-solid-svg-icons";
import millify from "millify";

const CryptoDetails = () => {
  const [timePeriod, setTimePeriod] = useState("");
  const { uuid } = useParams();
  console.log(uuid);

  const {data: coin, isFetching, isLoading, isError, error } = useQuery(['coin', uuid], {
    queryFn: () => getCoin(uuid),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  if(isLoading){
    return <h2>Loading...</h2>
  }
  if(isError){
    return <h2>Error: {error.message}</h2>
  }

  const coinDetails = coin?.data?.data?.coin;
  console.log(coinDetails);

  const time = ['3h', '24h', '7d', '30d', '3m', '1y']

  const stats = [
    {title: "Price to USD", icon: <FontAwesomeIcon icon={faDollar} />, value: `$ ${millify(coinDetails?.price)}`},
    {title: "Rank", icon: <FontAwesomeIcon icon={faHashtag} />, value: coinDetails?.rank},
    {title: "24h Volume", icon: <FontAwesomeIcon icon={faBolt} />, value: `$ ${millify(coinDetails['24hVolume'])}`},
    {title: "Market Cap", icon: <FontAwesomeIcon icon={faDollar} />,  value: `$ ${millify(coinDetails?.marketCap)}`},
    {title: "All-time-high(daily avg.)", icon: <FontAwesomeIcon icon={faTrophy} />, value: `$ ${millify(coinDetails?.allTimeHigh.price)}`},
  ]

  return (
    <section className="w-full font-text">
      <h3 className=" font-heading text-[22px] font-bold text-primary mb-3 text-center ">{coinDetails.name} Price</h3>
      <p className="text-center ">{coinDetails.name} live price is US dollar. View value statistics, market cap and supply.</p>
      <select 
      name="time-period" 
      id="time-period" 
      defaultValue="7d" 
      value={timePeriod}
      onChange={(e) => setTimePeriod(e.target.value)}
      className="mt-7 p-2 px-3 font-sans bg-[#F5F7F8]">
        {
          time.map(tm => (
            <option value={tm}>{tm}</option>
          ))
        }
      </select>
      {/**Line chart should go in here */}
      <div className="text-center mt-7">
        <h4 className=" font-heading text-lg font-semibold">{coinDetails.name} value statistics</h4>
        <p>An overview showing the stats of {coinDetails.name}</p>
        <div className="max-w-[336px] mx-auto text-left mt-3">
          {
            stats.map(stat => (
              <div className="p-4 flex justify-between border-b border-b-gray-300 hover:bg-[#F5F7F8] cursor-default">
                <div>{stat.icon} <span className="ml-1 text-gray-900">{stat.title}</span></div>
                <p className=" font-semibold">{stat?.value}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
export default CryptoDetails