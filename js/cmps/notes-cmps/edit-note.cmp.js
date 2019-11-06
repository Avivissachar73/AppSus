'use strict';

import notesService from '../../services/notes-service.js'

export default {
    name: 'edit-note',
    props: ['noteId', 'type'],
    template: `
        <section>
            <h1>DETAILS_COME_HERE</h1>
            <button>close</button>
            <form @submit.prevent="">
                <input type="text" placeholder="Title" v-model="note.title"/>
                <input v-if="urlCondition" type="text" placeholder="url" v-model="note.url"/>
                <textarea v-if="txtCondition" type="text" placeholder="Text" v-model="note.txt"/>
            </form>
            {{note}}
        </section>
    `,
    data() {
        return {
            note: {}
        }
    },
    computed: {
        urlCondition() {
            return this.note.type === 'video' || this.note.type === 'image';
        },
        txtCondition() {
            return this.note.type === 'text';
        }
    },
    methods: {
        getNote() {
            if (!this.noteId) {
                this.note = notesService.getNewNote(this.type);
                return;
            }
            notesService.getNoteById(this.noteId)
                .then(note => this.note = note);
        }
    },
    created() {
        // this.getNote();
    }
}