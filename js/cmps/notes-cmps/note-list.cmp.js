'use strict';

import notePreview from '../notes-cmps/note-preview.cmp.js'

export default {
    name: 'note-list',
    props: ['notes'],
    template: `
        <ul class="clean-list flex space-around wrap">
            <li v-for="note in notes" :key="note.id">
                <note-preview :note="note"></note-preview>
            </li>
        </ul>
    `,
    components: {
        notePreview
    }
}