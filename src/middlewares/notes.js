const { body, validationResult } = require('express-validator');

const validateNotes = [
    body('title').notEmpty().withMessage('Title can not be empty'),
    body('description').notEmpty().withMessage('description can not be empty'),
    body('tags').optional(),
    body('date').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]
const validateNoteUpdate = [
    body('title').optional(),
    body('description').optional(),
    body('tags').optional(),
    body('date').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports = { validateNotes, validateNoteUpdate }