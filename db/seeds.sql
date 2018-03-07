
INSERT INTO users (google_id, username) VALUES ( "t18723409322", "tmederos");
INSERT INTO users (google_id, username) VALUES ( "g344500999344", "gstolz");

INSERT INTO pins (title, description, category, filepath, uploaded_by )
VALUES ("toilet paper", "This is the wrong way", "wrong", "/pubic/images/sample/toilet_paper.jpg", "t18723409322" );
INSERT INTO pins (title, description, category, filepath, uploaded_by)
VALUES ("condiments", "Condiments", "products", "/filepath/images/sample/condiments.jpg", "t18723409322");
INSERT INTO pins (title, description, category, filepath, uploaded_by)
VALUES ("cement", "Footprints", "work", "/pubic/images/sample/cement.jpg", "g344500999344");
INSERT INTO pins (title, description, category, filepath, uploaded_by)
VALUES ("wheelchair ramp", "Wheelchair ramp", "one-job", "/pubic/images/sample/wheelchair-ramp.jpg", "g344500999344");


INSERT INTO pin_db.boards( user_id, pin_id, category )
VALUES (  "t18723409322", 1, "wrong" );
INSERT INTO pin_db.boards( user_id, pin_id, category )
VALUES (  "t18723409322", 2, "products" );
INSERT INTO pin_db.boards( user_id, pin_id, category )
VALUES (  "g344500999344", 3, "work" );
INSERT INTO pin_db.boards( user_id, pin_id, category )
VALUES (  "g344500999344", 4, "one-job" );
