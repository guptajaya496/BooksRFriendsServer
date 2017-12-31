
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema({

        title : {
            type:String,
            required: true,
            unique:true
        },
        author:{
            type:String,
            required:true
        },
        publication : {
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        path:{
            type:String,
            required:true
        },
        featured:{
            type:String,
            required:true,
            default:''
        },
        postedBy:{
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    });

var Books = mongoose.model('Book',bookSchema);

module.exports = Books;
