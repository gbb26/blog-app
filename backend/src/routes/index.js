/* eslint-disable no-undef */
const express = require('express');
const { validateUser, authenticateUser } = require('../middlewares/user-auth');
const { createUser, logInUser, logOutUser, userProfile } = require('../controllers/user-auth');
const { authenticateToken, isTokenBlacklisted } = require('../helpers/jwt-token');
const { validateNotes, validateNoteUpdate } = require('../middlewares/notes');
const { createNote, notesList, notesDetails, updateNote, deleteNote, uploadImage } = require('../controllers/notes');


const router = express.Router();

// Auth api
router.post("/auth/signup", validateUser, createUser);
router.post("/auth/login", authenticateUser, logInUser);
router.post("/auth/logout", authenticateToken, logOutUser);
router.get("/auth/profile", authenticateToken, isTokenBlacklisted, userProfile);

// Notes API Routes
router.post("/notes", authenticateToken, isTokenBlacklisted, validateNotes, createNote);
router.get("/notes", notesList);
router.get("/notes/:ID", authenticateToken, isTokenBlacklisted, notesDetails);
router.patch("/notes/:ID", authenticateToken, isTokenBlacklisted, validateNoteUpdate, updateNote);
router.delete("/notes/:ID", authenticateToken, isTokenBlacklisted, deleteNote);
module.exports = router;
