import Router from "koa-router";
import { GetPrice } from "./controllers";
import { GetPriceRequest } from "./types";
const router = new Router();

router.get("/price/:coinid", (ctx, next) => {
  const getPriceReq: GetPriceRequest = {
    coinid: ctx.params.coinid,
    minutes: 60,
  };
  if (ctx.query.minutes) {
    getPriceReq.minutes = parseInt(`${ctx.query.minutes}`);
  }
  const getPriceRes = GetPrice(getPriceReq.coinid, getPriceReq.minutes);
  ctx.body = getPriceRes;
});

export default router;
