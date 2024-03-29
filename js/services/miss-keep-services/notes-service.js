'use strict';

import utils from '../util-service.js';
import {currPos} from './map-service.js';

const NOTES_STOREGE_KEY = 'my_notes';

const COLOR_PALATE_KEY = 'my_note_color_palate';

export default {
    getNotes,
    pinNote,
    getNoteById,
    removeTodo,
    addTodo,
    markTodo,
    removeNote,
    getNewNote,
    saveNote,
    createTodo,
    convertYoutubeUrl,
    getColorPalate,
    saveColorPalate
};

var gNotes;
getNotes();

function saveColorPalate(colorPalate) {
    return utils.saveToLocalStorage(COLOR_PALATE_KEY, colorPalate)
        .then(() => Promise.resolve());
}

function getColorPalate() {
    return utils.loadFromLocalStorage(COLOR_PALATE_KEY)
        .then(colors => {
            return colors;
        })
        .catch(() => {
            return {
                'background-color': ['#fff', '#000', '#ffff00', '#ff7f50', '#90ee90', '#add8e6'],
                color: ['#fff', '#000', '#ffff00', '#ff7f50', '#90ee90', '#add8e6']
            };
        })
}

function convertYoutubeUrl(url) {
    if (url.toLowerCase().includes('youtube')) {
        if (url.split('=').length === 1) return url;
        var youtubeId = url.split('=')[1];
        return `https://www.youtube.com/embed/${youtubeId}`;
    }
    else return url;
}

function saveNote(newNote) {
    if (newNote.url && newNote.type === 'videoNote') newNote.url = convertYoutubeUrl(newNote.url)
    
    var noteIdx = gNotes.findIndex(note => note.id === newNote.id);
    if (noteIdx !== -1) {
        gNotes.splice(noteIdx, 1, newNote);
    }
    else gNotes.unshift(newNote);
    return saveNotesToStorage()
        .then(() => Promise.resolve(newNote));
}

function getNewNote(noteType) {
    var newNote = {
        id: utils.getRandomId(),
        type: noteType,
        createdAt: Date.now(),
        title: '',
        style: {},
        isPined: false
    } 
    if (noteType === 'textNote') newNote.txt = '';
    if (noteType === 'audioNote' || 
        noteType === 'videoNote' || 
        noteType === 'imageNote') newNote.url = '';
    if (noteType === 'todoNote') newNote.todos = [];
    // if (noteType === 'mapNote') newNote.pos = {lat: 0, lng: 0};
    if (noteType === 'mapNote') {
        newNote.pos = {...currPos};
        newNote.searchStr = 'Jerusalem';
    }
    
    return Promise.resolve(newNote);
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
        type: 'textNote',
        title: 'my note',
        txt: 'some note\nLorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, consequuntur distinctio est vitae optio, nihil assumenda fugit ad blanditiis nesciunt ducimus incidunt quo facilis aliquid obcaecati, quos corporis doloribus vero.',
        style: {
            'background-color': '#676262',
            'font-family': 'Arial',
            'color': 'red',
            'font-style': 'italic',
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'imageNote',
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
        type: 'videoNote',
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
        type: 'audioNote',
        title: 'my audio',
        url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        style: {
            'background-color': 'lightblue',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'todoNote',
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
            'background-color': 'yellow',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'mapNote',
        title: 'my map',
        pos: {lat: 32.0749831, lng: 34.9120554},
        searchStr: 'Jerusalem',
        style: {
            'background-color': 'coral',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'textNote',
        title: 'my note',
        txt: 'some note\nLorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, consequuntur distinctio est vitae optio, nihil assumenda fugit ad blanditiis nesciunt ducimus incidunt quo facilis aliquid obcaecati, quos corporis doloribus vero.',
        style: {
            'background-color': '#676262',
            'font-family': 'Arial',
            'color': 'red',
            'font-style': 'italic',
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'imageNote',
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
        type: 'videoNote',
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
        type: 'audioNote',
        title: 'my audio',
        url: 'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        style: {
            'background-color': 'lightblue',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'todoNote',
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
            'background-color': 'yellow',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
    {
        id: utils.getRandomId(),
        createdAt: Date.now(),
        type: 'mapNote',
        title: 'my map',
        pos: {lat: 32.0749831, lng: 34.9120554},
        searchStr: 'Jerusalem',
        style: {
            'background-color': 'coral',
            'font-family': '',
            'color': 'red'
        },
        isPined: false
    },
];