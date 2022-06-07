const fs = require('fs');
const path = require('path');

function filterByQuery(query, notesArr) {
    let filteredResults = notesArr;

    if (query.title) {
        filteredResults = filteredResults.filter(
            (note) => note.title === query.title
        );
    }
    return filteredResults;
}

function findById(id, notesArr) {
    const result = notesArr.filter((note) => note.id === id)[0];
    return result;
}

function createNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    return true;
}

function deleteNote(note, notes) {
    const index = notes.indexOf(note);
    notes.splice(index, 1);
    fs.writeFileSync(
        path.join(__dirname, '../db/notes.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return notes;
}

module.exports = { filterByQuery, findById, createNote, validateNote, deleteNote }; 