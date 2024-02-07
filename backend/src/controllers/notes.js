/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { Types } = require("mongoose");
const Notes = require("../models/Notes");
const User = require("../models/User");

async function createNote(req, res) {
    try {
        const noteDataToSave = {
            author: {
                authorID: req?.user?.userID,
                authorName: req?.user?.username,
            },
            title: req?.body?.title,
            description: req?.body?.description,
            tags: req?.body?.tags,
            date: req?.body?.date,
        }
        const note = await Notes.create(noteDataToSave);
        res.status(200).json({ message: 'Your notes Saved Successfully...', data: note })
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: 'Internal Server Error', });
    }
}

async function notesList(req, res) {
    try {
        const list = await Notes.find({}, { title: 1, author: 1 }).lean();
        if (list.length < 1) {
            return res.json({ message: "You haven't created notes yet..." })
        }
        return res.status(200).json({ message: "Notes Fetched Successfully", userLoggedIn: req.user, totalResults: list.length, results: list })
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: 'Internal Server Error', });
    }
}

async function notesDetails(req, res) {
    try {
        const list = await Notes.find(
            {
                _id: req?.params?.ID
            }, {}).lean();
        if (list.length < 1) {
            return res.json({ message: "Note not found..." })
        }
        return res.status(200).json({ totalResults: list.length, results: list })
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: 'Internal Server Error', });
    }
}

async function updateNote(req, res) {
    try {
        const noteID = req?.params?.ID;
        const existingNote = await Notes.findById({ _id: noteID });
        if (!existingNote) {
            return res.status(400).json({ message: "Note does not exist!!!" });
        }
        const updatedNote = await Notes.findByIdAndUpdate(noteID, {
            $set: req.body,
        }, { new: true });
        return res.status(200).json({ message: "Note Updated...", })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error..." })
    }
}

async function deleteNote(req, res) {
    try {
        const noteID = req?.params?.ID;
        const existingNote = await Notes.findById({ _id: noteID });
        if (!existingNote) {
            return res.status(400).json({ message: "Note does not exist!!!" });
        }
        await Notes.findByIdAndDelete(noteID, {});
        return res.status(200).json({ message: "Note Deleted...", })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error..." })
    }
}

async function uploadImage(req, res) {
    res.status(201).json({ message: "This will upload image" });
}

module.exports = { createNote, notesList, notesDetails, updateNote, deleteNote, uploadImage }