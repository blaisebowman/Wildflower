const mongoose = require('mongoose'),
    sqlite = require('sqlite'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
});

userSchema.pre('save', function(next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.created_at){
        this.created_at = currentDate;
    }
    next();
});

const User = sqlite.model('User', userSchema);

module.exports = User;


