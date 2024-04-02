import { CoinPriceData } from "./types";

export class CointrakStore {
  private static CointrakStoreInstance: CointrakStore;
  private CoinTrakMemDB: Map<string, CoinPriceData[]> = new Map();

  private constructor() {
    this.CoinTrakMemDB = new Map();
  }

  public static getInstance(): CointrakStore {
    if (!CointrakStore.CointrakStoreInstance) {
      CointrakStore.CointrakStoreInstance = new CointrakStore();
    }
    return CointrakStore.CointrakStoreInstance;
  }

  public storePrice(
    coinid: string,
    fiatid: string,
    price: number,
    timescale: string,
    timestamp: number
  ): void {
    const newCoinPriceData: CoinPriceData = {
      coinid,
      fiatid,
      price,
      timescale,
      timestamp,
    };
    const mappedCoin = this.CoinTrakMemDB.get(coinid) || null;

    if (!mappedCoin) {
      this.CoinTrakMemDB.set(coinid, [newCoinPriceData]);
      return;
    }

    this.CoinTrakMemDB.set(coinid, [...mappedCoin, newCoinPriceData]);
  }

  public getPrice(coinid: string, span: number): CoinPriceData[] | undefined {
    const priceHistory = this.CoinTrakMemDB.get(coinid);
    return priceHistory?.filter(
      (p) => p.timestamp > Date.now() - span * 60 * 1000
    );
  }
}
