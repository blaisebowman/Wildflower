let sqlite3 = require('sqlite3').verbose();
let md5 = require('md5');
const DBSOURCE = "flowers2019.db";
//prepend with line 6 in parenthesis withs __dirname +
let db = new sqlite3.Database('flowers2019.db', (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err
    }else{
        console.log('Connected to the Flowers2019 database.');
        db.run("CREATE INDEX IF NOT EXISTS tag1 ON sightings (name)");
        db.run("CREATE INDEX IF NOT EXISTS tag2 ON sightings (person)");
        db.run("CREATE INDEX IF NOT EXISTS tag3 ON sightings (location)");
        db.run("CREATE INDEX IF NOT EXISTS tag4 ON sightings (sighted)");
       db.run("CREATE INDEX IF NOT EXISTS col_name on sightings (name,person,location,sighted)");
       db.run("EXPLAIN  QUERY PLAN SELECT * FROM SIGHTINGS WHERE NAME = ?");

       //SQLITE TRIGGER: Prevents the user from inserting a sighting for a user that does not exist in the members table
      db.run(
            `CREATE TRIGGER IF NOT EXISTS validate_name BEFORE 
        INSERT ON SIGHTINGS
        BEGIN
        SELECT CASE WHEN (
            SELECT (NEW.PERSON
        NOT IN (SELECT MEMBERS.NAME FROM MEMBERS)))
        THEN RAISE (ABORT,
            'Error: Insert into the SIGHTINGS table references a person that is not found in the database.')
        END;
        END;
    `, (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Trigger is available for sightings');
                }
            }
        );


       //SQLITE TRIGGER: Handles user update:

        db.run(
            `CREATE TRIGGER IF NOT EXISTS validate_ BEFORE 
        INSERT ON SIGHTINGS
        BEGIN
        SELECT CASE WHEN (
            SELECT (NEW.PERSON
        NOT IN (SELECT MEMBERS.NAME FROM MEMBERS)))
        THEN RAISE (ABORT,
            'Error: Insert into the SIGHTINGS table references a person that is not found in the database.')
        END;
        END;
    `, (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Trigger is available for sightings');
                }
            }
        );


        db.run(`CREATE TABLE user (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name text,
              email text UNIQUE,
              password text,
              CONSTRAINT email_unique UNIQUE (email)
              )`,(err) => {
              if (err) {
                  // Table already created
              }else{
                  // Table just created, creating some rows
                  var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                  db.run(insert, ["admin","admin@example.com",md5("admin123456")])
                  db.run(insert, ["user","user@example.com",md5("user123456")])
              }
          })
    }
});


module.exports = db;