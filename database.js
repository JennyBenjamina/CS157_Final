const mongoose = require("mongoose");
module.exports = mongoose.connect(
    process.env.MONGODB || "mongodb+srv://cs157:cs157@cs-157.tjrkt.mongodb.net/wikiDB?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },

    function(err) {
        if(!err){
            console.log("connected");
        }else{
            console.log(err);
        }
    }

);
