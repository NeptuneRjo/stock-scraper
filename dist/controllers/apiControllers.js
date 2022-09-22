"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_top_fifty_coins = exports.get_all_coins = void 0;
const scrapeAllCoins_1 = require("../scraper/scrapeAllCoins");
const get_all_coins = async (req, res) => {
    (0, scrapeAllCoins_1.scrapeAllCoins)(100)
        .then((coins) => {
        res.status(200).json({ data: coins });
    })
        .catch((err) => {
        res.status(400).json({ error: err });
    });
};
exports.get_all_coins = get_all_coins;
const get_top_fifty_coins = async (req, res) => {
    (0, scrapeAllCoins_1.scrapeAllCoins)(50)
        .then((coins) => {
        res.status(200).json({ data: coins });
    })
        .catch((err) => {
        res.status(400).json({ err: err });
    });
};
exports.get_top_fifty_coins = get_top_fifty_coins;
