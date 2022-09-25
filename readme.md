## Web Scraper and REST API (Backend)

This project is a REST API that allows users to access data supplied by a web scraper.

## Installation and Setup

- Clone or download the repository
- Run `npm install`

To Run Test Suite:

- Run `npm test`

To Start Server

- Run `npm start dist/app.js`
- Visit the server on `localhost:4000`

## Reflection

The goals of this project included using technologies learned up untill this point like Nodejs and Express, while also learning new technologies like Puppeteer for web scraping.

One of the challenges I ran into was determining if the scraper should run in the background and store the data in a json file, or run on GET request.
I ultimately decided to run the scraper on request, which sacrifices speed for having constantly updating information.

The technologies inplemented in this project are `Express`, `Nodejs`, `Typescipt`, and `Puppeteer`
