
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var favoriteSchema = new Schema({

        postedBy:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        books:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref :'Books',
                required:true
            }
        ]
    },
    {
        timestamps:true
    });

var Favorites = mongoose.model('Favorite',favoriteSchema);

module.exports = Favorites;
