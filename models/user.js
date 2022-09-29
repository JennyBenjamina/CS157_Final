const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 20
    },
    username: {
        type: String,
        required: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2}
        }
    },
    password: {
        type:String,
        required: true

    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user"
    }
})

module.exports = mongoose.model("User", userSchema);
//maybe put this in somewhere else?
//        match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ //Minimum eight characters, at least one letter, one number and one special character