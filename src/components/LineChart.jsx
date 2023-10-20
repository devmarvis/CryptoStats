import { Line } from "react-chartjs-2"

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  return (
    <div>
      <header className="flex justify-between">
        <h3>{coinName} Price Chart</h3>
        <div>
          <span>{coinHistory?.data?.data?.change}%</span>
        </div>
      </header>
    </div>
  )
}
export default LineChart;