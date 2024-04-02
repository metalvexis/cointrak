import type { CoinGeckoPriceDataRes } from "./types.ts";
import { CointrakStore } from "./cointrak.store.js";
const COINGECKO_ROOT = "https://api.coingecko.com/api/v3/";
const COINIDS = ["bitcoin", "ethereum", "dogecoin"];
const FIATID = ["eur"];
const PRICE_PRECISION = "10";

const FETCH_INTERVAL = 1000 * 60; // every 1 minute

async function fetchPrices() {
  const requestURI = encodeURI(
    `${COINGECKO_ROOT}simple/price?ids=${COINIDS.join(
      ","
    )}&vs_currencies=${FIATID.join(",")}&precision=${PRICE_PRECISION}`
  );

  console.log("Request: ", requestURI, process.env.COINGECK_APIKEY);

  const coinGeckoPriceReq = await fetch(requestURI, {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECK_APIKEY || "",
    },
  });

  if (coinGeckoPriceReq.status !== 200) {
    console.error(
      `Failed to fetch prices from CoinGecko. Status: ${coinGeckoPriceReq.status}`
    );
    return;
  }

  const coinGeckoPriceData: CoinGeckoPriceDataRes =
    (await coinGeckoPriceReq.json()) as CoinGeckoPriceDataRes;

  console.log(coinGeckoPriceData);

  // Save to database
  COINIDS.map((coinid) => {
    FIATID.map((fiatid) => {
      CointrakStore.getInstance().storePrice(
        coinid,
        fiatid,
        coinGeckoPriceData[coinid][fiatid],
        "minute",
        Date.now()
      );
    });
  });
}

export function startFetchingPrices() {
  fetchPrices();
  setInterval(fetchPrices, FETCH_INTERVAL);
}
