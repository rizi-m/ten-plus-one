const { Pool } = require('pg');
const format = require('pg-format');

/**
 * Adds given genres to the database if genres are not already in the database
 * @param {Pool} pool Pool for database queries
 * @param  {String} table The table to add the data to
 * @param  {String} column The column to add the data to
 * @param  {[String]} data The data to add to the table for the movie
 * @return {[Number]} database ids of the data inserted into the database
 */
const addMovieData = async (pool, table, column, data) => {
  // data ids to return
  const dataIds = [];

  const selectDataSql = `SELECT * FROM ${table} WHERE ${column} = ANY ($1)`;
  const selectDataResult = await pool.query(selectDataSql, [data]);

  dataIds.push(...selectDataResult.rows.map((row) => row.id));

  const storedData = selectDataResult.rows.map((row) => row[column]);
  const newData = data
    .filter((given) => !storedData.includes(given))
    // creat list of list of data for batch insertion e.g [['Value1'], ['Value2']]
    .map((newElement) => [newElement]);

  if (newData.length > 0) {
    const insertNewDataResult = await pool.query(
      format(`INSERT INTO ${table} (${column}) VALUES %L RETURNING id`, newData)
    );
    dataIds.push(...insertNewDataResult.rows.map((row) => row.id));
  }
  return dataIds;
};

/**
 * Adds relationship for data for the movie id provided
 * @param {Pool} pool Pool for database queries
 * @param  {String} table The table to add the data to
 * @param  {Number} movieId The id of the movie to which the data has a relationship with
 * @param  {[Number]} dataIds The ids of the data that has a relationship with the movie
 */
const addMovieDataRelationship = async (pool, table, movieId, dataIds) => {
  const movieDataIds = dataIds.map((dataId) => [movieId, dataId]);
  return pool.query(format(`INSERT INTO ${table} VALUES %L`, movieDataIds));
};

/**
 * Contains function for manipulating movie data in the database
 * @param {Pool} pool Pool for database queries
 * @property {function} addMovie
 * @property {function} addGenres
 * @property {function} addMovieGenres
 * @property {function} addActors
 * @property {function} addMovieActors
 * @property {function} addDirectors
 * @property {function} addMovieDirectors
 * @property {function} movieExists
 * @property {function} addSuggestedMovie
 */
const movies = (pool) => ({
  /**
   * Adds given movie to the database
   * @param  {[Object]} movieData Object of the movie data
   * @return {Number} id of the movie added
   */
  addMovie: async (movieData) => {
    const addMovieSql =
      'INSERT INTO Movies \
      (title, release_year, age_rating, \
      duration, story_description, imdb_url, \
      image_url, trailer_url) \
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
    const result = await pool.query(addMovieSql, [
      movieData.title,
      movieData.release_year,
      movieData.age_rating,
      movieData.duration,
      movieData.description,
      movieData.imdb_url,
      movieData.image_url,
      movieData.trailer_url,
    ]);
    return result.rows[0].id;
  },

  /**
   * Adds genres to the database
   * @param  {[String]} genres The data to add to the table for the movie
   * @return {[Number]} database ids of the data inserted into the database
   */
  addGenres: async (genres) => {
    return addMovieData(pool, 'Genres', 'genre', genres);
  },

  /**
   * Adds relationship for genre for the movie id provided and genre ids
   * @param  {Number} movieId The id of the movie to which the genre has a relationship with
   * @param  {[Number]} genreIds The ids of the genre that has a relationship with the movie
   */
  addMovieGenres: async (movieId, genreIds) => {
    return addMovieDataRelationship(pool, 'MovieGenres', movieId, genreIds);
  },

  /**
   * Adds actors to the database
   * @param  {[String]} actors The name of the actors to add
   * @return {[Number]} database ids of the actors inserted into the database
   */
  addActors: async (actors) => {
    return addMovieData(pool, 'Actors', 'name', actors);
  },

  /**
   * Adds relationship for genre for the movie id provided and genre ids
   * @param  {Number} movieId The id of the movie to which the genre has a relationship with
   * @param  {[Number]} actorIds The ids of the actors that have a relationship with the movie
   */
  addMovieActors: async (movieId, actorIds) => {
    return addMovieDataRelationship(pool, 'MovieActors', movieId, actorIds);
  },

  /**
   * Adds directors to the database
   * @param  {[String]} directors The name of the directors to add
   * @return {[Number]} database ids of the directors inserted into the database
   */
  addDirectors: async (directors) => {
    return addMovieData(pool, 'Directors', 'name', directors);
  },

  /**
   * Adds relationship for director for the movie id provided and director ids
   * @param  {Number} movieId The id of the movie to which the director has a relationship with
   * @param  {[Number]} directorIds The ids of the directors that have a relationship with the movie
   */
  addMovieDirectors: async (movieId, directorIds) => {
    return addMovieDataRelationship(
      pool,
      'MovieDirectors',
      movieId,
      directorIds
    );
  },

  /**
   * Check if movie exists in the database by name and IMDb url
   * @param  {Number} movieData The data of the movie
   * @returns  {[Boolean]} true if movie exists in the database
   */
  movieExists: async (movieData) => {
    const { title, imdb_url } = movieData;
    const selectMovieSql =
      'SELECT title, imdb_url FROM Movies \
      WHERE title=$1 AND imdb_url=$2';
    const selectMovieResult = await pool.query(selectMovieSql, [
      title,
      imdb_url,
    ]);
    return selectMovieResult.rowCount === 1;
  },

  /**
   * Adds a movie suggestion
   * @param {Object} movieData The id of the movie to which the director has a relationship with
   * @param {Object} user The user that has suggested the movie
   * @returns {Number} id of the movie suggestion created
   */
  addMovieSuggestion: async (movieId, userId) => {
    const insertMovieSuggestionSql =
      'INSERT INTO MovieSuggestions (movie_id, user_id, votes) VALUES ($1, $2, 0) RETURNING id';
    const insertMovieSuggestionResult = await pool.query(
      insertMovieSuggestionSql,
      [movieId, userId]
    );
    return insertMovieSuggestionResult.rows[0].id;
  },
});

module.exports = movies;
