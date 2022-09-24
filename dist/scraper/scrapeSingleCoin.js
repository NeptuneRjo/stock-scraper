"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeSingleCoin = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const scrapeSingleCoin = async (url) => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(`https://coinmarketcap.com/currencies/${url}/`);
    const image = await page.$eval('.gpRPnR > img:nth-child(1)', async (image) => {
        return image.src;
    });
    const link = await page.$eval('div.sc-10up5z1-1:nth-child(1) > ul:nth-child(3) > li:nth-child(1) > a:nth-child(1)', async (link) => {
        return link.href;
    });
    const rank = await page.$eval('.namePillPrimary', async (rank) => {
        return rank.innerText;
    });
    const nameAndSymbol = await page.$eval('h2.sc-1q9q90x-0:nth-child(2)', async (name) => {
        return name.innerText.split('\n');
    });
    const currentPrice = await page.$eval('.priceValue > span:nth-child(1)', async (price) => {
        return price.innerText;
    });
    const priceChange = await page.$eval('span.sc-15yy2pl-0:nth-child(2)', async (price) => {
        return price.innerText;
    });
    const cap = await page.$eval('div.statsBlock:nth-child(1) > div:nth-child(1) > div:nth-child(2)', async (cap) => {
        return cap.innerText.split('\n');
    });
    const dilutedCap = await page.$eval('div.statsBlock:nth-child(2) > div:nth-child(1) > div:nth-child(2)', async (cap) => {
        return cap.innerText.split('\n');
    });
    const volume = await page.$eval('div.statsBlock:nth-child(3) > div:nth-child(1) > div:nth-child(2)', async (volume) => {
        return volume.innerText.split('\n');
    });
    const circulatingSupply = await page.$eval('.inUVOz > div:nth-child(1)', async (supply) => {
        return supply.innerText;
    });
    const maxSupply = await page.$eval('.dwCYJB > div:nth-child(2)', async (supply) => {
        return supply.innerText;
    });
    const totalSupply = await page.$eval('.hWTiuI > div:nth-child(2)', async (supply) => {
        return supply.innerText;
    });
    const description = await page.$eval('div.sc-2qtjgt-0.eApVPN div', async (description) => {
        return description.innerHTML;
    });
    const coin = {
        image,
        link,
        coin: {
            name: nameAndSymbol[0],
            symbol: nameAndSymbol[1],
        },
        price: {
            currentPrice,
            priceChange,
        },
        stats: {
            cap: { price: cap[0], change: cap[1] },
            dilutedCap: { price: dilutedCap[0], change: dilutedCap[1] },
            volume: { price: volume[0], change: volume[1] },
        },
        supply: {
            circulating: circulatingSupply,
            max: maxSupply,
            total: totalSupply,
        },
        rank,
        description,
    };
    await browser.close();
    return coin;
};
exports.scrapeSingleCoin = scrapeSingleCoin;
