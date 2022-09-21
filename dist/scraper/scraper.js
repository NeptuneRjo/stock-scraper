"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const promises_1 = __importDefault(require("fs/promises"));
const scraper = async () => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto('https://www.wsj.com/news/markets/stocks?mod=nav_top_subsection');
    const articlesCollection = [];
    const articlesLength = await page.$$eval('#latest-stories article', async (articles) => {
        return articles.length;
    });
    const images = await page.$$eval('.WSJTheme--image--At42misj', async (images) => {
        return images.map((index) => index.src);
    });
    const headlines = await page.$$eval('span.WSJTheme--headlineText--He1ANr9C', async (headlines) => {
        return headlines.map((index) => index.innerText);
    });
    const descriptions = await page.$$eval('span.WSJTheme--summaryText--2LRaCWgJ', async (descriptions) => {
        return descriptions.map((index) => index.innerText);
    });
    const authors = await page.$$eval('p.WSJTheme--byline--1oIUvtQ3', async (authors) => {
        return authors.map((index) => index.innerText);
    });
    const dates = await page.$$eval('p.WSJTheme--timestamp--22sfkNDv', async (dates) => {
        return dates.map((index) => index.innerText);
    });
    for (let i = 0; i < articlesLength; i++) {
        const articleObj = {
            imageUrl: images[i],
            headline: headlines[i],
            description: descriptions[i],
            author: authors[i],
            date: dates[i],
        };
        articlesCollection.push(articleObj);
    }
    await promises_1.default.writeFile('articles.json', JSON.stringify(articlesCollection));
    await browser.close();
};
scraper();
