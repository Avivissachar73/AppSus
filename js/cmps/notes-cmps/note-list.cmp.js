'use strict';

import notePreview from '../notes-cmps/note-preview.cmp.js'

export default {
    name: 'note-list',
    props: ['notes'],
    template: `
        <!-- <ul class="clean-list flex space-around wrap"> -->
        <ul class="clean-list note-list">
            <li v-for="note in sortedNotes" :key="note.id">
                <note-preview :note="note"></note-preview>
            </li>
        </ul>
    `,
    components: {
        notePreview
    },
    computed: {
        sortedNotes() {
            return this.notes.sort((note1, note2) => {
                return (note1.isPined)? -1 : 1;
            })
        },
    }
}