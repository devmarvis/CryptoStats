import axios from "axios";

const coinHeaders = {
    'X-RapidAPI-Key': 'd221dc7666mshbef1d4dde44e87cp153797jsn5bb14c5d943a',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }

const newsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'd221dc7666mshbef1d4dde44e87cp153797jsn5bb14c5d943a',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

export const getCoins = async (count) => {
    try {
        const res = await axios.get(`https://coinranking1.p.rapidapi.com/coins`, {
            headers: coinHeaders,
            params: {
                limit: count
            }
        })
        return res?.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const getNews = async (count) => {
    try {
        const res = await axios.get(`https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency`, {
            headers: newsHeaders,
            params: {
                safeSearch: 'Off',
                textFormat: 'Raw',
                freshness: 'Day',
                count: count

            }  
        })
        return res
    } catch (error) {
        console.log(error.message);
    }
}

export const getCoin = async(id) => {
    try {
        const res = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${id}`, {
            headers: coinHeaders,
        })
        return res;
    } catch (error) {
        console.log(error.message)
    }
}


export const getCoinHistory = async(id, timePeriod) => {
    try {
        const res = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${id}/history?timePeriod=${timePeriod}`, {
            headers: coinHeaders,
        })
        return res;
    } catch (error) {
        console.log(error.message)
    }
}







