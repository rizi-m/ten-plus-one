const express = require('express');
const passport = require('passport');
const axios = require('axios');
const { getPool } = require('../pgpool');
const { movieExists, addMovieSuggestion } = require('../database/movies');
const router = express.Router();

router.post(
  '/movies/suggestion-check',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.user) {
      res.json({
        isAuthenticated: false,
      });
      return;
    }
    try {
      // check if IMDb url exists
      if (req.body == {}) {
        res.statusMessage = 'IMDb URL not found';
        res.status(400).send();
        return;
      }
      const { IMDb } = req.body;
      // check if URL is from IMDb
      if (
        !/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(
          IMDb
        ) &&
        !IMDb.contains('imdb.com/title/')
      ) {
        res.statusMessage = 'URL is not from IMDb';
        res.status(400).send();
        return;
      }
      console.log('Going to get details for', IMDb);
      // axios
      //   .get(IMDb)
      //   .then(({ data }) => {
      //     try {
      //       const dom = new JSDOM(data);
      //       const document = dom.window.document;

      //       const movieDetails = {
      //         title: document.body.querySelector('h1').innerHTML,
      //         release_year: document.body.querySelectorAll(
      //           'ul[data-testid="hero-title-block__metadata"] > li > a'
      //         )[0].innerHTML,
      //         age_rating: document.body.querySelectorAll(
      //           'ul[data-testid="hero-title-block__metadata"] > li > a'
      //         )[1].innerHTML,
      //         duration: document.body.querySelectorAll(
      //           'ul[data-testid="hero-title-block__metadata"] > li'
      //         )[2].innerHTML,
      //         genres: Array.from(
      //           document.body.querySelectorAll('div[data-testid="genres"] span')
      //         ).map((node) => node.innerHTML),
      //         description: document.body.querySelector(
      //           'span[data-testid="plot-l"]'
      //         ).innerHTML,
      //         actors: Array.from(
      //           document.body.querySelectorAll(
      //             'a[data-testid="title-cast-item__actor"]'
      //           )
      //         )
      //           .map((a) => a.innerHTML)
      //           .slice(0, 3)
      //           .join(','),
      //         directors: Array.from(
      //           Array.from(
      //             document.querySelectorAll(
      //               'div[data-testid="title-pc-wide-screen"] span'
      //             )
      //           )
      //             .find((span) => span.innerHTML == 'Director')
      //             .nextElementSibling.getElementsByTagName('a')
      //         )
      //           .map((a) => a.innerHTML)
      //           .join(','),
      //       };
      //       res.json(movieDetails);
      //     } catch (err) {
      //       return Promise.reject(err);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.statusMessage = 'Error getting IMDb data:' + err;
      //     res.status(500).send();
      //   });
      res.json({
        title: 'Tucker and Dale vs Evil',
        release_year: '2010',
        age_rating: '15',
        duration: '1h 29min',
        genres: ['Comedy', 'Horror'],
        description:
          'Affable hillbillies Tucker and Dale are on vacation at their dilapidated mountain cabin when they are mistaken for murderers by a group of preppy college students.',
        actors: ['Tyler Labine', 'Alan Tudyk', 'Katrina Bowden'],
        directors: 'Eli Craig',
        imdb_url: 'https://www.imdb.com/title/tt0111161/',
        trailer_url: 'https://www.youtube.com/watch?v=l1t8OZn_uhE',
      });
    } catch (err) {
      console.log('UNEXPECTED ERROR ---->', err);
      res.statusMessage = 'Unexpected server error getting IMDb data';
      res.status(500).send();
    }
  }
);

router.post(
  '/movies/suggest-movie',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.user) {
      res.json({
        isAuthenticated: false,
      });
      res.status(403).send();
      return;
    }
    try {
      const movieData = req.body;
      console.log('Requesting', movieData);
      const pool = getPool();
      // check if movie is in db
      const exists = await movieExists(pool, movieData);
      if (exists) {
        res.status(409).json({ exists: true });
        return;
      }
      addMovieSuggestion(pool, movieData);
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;
