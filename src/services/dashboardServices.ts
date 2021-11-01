import CoinDetailsModel, { CoinDetailsModelObj } from "../models/coinDetailsModel"

export default class DashboardServices {
   
    public async getCurrencies(): Promise<CoinDetailsModel[]> {
       const response = await fetch("https://api.coinpaprika.com/v1/tickers/") .then((res) => res.json())
       return  response.map((r: CoinDetailsModelObj) => CoinDetailsModel.createFromObj(r)) 
    }

    public async getPrices(to: string, from: string): Promise<number> {
        const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/'+from+'.json') 
        .then((res) => res.json())
        return response[from][to]
    }
}