'use strict';

import notesService from '../services/notes-service.js';

import noteList from '../cmps/notes-cmps/note-list.cmp.js';

export default {
    name: 'miss-keep',
    template: `
        <section>
            <h2>My notes</h2>
            <note-list :notes="notes"></note-list>
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created() {
        notesService.getNotes()
            .then(notes => {
                this.notes = notes;
                console.log(this.notes)
            });
    },
    components: {
        noteList,
    }
};
