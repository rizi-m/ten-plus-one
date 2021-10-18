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
