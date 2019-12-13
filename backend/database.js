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

        //TABLE USED TO TO LOG INSERTIONS, DELETIONS AND UPDATED FOR FEATURES
        db.run(`CREATE TABLE features_logs IF NOT EXISTS (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              old_location varchar(30) UNIQUE,
              new_location varchar(30) UNIQUE,
              old_class varchar(30),
              new_class varchar(30),
              old_latitude number,
              new_latitude number,
              old_longitude number,
              new_longitude number,
              old_map varchar(30),
              new_map varhar(30),
              old_elev number,
              new_elev number,
            
              )`,(err) => {
            if (err) {
                // Table already created
            }else{
                //
            }
        });

        db.run(
            `CREATE TRIGGER IF NOT EXISTS log_features_after_update
   AFTER UPDATE ON FEATURES
   WHEN old.location <> new.location
        OR old.class <> new.class
        OR old.latitude <> new.latitude
        OR old.longitude <> new.longitude
        OR old.map <> new.map
        OR old.elev <> new.elev
BEGIN
    INSERT INTO features_logs (
        old_location,
        new_location,
        old_class,
        new_class,
        old_latitude,
        new_latitude,
        old_longitude,
        new_longitude,
        old_map,
        new_map,
        old_elev,
        new_elev,
        user_action,
        created_at
    )
VALUES
    (
        old.location,
        new.location,
        old.class,
        new.class,
        old.latitude,
        new.latitude,
        old.longitude,
        new.longitude,
        old.map,
        new.map,
        old.elev,
        new.elev,
        'UPDATE',
        DATETIME('NOW')
    ) ;
END;
    `, (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Trigger is available for to log Features Table');
                }
            }
        );



        //TABLE USED TO TO LOG INSERTIONS, DELETIONS AND UPDATED FOR FLOWERS
        db.run(`CREATE TABLE flowers_logs IF NOT EXISTS (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              old_GENUS varchar(30),
              new_GENUS varchar(30),
              old_SPECIES varchar(30),
              new_SPECIES varchar(30),
              old_COMNAME varchar(30),
              new_COMNAME varchar(30),
              )`,(err) => {
            if (err) {
                // Table already created
            }else{
                //
            }
        });

        db.run(
            `CREATE TRIGGER IF NOT EXISTS log_flowers_after_update
   AFTER UPDATE ON flowers
   WHEN old.genus <> new.genus
        OR old.species <> new.species
        OR old.comname <> new.comname
BEGIN
    INSERT INTO flowers_logs (
        old_genus,
        new_genus,
        old_species,
        new_species,
        old_comname,
        new_comname
    )
VALUES
    (
        old.genus,
        new.genus,
        old.species,
        new.species,
        old.comname,
        new.comname,
        'UPDATE',
        DATETIME('NOW')
    ) ;
END;
    `, (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Trigger is available updates/insertions/deletions to log Flowers Table');
                }
            }
        );

        //TABLE USED TO TO LOG INSERTIONS, DELETIONS AND UPDATED FOR MEMBERS
        db.run(`CREATE TABLE members_logs IF NOT EXISTS (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              old_name varchar(30),
              new_name varchar(30),
              old_membersince date,
              new_membersince date,
              old_numsightings number,
              new_numsightings number,
              )`,(err) => {
            if (err) {
                // Table already created
            }else{
            }
        });

        db.run(
            `CREATE TRIGGER IF NOT EXISTS log_members_after_update
   AFTER UPDATE ON members
   WHEN old.name <> new.name
        OR old.membersince <> new.membersince
        OR old.numsightings <> new.numsightings
BEGIN
    INSERT INTO members_logs (
        old_name,
        new_name,
        old_membersince,
        new_membersince,
        old_numsightings,
        new_numsightings
    )
VALUES
    (
        old.name,
        new.name,
        old.membersince,
        new.membersince,
        old.numsightings,
        new.numsightings,
        'UPDATE',
        DATETIME('NOW')
    ) ;
END;
    `, (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Trigger is available updates/insertions/deletions to log Members Table');
                }
            }
        );

        //TABLE USED TO TO LOG INSERTIONS, DELETIONS AND UPDATED FOR SIGHTINGS
        db.run(`CREATE TABLE sightings_logs IF NOT EXISTS (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              old_name varchar(30),
              new_name varchar(30),
              old_person varchar(30),
              new_person varchar(30),
              old_location varchar(30),
              new_location varchar(30),
              old_sighted date,
              new_sighted date
              )`,(err) => {
            if (err) {
                // Table already created
            }else{
            }
        });

        db.run(
            `CREATE TRIGGER IF NOT EXISTS log_sightings_after_update
   AFTER UPDATE ON sightings
   WHEN old.name <> new.name
        OR old.person <> new.person
        OR old.location <> new.location
        OR old.sighted <> new.sighted 
        
BEGIN
    INSERT INTO sightings_logs (
        old_name,
        new_name,
        old_person,
        new_person,
        old_location,
        new_location,
        old_sighted,
        new_sighted
    )
VALUES
    (
        old.name,
        new.name,
        old.person,
        new.person,
        old.location,
        new.location,
        old.sighted,
        new.sighted,
        'UPDATE',
        DATETIME('NOW')
    ) ;
END;
    `, (err)=> {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Trigger is available updates/insertions/deletions to log Sightings Table');
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