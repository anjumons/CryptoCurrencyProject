import React from "react";
import CurrencyType from "../enums/currencyType";
import CoinDetailsModel from "../models/coinDetailsModel";
import DashboardModel from "../models/dashboardModel";
import DashboardServices from "../services/dashboardServices";

export default class DashboardController {
    private readonly dashBoardServices = new DashboardServices()
   
    constructor(
        public readonly dashboardDataSetter: React.Dispatch<React.SetStateAction<DashboardModel>>
    ) { }

    public async getCurrencies(displayCount: number): Promise<void> {
        const newCoins = await this.dashBoardServices.getCurrencies()
        const locallyStoredCoinDetails = localStorage.getItem("coins")
       
        if(locallyStoredCoinDetails !== null ) {
            const storedCoins = JSON.parse(locallyStoredCoinDetails).map((l: any) => CoinDetailsModel.createFromJson(l))
            this.dashboardDataSetter( prev => prev.withCoins(this.updateCoinDetails(storedCoins, newCoins)).withCurrencyType(CurrencyType.USD).withLastUpdated(new Date().toLocaleString()))
        } else {
            localStorage.setItem("coins", JSON.stringify(this.sortAndSliceCoins(newCoins, displayCount)))
            this.dashboardDataSetter( prev =>  
                prev.withCoins(this.sortAndSliceCoins(newCoins, displayCount))
                .withCurrencyType(CurrencyType.USD)
                .withLastUpdated(new Date().toLocaleString()))
        }
    }

    private sortAndSliceCoins(coins: CoinDetailsModel[], count: number): CoinDetailsModel[] {
        return coins.sort((a,b) => b.marketCap - a.marketCap).slice(0,count)
    }

    private  updateCoinDetails(oldCoins: CoinDetailsModel[], updatedCoins: CoinDetailsModel[]): CoinDetailsModel[] {
        const newCoins = oldCoins.map((c:CoinDetailsModel) => {
           const updatedDetails = updatedCoins.find(u => c.id === u.id)
           return  updatedDetails ?
            c .updateCoinDetails(updatedDetails.price, updatedDetails.rank, updatedDetails.marketCap, updatedDetails.change) : c            
        })
        return newCoins
    }

    public async convertPrices(to: string, from: string): Promise<void> {
        const price = await this.dashBoardServices.getPrices(to, from)
        this.dashboardDataSetter(prev => 
            {const coinsWithConvertedPrices = prev.coins.map(c => c.convertPrices(price))
                return prev.withCoins(coinsWithConvertedPrices).withCurrencyType(prev.convertStringToCurrencyType(to))
            })
    }
}
