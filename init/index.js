const mongoose = require("mongoose");
const initdata = require("./data.js");

const listing = require("../models/listing.js");

const urlmdb = "mongodb://127.0.0.1:27017/NestQuest";

main().then(() =>{
    console.log("server connected successfully");
}).catch(err =>{
        console.log(err);
});

async function main() {
    await mongoose.connect(urlmdb);
}

const initdb = async () =>{
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("Database was initialised");
}

initdb();