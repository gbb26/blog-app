const { Schema, model } = require("mongoose");

const notesSchema = Schema({
    author: {
        authorID: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        authorName: {
            type: Schema.Types.String,
            ref: 'user',
            required: true,
        }
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Users = model('notes', notesSchema);
module.exports = Users;