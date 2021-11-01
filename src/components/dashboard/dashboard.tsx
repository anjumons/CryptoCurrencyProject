import { ChangeEvent, useEffect, useState } from "react"
import DashboardController from "../../controllers/dashboardController"
import CurrencyType from "../../enums/currencyType"
import DashboardModel from "../../models/dashboardModel"
import styles from "./dashboard.module.css"

const Dashboard = () => {
const [model, setModel] = useState<DashboardModel>(new DashboardModel())
const [refreshToggle, setRefreshToggle] = useState(false)
const controller = new DashboardController(setModel)

const COIN_DISPLAY_COUNT = 30

   useEffect(() => {
    controller.getCurrencies(COIN_DISPLAY_COUNT)
   }, [refreshToggle]) 

   useEffect(() => {
    const interval = setInterval(() => {
        setRefreshToggle(!refreshToggle)
      }, 60000);
      return () => clearInterval(interval);
   }, )

   const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
     controller.convertPrices(event.target.value, model.currencyType)
   }

return(
    <>
    <div className = {styles.navBar}>
      <div className = {styles.rightItems}>CryptoCoins</div>
      <div></div>
      <div className = {styles.leftItems}>
        <div className = {styles.buttonContainer}>
          <button className = {styles.refreshButton} onClick = {() => setRefreshToggle(!refreshToggle)}> Refresh </button>
        </div>
        <div> 
          <select className = {styles.select} name="currencies" id="currencies" value = {model.currencyType} onChange = {(ev) => handleCurrencyChange(ev)}>
            <option value={CurrencyType.USD}>USD</option>
            <option value={CurrencyType.EUR}>EUR</option>
          </select>
        </div>
      </div>
    </div>
   <div className = {styles.lastUpdated}> Last Updated : {model.lastUpdated}</div>
    <div className = {styles.tableContainer}>
      <table className = {styles.table}>
        <tr>
          <th className = {styles.th}>#</th>
          <th className = {styles.th}>Symbol</th>
          <th className = {styles.th}>Name</th>
          <th className = {styles.th}>Price</th>
          <th className = {styles.th}>Change(24 hrs)</th>
        </tr>
        {model.coins.map(c => (
          <tr className = {styles.tr}>
          <td className = {styles.td}>{c.rank}</td>
          <td className = {styles.td}>{c.symbol}</td>
          <td className = {styles.td}>{c.name}</td>
          <td className = {styles.td}>{model.currencyType == CurrencyType.USD ? '$' :'€'} {(Math.round(c.price * 100) / 100).toFixed(2)}</td>
          <td className = {styles.td} style = {{color:c.change < 0 ? 'red':'green' }}>{c.change}%</td>
        </tr>
        ))}
      </table>
    </div>
</>
)}

export default Dashboard