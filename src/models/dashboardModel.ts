import CurrencyType from "../enums/currencyType";
import CoinDetailsModel from "./coinDetailsModel";

export default class DashboardModel {
   
    constructor(
        public readonly coins: ReadonlyArray<CoinDetailsModel> = [], 
        public readonly currencyType: CurrencyType = CurrencyType.USD,
        public readonly lastUpdated = new Date().toLocaleString()
    ) { }

    public withCoins(val: CoinDetailsModel[]): DashboardModel {
        return new DashboardModel(val, this.currencyType, this.lastUpdated)
    }

    public withCurrencyType(currencyType: CurrencyType): DashboardModel {
        return new DashboardModel(this.coins, currencyType, this.lastUpdated)
    }

    public withLastUpdated(val: string): DashboardModel {
        return new DashboardModel(this.coins, this.currencyType, val)
    }

    public convertStringToCurrencyType(val: string | null): CurrencyType{
        switch(val){
            case 'usd': return CurrencyType.USD
            case 'eur': return CurrencyType.EUR
            default: return CurrencyType.USD
        }
    }
}