const mongoose = require("mongoose");

const wikiSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        required: true
    },
    author: {
        type: String,
        maxlength: 20,
        required: true
    },
    urlName: {
        type: String,
        required: true,
        index: {
            unique: true,
            collation: { locale: "en", strength: 2 }
        },
        maxlength: 20,
        match: /^[a-zA-Z0-9-_]+$/
    },
    html: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Art", "History", "Science", "Technology"],
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    pageViews: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model("Wiki", wikiSchema);