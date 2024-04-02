import { GetPriceResponse } from "./types";
import { CointrakStore } from "./cointrak.store";
import { GenericError } from "./types";

export function GetPrice(coinid: string, minutes: number): GetPriceResponse {
  const coinPriceHistory = CointrakStore.getInstance().getPrice(
    coinid,
    minutes || 60
  );

  if (!coinPriceHistory || coinPriceHistory.length === 0) {
    throw new GenericError(400, "Coin not found");
  }

  const getPriceRes: GetPriceResponse = {
    latest: coinPriceHistory[coinPriceHistory.length - 1].price,
    average:
      coinPriceHistory.reduce((acc, curr) => acc + curr.price, 0) /
      coinPriceHistory.length,
    history: coinPriceHistory,
    count: coinPriceHistory.length,
  };

  return getPriceRes;
}
