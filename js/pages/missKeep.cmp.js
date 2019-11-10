'use strict';

import notesService from '../services/miss-keep-services/notes-service.js';

import noteList from '../cmps/notes-cmps/note-list.cmp.js';
import noteEdit from '../cmps/notes-cmps/edit-note.cmp.js'
import notesSearch from '../cmps/notes-cmps/note-search.cmp.js'
import confirmAlert from '../cmps/alert.cmp.js';

export default {
    name: 'miss-keep',
    template: `
        <section class="notes-keep-app">
            <confirm-alert></confirm-alert>
            <!-- <button @click="clearStorage">clear local storage</button> -->
            <header class="flex space-between wrap">
                <h2>My notes</h2>
                <note-edit @noteChanged="onNoteChange"></note-edit>
                <notes-search @search="onSearch"></notes-search>
            </header>
            <!-- <note-list :notes="notesToShow"></note-list> -->
            <note-list v-if="pinedNotes.length > 0" class="pinned-notes" :notes="pinedNotes"></note-list>
            <note-list :notes="unPinedNotes"></note-list>
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: null
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;

            return this.notes.filter(note => {
                return (note.title.toLowerCase().includes(this.filterBy.searchStr.toLowerCase()) ||
                       ((note.type === 'textNote')? note.txt.toLowerCase().includes(this.filterBy.searchStr.toLowerCase()) : false)) &&
                       (this.filterBy.type === 'All' || note.type === this.filterBy.type);
            })
        },
        pinedNotes() {
            return this.notesToShow.filter(note => note.isPined);
        },
        unPinedNotes() {
            return this.notesToShow.filter(note => !note.isPined);
        },
    },
    methods: {
        getNotes() {
            notesService.getNotes()
                .then(notes => {
                    this.notes = notes;
                    console.log(this.notes)
                });
        },
        onSearch(filterBy) {
            this.filterBy = filterBy;
        },
        clearStorage() {
            localStorage.clear();
        },
        onNoteChange() {
            this.getNotes();
        }
    },
    created() {
        this.getNotes();
    },
    components: {
        noteList,
        noteEdit,
        notesSearch,
        confirmAlert
    }
};
