const rewire = require('rewire');
const { clearDatabase } = require('../../test-utils/database');
const { sampleMovies } = require('../../test-utils/sample_data');
const movies = rewire('../movies');

const { getPool } = require('../../test-utils/test-pgpool');

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
  const addMovie = movies.__get__('addMovie');

  await addMovie(pool, movieData);

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
  const addGenres = movies.__get__('addGenres');

  const genre1ids = await addGenres(pool, genres1);
  expect(genre1ids.length).toBe(2);

  const genre2ids = await addGenres(pool, genres2);
  expect(genre2ids.length).toBe(3);

  const selectAllGenresResult = await pool.query('SELECT * FROM Genres');
  expect(selectAllGenresResult.rowCount).toBe(4);
});

test('Adding movie genres to database for given movie and genres', async () => {
  const movieData = sampleMovies[0];
  const addMovie = movies.__get__('addMovie');
  const addGenres = movies.__get__('addGenres');
  const addMovieGenres = movies.__get__('addMovieGenres');

  const movieId = await addMovie(pool, movieData);
  const genreIds = await addGenres(pool, movieData.genres);

  await addMovieGenres(pool, movieId, genreIds);

  const selectAllMovieGenresResult = await pool.query(
    'SELECT * FROM MovieGenres'
  );
  expect(selectAllMovieGenresResult.rowCount).toBe(2);
});

test('Adding actors to the database', async () => {
  const actors1 = ['Tom Holland', 'Tom Cruise'];
  const actors2 = ['Angelina Jolie', 'Arnold Schwarzenegger', 'Tom Cruise'];
  const addActors = movies.__get__('addActors');

  const actors1ids = await addActors(pool, actors1);
  expect(actors1ids.length).toBe(2);

  const actors2ids = await addActors(pool, actors2);
  expect(actors2ids.length).toBe(3);

  const selectAllActorsResult = await pool.query('SELECT * FROM Actors');
  expect(selectAllActorsResult.rowCount).toBe(4);
});

test('Adding movie actors to database for given movie and actors', async () => {
  const movieData = sampleMovies[0];
  const addMovie = movies.__get__('addMovie');
  const addActors = movies.__get__('addActors');
  const addMovieActors = movies.__get__('addMovieActors');

  const movieId = await addMovie(pool, movieData);
  const actorIds = await addActors(pool, movieData.actors);

  await addMovieActors(pool, movieId, actorIds);

  const selectAllMovieActorsResult = await pool.query(
    'SELECT * FROM MovieActors'
  );
  expect(selectAllMovieActorsResult.rowCount).toBe(3);
});

test('Adding directors to the database', async () => {
  const directors1 = ['Zack Snyder', 'Quentin Tarantino'];
  const directors2 = ['Zack Snyder'];
  const addDirectors = movies.__get__('addDirectors');

  const directors1ids = await addDirectors(pool, directors1);
  expect(directors1ids.length).toBe(2);

  const directors2ids = await addDirectors(pool, directors2);
  expect(directors2ids.length).toBe(1);

  const selectAllDirectorsResult = await pool.query('SELECT * FROM Directors');
  expect(selectAllDirectorsResult.rowCount).toBe(2);
});

test('Adding movie directors to database for given movie and directors', async () => {
  const movieData = sampleMovies[0];
  const addMovie = movies.__get__('addMovie');
  const addDirectors = movies.__get__('addDirectors');
  const addMovieDirectors = movies.__get__('addMovieDirectors');

  const movieId = await addMovie(pool, movieData);
  const directorIds = await addDirectors(pool, movieData.directors);

  await addMovieDirectors(pool, movieId, directorIds);

  const selectAllMovieDirectorsResult = await pool.query(
    'SELECT * FROM MovieDirectors'
  );
  expect(selectAllMovieDirectorsResult.rowCount).toBe(1);
});
