import { GetPrice } from "../controllers";
import { CointrakStore } from "../cointrak.store";

describe("GetPrice", () => {
  beforeAll(async () => {
    const COINIDS = ["bitcoin", "ethereum", "dogecoin"];
    const FIATID = ["eur"];
    const FAKEPRICES = [150, 200, 300, 800];

    const storePrices: {
      coinid: string;
      fiatid: string;
      price: number;
      timescale: string;
      timestamp: number;
    }[] = FAKEPRICES.flatMap((price) =>
      COINIDS.flatMap((coinid) =>
        FIATID.map((fiatid) => ({
          coinid,
          fiatid,
          price,
          timescale: "minute",
          timestamp: Date.now(),
        }))
      )
    );

    for (const price of storePrices) {
      CointrakStore.getInstance().storePrice(
        price.coinid,
        price.fiatid,
        price.price,
        price.timescale,
        price.timestamp
      );
    }
  });
  it("returns values", () => {
    const res = GetPrice("bitcoin", 60);
    console.log(CointrakStore.getInstance().getPrice("bitcoin", 60));

    expect(res.latest).toBe(800);
    expect(res.average).toBe(362.5);
    expect(res.history.length).toBe(4);
  });

  it("throw err on not existing coin", () => {
    expect(() => {
      GetPrice("beeeetcoin", 12);
    }).toThrow();
  });

  it("throw err on negative span", () => {
    expect(() => {
      GetPrice("bitcoin", -12);
    }).toThrow();
  });
});
