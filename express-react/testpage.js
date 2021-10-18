const cheerio = require('cheerio');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const page = fs.readFileSync('testpage.html', 'utf-8');

// get metadata
const dom = new JSDOM(page);
const document = dom.window.document;

const movieDetails = {
  title: document.body.querySelector('h1').innerHTML,
  release_year: document.body.querySelectorAll(
    'ul[data-testid="hero-title-block__metadata"] > li > a'
  )[0].innerHTML,
  age_rating: document.body.querySelectorAll(
    'ul[data-testid="hero-title-block__metadata"] > li > a'
  )[1].innerHTML,
  duration: document.body.querySelectorAll(
    'ul[data-testid="hero-title-block__metadata"] > li'
  )[2].innerHTML,
  genres: Array.from(
    document.body.querySelectorAll('div[data-testid="genres"] span')
  ).map((node) => node.innerHTML),
  description: document.body.querySelector('span[data-testid="plot-l"]')
    .innerHTML,
  stars: Array.from(
    document.body.querySelectorAll('a[data-testid="title-cast-item__actor"]')
  )
    .map((a) => a.innerHTML)
    .slice(0, 3)
    .join(','),
  directors: Array.from(
    Array.from(
      document.querySelectorAll('div[data-testid="title-pc-wide-screen"] span')
    )
      .find((span) => span.innerHTML == 'Director')
      .nextElementSibling.getElementsByTagName('a')
  )
    .map((a) => a.innerHTML)
    .join(','),
};

console.log(movieDetails);
