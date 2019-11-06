'use strict';

import utils from './util-service.js';

const NOTES_STOREGE_KEY = 'my_notes';

export default {
    getNotes,
    pinNote,
    getNoteById,
    removeTodo,
    addTodo,
    markTodo,
    removeNote
};

var gNotes;

function getNewNote(noteType) {
    if (noteType === textPreview) {
        return Promise.resolve({
            id: utils.getRandomId(),
            type: textPreview,
            txt: '',
            title: '',
            style: {}
        })
    }
}

function removeNote(noteId) {
    var idx = gNotes.findIndex(note => note.id === noteId);
    gNotes.splice(idx, 1);
    return saveNotesToStorage();
}

function markTodo(noteId, todoId) {
    var note = gNotes.find(note => note.id === noteId);
    var todo = note.todos.find(todo => todo.id === todoId);
    todo.isDone = !todo.isDone;
    return saveNotesToStorage();
} 

function saveNotesToStorage() {
    return utils.saveToLocalStorage(NOTES_STOREGE_KEY, gNotes);
}

function addTodo(noteId, txt) {
    var note = gNotes.find(note => note.id === noteId);
    note.todos.unshift(createTodo(txt));
    
    return saveNotesToStorage();;
}

function removeTodo(noteId, todoId) {
    var note = gNotes.find(note => note.id === noteId);
    var todoIdx = note.todos.findIndex(todo => todo.id === todoId);

    note.todos.splice(todoIdx, 1);
    return saveNotesToStorage();;
}

function getNoteById(id) {
    return Promise.resolve(gNotes.find(note => note.id === id));
}

function pinNote(noteId) {
    var note = gNotes.find(note => note.id === noteId);
    note.isPined = !note.isPined;
    return saveNotesToStorage();
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

function createTodo(txt) {
    return {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        txt,
        isDone: false
    }
}

var someNotes = [
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'textPreview',
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
        createdAt: Date.now(),
        type: 'imagePreview',
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
        createdAt: Date.now(),
        type: 'videoPreview',
        title: 'my video',
        url: 'https://www.youtube.com/embed/otrH5hxJ2GE',
        style: {
            'background-color': 'lightgreen',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'audioPreview',
        title: 'my audio',
        url: 'https://www.youtube.com/embed/TO8hj4b6zOk',
        style: {
            'background-color': 'lightgreen',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'todoPreview',
        title: 'my todo',
        todos: [
            {
                id: utils.getRandomId(),
                createdAt: Date.now(),
                txt: 'todlkjhgdotodo',
                isDone: false
            },
            {
                id: utils.getRandomId(),
                createdAt: Date.now(),
                txt: 'toLOREMdo',
                isDone: false
            },
            {
                id: utils.getRandomId(),
                createdAt: Date.now(),
                txt: 'todotodotodotodo',
                isDone: false
            },
        ],
        style: {
            'background-color': 'lightgreen',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
];