DROP TABLE IF EXISTS UserTypes CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Movies CASCADE;
DROP TABLE IF EXISTS Genre CASCADE;
DROP TABLE IF EXISTS MovieGenre CASCADE;
DROP TABLE IF EXISTS ApprovedMovies CASCADE;
DROP TABLE IF EXISTS SuggestedMovies CASCADE;
DROP TABLE IF EXISTS MovieRankings CASCADE;

CREATE TABLE IF NOT EXISTS UserTypes (
	id SERIAL PRIMARY KEY,
	type VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
	id SERIAL PRIMARY KEY,
	usertype_id SERIAL,
	displayname VARCHAR (30) NOT NULL,
	usernname VARCHAR (30) NOT NULL UNIQUE,
	passwordhash VARCHAR (64) NOT NULL,
	CONSTRAINT fk_users
		FOREIGN KEY(usertype_id)
			REFERENCES UserTypes(id)
);

CREATE TABLE IF NOT EXISTS Movies (
	id SERIAL PRIMARY KEY,
	title VARCHAR (100) NOT NULL,
	release_year INTEGER,
	imdb_url VARCHAR (300),
	image_url VARCHAR (300)
);

CREATE TABLE IF NOT EXISTS Genre (
	id SERIAL PRIMARY KEY,
	category VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS MovieGenre (
	movie_id SERIAL,
	genre_id SERIAL,
    PRIMARY KEY(movie_id, genre_id),
	CONSTRAINT fk_movies
		FOREIGN KEY(movie_id)
			REFERENCES Movies(id),
	CONSTRAINT fk_genre
		FOREIGN KEY(genre_id)
			REFERENCES Genre(id)
);

CREATE TABLE IF NOT EXISTS ApprovedMovies (
	id SERIAL PRIMARY KEY,
	movie_id SERIAL,
	CONSTRAINT fk_movies
		FOREIGN KEY(movie_id)
			REFERENCES Movies(id)
);

CREATE TABLE IF NOT EXISTS SuggestedMovies (
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
	ranking SERIAL NOT NULL,
	CONSTRAINT fk_users
		FOREIGN KEY(user_id)
			REFERENCES users(id),
	CONSTRAINT fk_approved_movies
		FOREIGN KEY(approved_movie_id)
			REFERENCES ApprovedMovies(id)
);
