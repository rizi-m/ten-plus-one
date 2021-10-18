const rewire = require('rewire');
const { clearDatabase, addTestUsers } = require('../../test-utils/database');
const { sampleMovies } = require('../../test-utils/sample_data');
const movies = require('../movies');

const { getPool } = require('../../test-utils/test-pgpool');
const { Pool } = require('pg');

/**
 * @type {Pool}
 */
let pool;

beforeAll(() => {
  pool = getPool();
});

afterEach(async () => {
  await clearDatabase(pool).catch((err) =>
    console.error('Failed to clear database', err)
  );
});

afterAll(async () => {
  pool.end();
});

test('Add movie to the database', async () => {
  const movieData = sampleMovies[0];
  const { addMovie } = movies(pool);

  await addMovie(movieData);

  const getMovieSql =
    'SELECT title, imdb_url FROM Movies \
    WHERE \
    title=$1 AND release_year=$2 AND age_rating=$3 and duration=$4 and imdb_url=$5';
  const result = await pool.query(getMovieSql, [
    movieData.title,
    movieData.release_year,
    movieData.age_rating,
    movieData.duration,
    movieData.imdb_url,
  ]);

  expect(result.rowCount).toBe(1);
});

test('Adding genres to the database', async () => {
  const genres1 = ['Comedy', 'Horror'];
  const genres2 = ['Action', 'Adventure', 'Comedy'];
  const { addGenres } = movies(pool);

  const genre1ids = await addGenres(genres1);
  expect(genre1ids.length).toBe(2);

  const genre2ids = await addGenres(genres2);
  expect(genre2ids.length).toBe(3);

  const selectAllGenresResult = await pool.query('SELECT * FROM Genres');
  expect(selectAllGenresResult.rowCount).toBe(4);
});

test('Adding movie genres to database for given movie and genres', async () => {
  const movieData = sampleMovies[0];
  const { addMovie, addGenres, addMovieGenres } = movies(pool);

  const movieId = await addMovie(movieData);
  const genreIds = await addGenres(movieData.genres);

  await addMovieGenres(movieId, genreIds);

  const selectAllMovieGenresResult = await pool.query(
    'SELECT * FROM MovieGenres'
  );
  expect(selectAllMovieGenresResult.rowCount).toBe(2);
});

test('Adding actors to the database', async () => {
  const actors1 = ['Tom Holland', 'Tom Cruise'];
  const actors2 = ['Angelina Jolie', 'Arnold Schwarzenegger', 'Tom Cruise'];
  const { addActors } = movies(pool);

  const actors1ids = await addActors(actors1);
  expect(actors1ids.length).toBe(2);

  const actors2ids = await addActors(actors2);
  expect(actors2ids.length).toBe(3);

  const selectAllActorsResult = await pool.query('SELECT * FROM Actors');
  expect(selectAllActorsResult.rowCount).toBe(4);
});

test('Adding movie actors to database for given movie and actors', async () => {
  const movieData = sampleMovies[0];
  const { addMovie, addActors, addMovieActors } = movies(pool);

  const movieId = await addMovie(movieData);
  const actorIds = await addActors(movieData.actors);

  await addMovieActors(movieId, actorIds);

  const selectAllMovieActorsResult = await pool.query(
    'SELECT * FROM MovieActors'
  );
  expect(selectAllMovieActorsResult.rowCount).toBe(3);
});

test('Adding directors to the database', async () => {
  const directors1 = ['Zack Snyder', 'Quentin Tarantino'];
  const directors2 = ['Zack Snyder'];
  const { addDirectors } = movies(pool);

  const directors1ids = await addDirectors(directors1);
  expect(directors1ids.length).toBe(2);

  const directors2ids = await addDirectors(directors2);
  expect(directors2ids.length).toBe(1);

  const selectAllDirectorsResult = await pool.query('SELECT * FROM Directors');
  expect(selectAllDirectorsResult.rowCount).toBe(2);
});

test('Adding movie directors to database for given a movie', async () => {
  const movieData = sampleMovies[0];
  const { addMovie, addDirectors, addMovieDirectors } = movies(pool);

  const movieId = await addMovie(movieData);
  const directorIds = await addDirectors(movieData.directors);

  await addMovieDirectors(movieId, directorIds);

  const selectAllMovieDirectorsResult = await pool.query(
    'SELECT * FROM MovieDirectors'
  );
  expect(selectAllMovieDirectorsResult.rowCount).toBe(1);
});

test('Adding movie suggestion', async () => {
  const movieData = sampleMovies[0];
  const { addMovie, addMovieSuggestion } = movies(pool);

  const movieId = await addMovie(movieData);
  await addTestUsers(pool);
  const userId = 1;

  const movieSuggestionId = await addMovieSuggestion(movieId, userId);

  const selectMovieSuggestionResult = await pool.query(
    'SELECT * FROM MovieSuggestions'
  );

  expect(selectMovieSuggestionResult.rowCount).toBe(1);
  expect(selectMovieSuggestionResult.rows[0].id).toBe(movieSuggestionId);
  expect(selectMovieSuggestionResult.rows[0].movie_id).toBe(movieId);
  expect(selectMovieSuggestionResult.rows[0].user_id).toBe(userId);
  expect(selectMovieSuggestionResult.rows[0].votes).toBe(0);
});
