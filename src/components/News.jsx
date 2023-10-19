import { useQuery, } from "react-query"
import { getNews } from "../services/api"
import moment from "moment/moment"
import { useEffect, useState } from "react"


const NewsCard = ({name, url, image, description, provider, datePublished}) => {
    return (
        <div className="p-5 h-[280px] hover:shadow-md bg-[#F5F7F8]">
            <a href={url} target="_blank">
                <header className="flex justify-between gap-1 items-start mb-[6px]">
                    <h4 className="font-heading font-medium line-clamp-3">{name}</h4>
                    <img 
                    src={image?.thumbnail?.contentUrl} 
                    alt="" 
                    className="w-14 h-full" 
                    />
                </header>
                <p className=" line-clamp-2 mb-2">{description}</p>
                <div className="flex justify-between gap-3 ">
                    <div className="flex gap-2 items-center">
                        <img 
                        src={provider[0]?.image?.thumbnail.contentUrl} 
                        alt={provider[0]?.name} 
                        className="w-7 rounded-full"
                        />
                        <span>{provider[0].name}</span>
                    </div>
                    <span>{moment(datePublished).startOf('ss').fromNow()}</span>
                </div>
            </a>
        </div>
    )
}

const News = ({simplified}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const newsPerPage = 15;
    const count = simplified ? "10 ": "50"
    const {data: news, isLoading, isError, error} = useQuery('news', {
        queryFn: () => getNews(count),
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    if(isLoading){
        return <h4>Loading Cyptocurrencies...</h4>
    }

    if(isError){
        return <h4>Error: {error.message}</h4>
    }

    const cryptoNews = simplified ? news?.data.value : news?.data.value.slice(currentPage * newsPerPage, newsPerPage * (currentPage + 1));
    const pageCount = Math.ceil(news?.data?.value.length / newsPerPage);
    // console.log(cryptoNews)

    function handleNext(){
        setCurrentPage(prev => prev + 1)
    }

    function handlePrev(){
        setCurrentPage(prev => prev - 1)
    }

  return (
    <div className="w-full flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                cryptoNews.map((cryptoNew, idx) => {
                    return (
                        <NewsCard key={idx}  {...cryptoNew} />
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
export default News