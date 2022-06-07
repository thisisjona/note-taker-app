const router = require('express').Router();
const { filterByQuery, findById, createNote, validateNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/notes');
//all notes
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
//single note
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});
//post
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send("The note is not properly formatted!");
    } else {
        const note = createNote(req.body, notes);
        res.json(req.body);
    }
//delete note
    router.delete('/notes/:id', (req, res) => {
        const result = findById(req.params.id, notes);
        if (result) {
            deleteNote(result, notes);
            res.json(result);
        } else {
            res.sendStatus(404);
        }
    })    
});

module.exports = router;