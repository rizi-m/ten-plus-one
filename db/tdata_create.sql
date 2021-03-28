INSERT INTO UserTypes (id, type)
VALUES ('1', 'admin');
INSERT INTO UserTypes (id, type)
VALUES ('2', 'original');
INSERT INTO UserTypes (id, type)
VALUES ('3', 'guest');

INSERT INTO Users (id, usertype_id, displayname, username, passwordhash)
VALUES ('1', '1', 'Zeus', 'admin', 'pass');
INSERT INTO Users (id, usertype_id, displayname, username, passwordhash)
VALUES ('2', '2', 'Rico', 'ri', 'pass');
INSERT INTO Users (id, usertype_id, displayname, username, passwordhash)
VALUES ('3', '2', 'Elias', 'e', 'pass');
INSERT INTO Users (id, usertype_id, displayname, username, passwordhash)
VALUES ('4', '2', 'Pablo', 'pa', 'pass');
INSERT INTO Users (id, usertype_id, displayname, username, passwordhash)
VALUES ('5', '2', 'Pele', 'pe', 'pass');
INSERT INTO Users (id, usertype_id, displayname, username, passwordhash)
VALUES ('6', '2', 'Horacio', 'h', 'pass');
INSERT INTO Users (id, usertype_id, displayname, username, passwordhash)
VALUES ('7', '2', 'Ramirez', 'ra', 'pass');

INSERT INTO Movies (id, title, release_year, imdb_url, image_url, trailer_url)
VALUES ('1', 'Predestination', '2014', 'https://www.imdb.com/title/tt2397535/', 'https://i.imgur.com/y1yUejY.jpg', 'https://www.youtube.com/watch?v=-FcK_UiVV40');
INSERT INTO Movies (id, title, release_year, imdb_url, image_url, trailer_url)
VALUES ('2', 'The Kings Speech', '2010', 'https://www.imdb.com/title/tt1504320/', 'https://i.pinimg.com/564x/ed/7d/cc/ed7dcc85242e2d814a2064dc671c9a3f--kings-speech-colin-firth.jpg', 'https://www.youtube.com/watch?v=EcxBrTvLbBM');
INSERT INTO Movies (id, title, release_year, trailer_url)
VALUES ('3', 'Fury', '2014', 'https://www.youtube.com/watch?v=-OGvZoIrXpg');
INSERT INTO Movies (id, title, release_year, imdb_url, image_url, trailer_url)
VALUES ('4', 'Jurassic Park', '1993', 'https://www.imdb.com/title/tt0107290/', 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg', 'https://www.youtube.com/watch?v=QWBKEmWWL38');
INSERT INTO Movies (id, title, release_year, imdb_url, image_url, trailer_url)
VALUES ('5', 'A quiet place', '2018', 'https://www.imdb.com/title/tt6644200/', 'https://contentserver.com.au/assets/642339_a_quiet_place_v8.jpg', 'https://www.youtube.com/watch?v=WR7cc5t7tv8');
INSERT INTO Movies (id, title, release_year, imdb_url, image_url, trailer_url)
VALUES ('6', 'Oceans 11', '2001', 'https://www.imdb.com/title/tt0240772/', 'https://upload.wikimedia.org/wikipedia/en/6/68/Ocean%27s_Eleven_2001_Poster.jpg', 'https://www.youtube.com/watch?v=imm6OR605UI');
INSERT INTO Movies (id, title, release_year, imdb_url, image_url, trailer_url)
VALUES ('7', 'The Naked Gun', '1988', 'https://www.imdb.com/title/tt000095705/', 'https://upload.wikimedia.org/wikipedia/en/5/5f/The_Naked_Gun_Poster.jpg', 'https://www.youtube.com/watch?v=YAXlWVKcGjM');

INSERT INTO Genre (id, category)
VALUES ('1', 'Action');
INSERT INTO Genre (id, category)
VALUES ('2', 'Animation');
INSERT INTO Genre (id, category)
VALUES ('3', 'Comedy');
INSERT INTO Genre (id, category)
VALUES ('4', 'Crime');
INSERT INTO Genre (id, category)
VALUES ('5', 'Drama');
INSERT INTO Genre (id, category)
VALUES ('6', 'Experimental');
INSERT INTO Genre (id, category)
VALUES ('7', 'Fantasy');
INSERT INTO Genre (id, category)
VALUES ('8', 'Historical');
INSERT INTO Genre (id, category)
VALUES ('9', 'Horror');
INSERT INTO Genre (id, category)
VALUES ('10', 'Romance');
INSERT INTO Genre (id, category)
VALUES ('11', 'Sci-fi');
INSERT INTO Genre (id, category)
VALUES ('12', ' Fiction');
INSERT INTO Genre (id, category)
VALUES ('13', 'Thriller');
INSERT INTO Genre (id, category)
VALUES ('14', 'Western');

INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (1, 1);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (1, 7);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (1, 11);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (1, 13);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (2, 5);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (2, 8);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (3, 1);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (3, 5);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (4, 1);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (4, 7);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (4, 11);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (4, 13);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (5, 5);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (5, 9);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (5, 11);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (5, 13);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (6, 1);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (6, 3);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (6, 4);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (6, 13);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (7, 1);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (7, 4);
INSERT INTO MovieGenre (movie_id, genre_id)
VALUES (7, 10);

INSERT INTO ApprovedMovies (id, movie_id)
VALUES (1, 1);
INSERT INTO ApprovedMovies (id, movie_id)
VALUES (2, 2);
INSERT INTO ApprovedMovies (id, movie_id)
VALUES (3, 3);
INSERT INTO ApprovedMovies (id, movie_id)
VALUES (4, 4);
INSERT INTO ApprovedMovies (id, movie_id)
VALUES (5, 5);
