import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { getCoin, getCoinHistory } from "../services/api";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faBolt, faChartLine, faCircleExclamation, faDollar, faHashtag, faTrophy } from "@fortawesome/free-solid-svg-icons";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  const [timePeriod, setTimePeriod] = useState("7d");
  const { uuid } = useParams();
  // console.log(uuid);

  const {data: coin, isLoading, isError, error } = useQuery(['coin', uuid], {
    queryFn: () => getCoin(uuid),
    refetchOnWindowFocus: false,
  })

  const { data: coinHistory, isFetching} = useQuery(['coin', timePeriod], {
    queryFn: () => getCoinHistory(uuid, timePeriod),
    refetchOnWindowFocus: false,
  })


  if(isLoading){
    return <h2>Loading...</h2>
  }
  if(isError){
    return <h2>Error: {error.message}</h2>
  }

  const coinDetails = coin?.data?.data?.coin;
  // console.log(coinDetails);
  // console.log(coinHistory);

  const time = ['3h', '24h', '7d', '30d', '3m', '1y']

  const stats = [
    {title: "Price to USD", icon: <FontAwesomeIcon icon={faDollar} />, value: `$ ${millify(coinDetails?.price)}`},
    {title: "Rank", icon: <FontAwesomeIcon icon={faHashtag} />, value: coinDetails?.rank},
    {title: "24h Volume", icon: <FontAwesomeIcon icon={faBolt} />, value: `$ ${millify(coinDetails['24hVolume'])}`},
    {title: "Market Cap", icon: <FontAwesomeIcon icon={faDollar} />,  value: `$ ${millify(coinDetails?.marketCap)}`},
    {title: "All-time-high(daily avg.)", icon: <FontAwesomeIcon icon={faTrophy} />, value: `$ ${millify(coinDetails?.allTimeHigh.price)}`},
  ]

  const genericStats = [
    {title: "Number of Markets", icon: <FontAwesomeIcon icon={faChartLine} />, value: coinDetails?.numberOfMarkets },
    {title: "Number of Exchanges", icon: <FontAwesomeIcon icon={faArrowsRotate} />, value: coinDetails?.numberOfExchanges },
    {title: "Approved Supply", icon: <FontAwesomeIcon icon={faCircleExclamation} />, value: millify(coinDetails?.supply?.supplyAt) },
    {title: "Total Supply", icon: <FontAwesomeIcon icon={faCircleExclamation} />, value: `$ ${millify(coinDetails?.supply?.total)}`},
    {title: "Circulating Supply", icon: <FontAwesomeIcon icon={faCircleExclamation} />, value: `$ ${millify(coinDetails?.supply?.circulating)}`}
  ]

  return (
    <section className="w-full font-text">
      <h3 className=" font-heading text-[22px] font-bold text-primary mb-3 text-center ">{coinDetails.name} Price</h3>
      <p className="text-center ">{coinDetails.name} live price is US dollar. View value statistics, market cap and supply.</p>
      <select 
      name="time-period" 
      id="time-period" 
      value={timePeriod}
      onChange={(e) => setTimePeriod(e.target.value)}
      className="mt-7 mb-1 p-2 px-3 font-sans bg-[#F5F7F8]">
        {
          time.map(tm => (
            <option key={tm} value={tm}>{tm}</option>
          ))
        }
      </select>
      <LineChart coinHistory={coinHistory} currentPrice={coinDetails?.price} coinName={coinDetails?.name} />
      <div className="mt-7">
        <div className="flex justify-center gap-10 md:gap-14 flex-wrap mt-7">
          <div className="text-left">
            <h4 className=" font-heading text-lg font-semibold">{coinDetails.name} value statistics</h4>
            <p className="text-[15px]">An overview showing the stats of {coinDetails.name}</p>
            <div className="w-full max-w-[340px] mx-auto">
              {
                stats.map(stat => (
                  <div className="p-4 flex justify-between gap-3 border-b border-b-gray-300 hover:bg-[#F5F7F8] cursor-default mt-3">
                    <div>{stat.icon} <span className="ml-1 text-gray-900">{stat.title}</span></div>
                    <p className=" font-semibold">{stat?.value}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="text-left">
            <h4 className=" font-heading text-lg font-semibold">Other statistics</h4>
            <p className="text-[15px]">An overview showing the stats of all cryptocurrencies</p>
            <div className="w-full max-w-[340px] mx-auto">
              {
                genericStats.map(stat => (
                  <div className="p-4 flex justify-between gap-3 border-b border-b-gray-300 hover:bg-[#F5F7F8] cursor-default mt-3">
                    <div>{stat?.icon} <span className="ml-1 text-gray-900">{stat.title}</span></div>
                    <p className=" font-semibold">{stat?.value}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-start mt-10">
        <article className="text-left">
          <h3 className=" text-lg font-heading text-primary font-semibold mb-2">What is {coinDetails?.name}</h3>
          <p className="text-primary font-medium">{HTMLReactParser(coinDetails?.description)}</p>
       </article>
        <article>
          <h3 className=" text-lg font-heading text-primary font-semibold mb-2">{coinDetails?.name} Links</h3>
          <div>
            {
              coinDetails?.links.map((link, idx) => (
                <div key={idx} className="w-full max-w-md flex justify-between p-4 border-b border-b-gray-300 hover:bg-[#F5F7F8] gap-4 cursor-default">
                  <span className=" font-medium">{link.type}</span>
                  <span className=" text-primary font-bold"><a href={link.url} target="_blank" rel="noreferrer">{link.name}</a></span>
                </div>
              ))
            }
          </div>
        </article>
      </div>
    </section>
  )
}
export default CryptoDetails