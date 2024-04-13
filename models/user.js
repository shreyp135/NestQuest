const mongoose =  require("mongoose");
const schema = mongoose.Schema;     
const plm =require("passport-local-mongoose");

const userSchema =new schema({
    email:{
        type:String,
        required:true,
    },

});

userSchema.plugin(plm);

module.exports = mongoose.model("user",userSchema);

