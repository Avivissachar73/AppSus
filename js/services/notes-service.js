'use strict';

import utils from './util-service.js';

const NOTES_STOREGE_KEY = 'my_notes';

export default {
    getNotes
};

console.log(utils.getRandomId());

var gNotes;


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
        type: 'txt',
        title: 'my note',
        txt: 'some note',
        fontColor: 'balck',
        fontFamily: 'Arial',
    },
    {
        type: 'picture',
        title: 'my picture',
        url: 'http://vignette1.wikia.nocookie.net/marveldatabase/images/a/a9/Spider-Man_Vol_1_1.jpg/revision/latest?cb=20080331205551'
    },
    {
        type: 'video',
        title: 'my video',
        url: 'https://www.youtube.com/embed/otrH5hxJ2GE'
    },
];