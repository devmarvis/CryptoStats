import millify from "millify";
import { Line } from "react-chartjs-2"
import { Chart } from "chart.js/auto";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for(let i = 0; i < coinHistory?.data?.data?.history.length; i += 1){
    coinPrice.push(coinHistory?.data?.data?.history[i].price);
    coinTimestamp.push(new Date(coinHistory?.data?.data?.history[i]?.timestamp * 1000).toLocaleDateString());//making the date more readable
  }

  //setting the data object for the line chart
  const data = {
    labels: coinTimestamp,//like the xAxes label of the chart, has to be an Array
    datasets: [
      {
        label: "Price in USD",//like the heading/title of the chart
        data: coinPrice,//like the yAxes label of the chart, also an Array.
        fill: false,
        backgroundColor: '#0071bd',//the background color of the chart
        borderColor: "#0071bd",//the border color of the line
      }
    ]
  }

  //setting the scaling format of the chart
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  return (
    <>
    <div>
      <header className="flex justify-between my-2">
        <h3 className=" font-heading md:text-[20px] text-primary font-semibold">{coinName} Price Chart</h3>
        <div className="flex flex-col md:flex-row items-end gap-2 md:gap-4 text-sm font-bold">
          <span>{coinHistory?.data?.data?.change}%</span>
          <span className="text-right">Current {coinName} Price: $ {millify(currentPrice)}</span>
        </div>
      </header>
    </div>
      <Line data={data} options={options} />
    </>
  )
}
export default LineChart;