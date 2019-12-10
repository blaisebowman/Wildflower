const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt,
    mongoose = require("mongoose"),
    Student = require("../models/students.model");
// keys = require("./config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY || require("./config").secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Student.findById(jwt_payload.id)
                .then(student => {
                    if(student){
                        return done(null, student);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};