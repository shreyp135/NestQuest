const mongoose =  require("mongoose");
const review = require("./review");
const schema = mongoose.Schema;

const listingSchema = new schema ({
    title : {
        type: String,
        required: true, 
    },
    description : String,
    image : {
        type: String,
    },
    price : Number,
    location : String,
    country : String,
    review: [{
         type: schema.Types.ObjectId,
         ref: "review",
    }],
    owner: {
        type : schema.Types.ObjectId,
        ref: "user",
    }
});

const listing  = mongoose.model("listing", listingSchema );

module.exports = listing;
