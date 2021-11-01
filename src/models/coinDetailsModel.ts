
export interface CoinDetailsModelObj {
     readonly id: string,
     readonly symbol: string,
     readonly name: string,
     readonly total_supply: string,
     readonly rank: number
     readonly quotes: any
}

export default class CoinDetailsModel {
    
    constructor(
        public readonly id: string,
        public readonly symbol: string,
        public readonly name: string ,
        public readonly price: number,
        public readonly rank: number,
        public readonly marketCap: number,
        public readonly change: number,
    ){ }

    public static createFromObj(obj: CoinDetailsModelObj): CoinDetailsModel{
        return new CoinDetailsModel(
            obj.id, 
            obj.symbol, 
            obj.name, 
            obj.quotes.USD.price, 
            obj.rank, 
            obj.quotes.USD.market_cap,
            obj.quotes.USD.percent_change_24h,
            )
    }

    public static createFromJson(json: any): CoinDetailsModel{
        return new CoinDetailsModel(json.id,json.symbol, json.name, json.price, json.rank, json.marketCap,json.change)
    }
   
    public updateCoinDetails(newPrice: number, newRank: number, newMarketCap: number, newChange: number): CoinDetailsModel{
        return new CoinDetailsModel(this.id, this.symbol, this.name, newPrice, newRank, newMarketCap, newChange)
    }

    public convertPrices(price: number): CoinDetailsModel {
        return new CoinDetailsModel(this.id, this.symbol, this.name, this.price * price, this.rank, this.marketCap, this.change)
    }

}