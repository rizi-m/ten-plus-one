DELETE FROM MovieGenres;
DELETE FROM Genres;
DELETE FROM MovieActors;
DELETE FROM Actors;
DELETE FROM MovieDirectors;
DELETE FROM Directors;
DELETE FROM ApprovedMovies;
DELETE FROM SuggestedMovies;
DELETE FROM MovieRankings;
DELETE FROM Movies;
DELETE FROM Users;
DELETE FROM UserTypes;

TRUNCATE TABLE 
MovieGenres,
ApprovedMovies,
SuggestedMovies,
MovieRankings,
MovieActors,
MovieDirectors,
Genres,
Actors,
Directors,
Movies,
Users,
UserTypes
RESTART IDENTITY;