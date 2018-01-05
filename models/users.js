
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({

        firstName : {
            type:String,
            required: true
        },
        lastName:{
            type:String,
            required:true
        },
        emailId:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        confirmPassword:{
            type:String,
            required:true
        },
        admin:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps:true
    });

userSchema.methods.getName = function () {
    return(this.firstName + ' ' + this.lastName);
};

userSchema.plugin(passportLocalMongoose);

var Users = mongoose.model('User',userSchema);

module.exports = Users;
