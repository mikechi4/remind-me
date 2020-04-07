var mongoose = require("mongoose");

var ReminderSchema = new mongoose.Schema({
    reminder: String,
    dueDate: Date,
    user_id: String
});

module.exports = mongoose.model("Reminder", ReminderSchema);