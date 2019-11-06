'use strict';

import utils from './util-service.js';

const NOTES_STOREGE_KEY = 'my_notes';

export default {
    getNotes,
    pinNote
};

console.log(utils.getRandomId());

var gNotes;


function pinNote(noteId) {
    var note = gNotes.find(note => note.id === noteId);
    note.isPined = !note.isPined;
    utils.saveToLocalStorage(NOTES_STOREGE_KEY, gNotes)
    console.log('note', note.id, 'is pined', note.isPined);
}

function getNotes() {
    return new Promise((resolve, reject) =>  {
        utils.loadFromLocalStorage(NOTES_STOREGE_KEY)
            .then(notes => {
                gNotes = notes;
                resolve(gNotes);
            })
            .catch(err => {
                console.log(err);
                gNotes = someNotes;
                resolve(gNotes);
            })
    })
}

var someNotes = [
    {
        id: utils.getRandomId(),
        type: 'text',
        title: 'my note',
        txt: 'some note\nLorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, consequuntur distinctio est vitae optio, nihil assumenda fugit ad blanditiis nesciunt ducimus incidunt quo facilis aliquid obcaecati, quos corporis doloribus vero.',
        style: {
            'background-color': '#000',
            'font-family': 'Arial',
            'color': 'red',
            'font-style': 'italic',
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        type: 'image',
        title: 'my image',
        url: 'http://vignette1.wikia.nocookie.net/marveldatabase/images/a/a9/Spider-Man_Vol_1_1.jpg/revision/latest?cb=20080331205551',
        style: {
            'background-color': 'aqua',
            'font-family': 'sans-serif',
            'color': 'blue'
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        type: 'video',
        title: 'my video',
        url: 'https://www.youtube.com/embed/otrH5hxJ2GE',
        style: {
            'background-color': 'lightgreen',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
];