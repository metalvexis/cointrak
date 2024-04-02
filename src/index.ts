import koa from "koa";
import koaBody from "koa-body";
import { mwCatchAllError } from "./catch-all-error";
import router from "./routes";
import { startFetchingPrices } from "./cointrak";
import cors from "@koa/cors";
const PORT = process.env.PORT || 3000;

const app = new koa();
app.use(cors());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(
  koaBody({
    jsonLimit: "1kb",
  })
);

app.use(mwCatchAllError);

app.use(router.routes()).use(router.allowedMethods());

console.log(`Server running on port ${PORT}`);
app.listen(PORT);

console.log(`Started fetching prices from CoinGecko`);
startFetchingPrices();
