let sqlite3 = require('sqlite3').verbose();
let md5 = require('md5');
const DBSOURCE = "flowers2019.db";
DBSOURCE
//prepend with line 6 in parenthesis withs __dirname +
let db = new sqlite3.Database('flowers2019.db', (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err
    }else{
        console.log('Connected to the Flowers2019 database.');
        /*db.run(`CREATE TABLE user (
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
                /!*var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@example.com",md5("admin123456")])
                db.run(insert, ["user","user@example.com",md5("user123456")])*!/
            }
        })*/
    }
});


module.exports = db;