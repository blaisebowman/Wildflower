let sqlite3 = require('sqlite3').verbose();
let md5 = require('md5');

const DBSOURCE = "db.sqlite";

let dbUser = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err
    }else{
        console.log('Connected to the SQlite database.');
        dbUser.run(`CREATE TABLE user (
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
                /*var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                dbUser.run(insert, ["admin","admin@example.com",md5("admin123456")])
                dbUser.run(insert, ["user","user@example.com",md5("user123456")])*/
            }
        })
    }
});


module.exports = dbUser;