module.exports = {
  clearDatabase: (pool) => {
    const clearDatabaseSql =
      'DELETE FROM MovieGenres; \
      DELETE FROM MovieActors; \
      DELETE FROM MovieDirectors; \
      DELETE FROM Genres; \
      DELETE FROM Actors; \
      DELETE FROM Directors; \
      DELETE FROM ApprovedMovies; \
      DELETE FROM SuggestedMovies; \
      DELETE FROM MovieRankings; \
      DELETE FROM Movies; \
      DELETE FROM Users; \
      DELETE FROM UserTypes; \
      TRUNCATE TABLE \
      MovieGenres, \
      ApprovedMovies, \
      SuggestedMovies, \
      MovieRankings, \
      MovieActors, \
      MovieDirectors, \
      Genres, \
      Actors, \
      Directors, \
      Movies, \
      Users, \
      UserTypes \
      RESTART IDENTITY;';

    return pool.query(clearDatabaseSql);
  },
};
