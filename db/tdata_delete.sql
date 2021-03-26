DELETE FROM Movies;
DELETE FROM Genre;
DELETE FROM MovieGenre;
DELETE FROM ApprovedMovies;
DELETE FROM SuggestedMovies;
DELETE FROM MovieRankings;
DELETE FROM Users;
DELETE FROM UserTypes;

TRUNCATE TABLE 
Movies,
MovieGenre,
ApprovedMovies,
SuggestedMovies,
MovieRankings,
Genre,
Users,
UserTypes
RESTART IDENTITY;