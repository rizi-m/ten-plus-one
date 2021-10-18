DROP TABLE IF EXISTS UserTypes CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Movies CASCADE;
DROP TABLE IF EXISTS Genres CASCADE;
DROP TABLE IF EXISTS Actors CASCADE;
DROP TABLE IF EXISTS Directors CASCADE;
DROP TABLE IF EXISTS MovieGenres CASCADE;
DROP TABLE IF EXISTS MovieActors CASCADE;
DROP TABLE IF EXISTS MovieDirectors CASCADE;
DROP TABLE IF EXISTS ApprovedMovies CASCADE;
DROP TABLE IF EXISTS MovieSuggestions CASCADE;
DROP TABLE IF EXISTS MovieRankings CASCADE;

CREATE TABLE IF NOT EXISTS UserTypes (
	id SERIAL PRIMARY KEY,
	type VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
	id SERIAL PRIMARY KEY,
	usertype_id SERIAL,
	displayname VARCHAR (30) NOT NULL,
	username VARCHAR (30) NOT NULL UNIQUE,
	passwordhash VARCHAR (64) NOT NULL,
	CONSTRAINT fk_users
		FOREIGN KEY(usertype_id)
			REFERENCES UserTypes(id)
);

CREATE TABLE IF NOT EXISTS Movies (
	id SERIAL PRIMARY KEY,
	title VARCHAR (100) NOT NULL,
	release_year INTEGER,
	age_rating VARCHAR(3),
	duration VARCHAR(10),
	story_description VARCHAR(100000),
	imdb_url VARCHAR (300),
	image_url VARCHAR (300),
	trailer_url VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS Genres (
	id SERIAL PRIMARY KEY,
	genre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS MovieGenres (
	movie_id SERIAL,
	genre_id SERIAL,
    PRIMARY KEY(movie_id, genre_id),
	CONSTRAINT fk_movies
		FOREIGN KEY(movie_id)
			REFERENCES Movies(id),
	CONSTRAINT fk_genre
		FOREIGN KEY(genre_id)
			REFERENCES Genres(id)
);

CREATE TABLE IF NOT EXISTS Actors (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS MovieActors (
	movie_id SERIAL,
	actor_id SERIAL,
    PRIMARY KEY(movie_id, actor_id),
	CONSTRAINT fk_movies
		FOREIGN KEY(movie_id)
			REFERENCES Movies(id),
	CONSTRAINT fk_genre
		FOREIGN KEY(actor_id)
			REFERENCES Actors(id)
);

CREATE TABLE IF NOT EXISTS Directors (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS MovieDirectors (
	movie_id SERIAL,
	director_id SERIAL,
    PRIMARY KEY(movie_id, director_id),
	CONSTRAINT fk_movies
		FOREIGN KEY(movie_id)
			REFERENCES Movies(id),
	CONSTRAINT fk_genre
		FOREIGN KEY(director_id)
			REFERENCES Directors(id)
);


CREATE TABLE IF NOT EXISTS ApprovedMovies (
	id SERIAL PRIMARY KEY,
	movie_id SERIAL,
	CONSTRAINT fk_movies
		FOREIGN KEY(movie_id)
			REFERENCES Movies(id)
);

CREATE TABLE IF NOT EXISTS MovieSuggestions (
	id SERIAL PRIMARY KEY,
	movie_id SERIAL,
	user_id SERIAL,
	votes INTEGER NOT NULL,
	CONSTRAINT fk_movies
		FOREIGN KEY(movie_id)
			REFERENCES Movies(id),
	CONSTRAINT fk_users
		FOREIGN KEY(user_id)
			REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS MovieRankings (
	user_id SERIAL NOT NULL,
	approved_movie_id SERIAL NOT NULL,
	ranking INTEGER NOT NULL,
	CONSTRAINT fk_users
		FOREIGN KEY(user_id)
			REFERENCES users(id),
	CONSTRAINT fk_approved_movies
		FOREIGN KEY(approved_movie_id)
			REFERENCES ApprovedMovies(id)
);
