'use strict';

import notesService from '../../services/notes-service.js'

export default {
    name: 'edit-note',
    // props: ['noteId', 'type'],
    props: ['noteId'],
    template: `
        <section v-if="note">
            <h2>EDIT_NOTE</h2>
            <button>close</button>
            <form @submit.prevent="onSaveNote">
                <input type="text" placeholder="Title" v-model="note.title"/>
                <textarea v-if="txtCondition" type="text" placeholder="Text" v-model="note.txt"/>
                <input v-if="urlCondition" type="text" placeholder="url" v-model="note.url"/>
                <div>
                    <div>
                        <label for="newNoteBgc">bgColor</label>
                        <input id="newNoteBgc" type="color" v-model="note.style['background-color']">
                    </div>
                    <div>
                        <label for="newNoteColor">Color</label>
                        <input id="newNoteColor" type="color" v-model="note.style['color']">
                    </div>
                </div>
                <button>Save</button>
            </form>
            <pre>{{note}}</pre>
        </section>
    `,
    data() {
        return {
            note: null,
            type: 'audioNote'
        }
    },
    computed: {
        urlCondition() {
            return this.note.type === 'videoNote' || this.note.type === 'imageNote' || this.note.type === 'audioNote';
        },
        txtCondition() {
            return this.note.type === 'textNote';
        }
    },
    methods: {
        getNote() {
            if (!this.noteId) {
                notesService.getNewNote(this.type)
                    .then(note => this.note = note);
                return;
            } else {
                notesService.getNoteById(this.noteId)
                    .then(note => this.note = note);
            }
        },
        onSaveNote() {
            if (!this.note.title) return;
            notesService.saveNote(this.note)
                .then(() => {
                    console.log('note was saved successfullyS');
                    this.note = notesService.getNewNote(this.type)
                        .then(note => this.note = note);
                })
        }
    },
    created() {
        this.getNote();
    }
}