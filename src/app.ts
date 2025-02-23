import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

(async() => {
  await main();
})();

async function main(){
  const { b:base, d:destination, l:limit, n:name, s:showTable } = yarg;

  ServerApp.run({
    base,
    destination,
    limit,
    name,
    showTable
  });
}
