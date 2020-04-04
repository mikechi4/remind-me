var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true
    },
    email: String,
    password: String
});

module.exports = mongoose.model("User", UserSchema);
// Now `require('Item.js')` will return a mongoose Model,
// without needing to do require('Item.js').Item
