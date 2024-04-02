export class GenericError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message); // call the parent constructor
    this.status = status;
  }
}

/*
Sample Data from CoinGecko API
{
  "bitcoin": {
    "eur": 62471.4869525175
  },
  "dogecoin": {
    "eur": 0.1774367667
  },
  "ethereum": {
    "eur": 3154.8738875917
  }
}
*/
export type CoinGeckoPriceDataRes = {
  [coinid: string]: {
    [fiatid: string]: number;
  };
};

export type CoinTrackStoreData = {
  [coinid: string]: CoinPriceData[];
};

export type CoinPriceData = {
  coinid: string;
  fiatid: string;
  timescale: string;
  timestamp: number;
  price: number;
};

export type GetPriceRequest = {
  coinid: string;
  minutes: number;
};

export type GetPriceResponse = {
  latest: number;
  average: number;
  history: CoinPriceData[];
  count: number;
};
