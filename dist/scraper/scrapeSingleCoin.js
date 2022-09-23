"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeSingleCoin = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const promises_1 = __importDefault(require("fs/promises"));
const scrapeSingleCoin = async (url) => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(`https://coinmarketcap.com/currencies/${url}/`);
    const image = await page.$eval('div.sc-16r8icm-0.gpRPnR.nameHeader img', async (image) => {
        return image.src;
    });
    const rank = await page.$eval('div.namePill.namePillPrimary', async (rank) => {
        return rank.innerText;
    });
    // selector returns a name and symbol, so this splits at \n and
    // returns both in an array
    const name = await page.$eval('h2.sc-1q9q90x-0.jCInrl.h1', async (name) => {
        const fullName = name.innerText;
        const splitName = fullName.split('\n');
        return splitName;
    });
    const coinSymbol = await page.$eval('h2.sc-1q9q90x-0.jCInrl.h1 small.nameSymbol', async (symbol) => {
        return symbol.innerText;
    });
    const currentPrice = await page.$eval('div.priceValue span', async (price) => {
        return price.innerText;
    });
    const priceChange = await page.$eval('span.sc-15yy2pl-0.feeyND', async (price) => {
        return price.innerText;
    });
    // the stats use the same selector so they are mapped as an array
    // market cap -> diluted cap -> volume
    const stats = await page.$$eval('div.statsItemRight div.statsValue', async (marketCap) => {
        return marketCap.map((index) => index.innerText);
    });
    const circulatingSupply = await page.$eval('div.sc-16r8icm-0.inUVOz div.statsValue', async (supply) => {
        return supply.innerText;
    });
    const maxSupply = await page.$eval('div.maxSupplyValue', async (supply) => {
        return supply.innerText;
    });
    const totalSupply = await page.$eval('div.maxSupplyValue', async (supply) => {
        return supply.innerText;
    });
    const description = await page.$eval('div.sc-2qtjgt-0.eApVPN div', async (description) => {
        return description.innerHTML;
    });
    const coin = {
        image,
        coin: {
            name: name[0],
            symbol: name[1],
        },
        price: {
            currentPrice,
            priceChange,
        },
        stats: {
            cap: stats[0],
            dilutedCap: stats[1],
            volume: stats[2],
        },
        supply: {
            circulating: circulatingSupply,
            max: maxSupply,
            total: totalSupply,
        },
        rank,
        description,
    };
    await promises_1.default.writeFile('coin.json', JSON.stringify(coin));
    await browser.close();
};
exports.scrapeSingleCoin = scrapeSingleCoin;
// scrapeSingleCoin('bitcoin')
