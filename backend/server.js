let express = require("express");
let app = express();
let db = require("./database.js");
let userDB = require("./userDatabase.js");
let md5 = require("md5");
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
let HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
console.log(userDB);
console.log(db);

//POSTMAN WITH USERS



app.get("/api/users", (req, res, next) => {
    var sql = "select * from user";
    var params = [];
    userDB.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    userDB.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});


app.post("/api/user/", (req, res, next) => {
    var errors=[];
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    };
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    userDB.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});



app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : undefined
    };
    userDB.run(
        `UPDATE user set 
           name = coalesce(?,name), 
           email = COALESCE(?,email), 
           password = coalesce(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message});
                return;
            }
            res.json({
                message: "success",
                data: data
            })
        });
});


app.delete("/api/user/:id", (req, res, next) => {
    userDB.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message});
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
        });
});


app.get("/api/flowers/db", (req, res, next) => {
    var name = req.body.name;
    let sql = "select DISTINCT (NAME,GENUS, SPECIES ) from 'sightings'";
    db.all(sql, name, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            rows
        })
    });
});

//Post request to return the 10 most recent sightings of a flower.
//If there are fewer than 10 sightings, it returns how many
//If there are no sightings, will display err pop-up from frontend

app.post("/api/sightings", (req, res, next) => {
    var name = req.body.name;
    let sql = "select * from 'sightings' where name = ? ORDER BY date(sighted) LIMIT 10";
    let params = [name];
    db.all(sql, name, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            rows
        })
    });
});

app.patch("/api/flowers/update", (req, res, next) => {
    var data = {
        genus: req.body.genus,
        species: req.body.species,
        comName: req.body.name
    }
    db.run( //SHOULD NOT BE ABLE TO UPDATE THE COMMON NAME OF A FLOWER ALREADY IN TE DATABASE
            `UPDATE flowers set 
           genus = coalesce(?,genus),
           species = COALESCE(?,species), 
           comname = coalesce(?,comname) 
           WHERE comname = ?`,
        [data.genus, data.species, data.comName, req.params.comName],
        (err, result) => {
            if (err) {
                res.status(400).json({"error": res.message});
                return;
            }
            res.json({
                message: "success",
                data: data
            })
        });
});

app.post("/api/flower/sighting", (req, res, next) => {
//LET USER ADD NEW FLOWER *ONLY* IN UPDATE METHOD
    var errors = [];
    if (!req.body.name) {
        errors.push("No flower name specified");
    }
    if (!req.body.person) {
        errors.push("No person name specified");
    }
    if (!req.body.location) {
        errors.push("No location name specified");
    }
    if (!req.body.sighted) {
        errors.push("No date specified");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        person: req.body.person,
        location: req.body.location,
        sighted: req.body.sighted
    };
    var sql = 'INSERT INTO sightings (name, person, location, sighted) VALUES (?,?,?,?)'
    var params = [data.name, data.person, data.location, data.sighted];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            //this.lastSighting??????
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
});


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});