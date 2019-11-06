'use strict';

import notesService from '../services/notes-service.js';

import noteList from '../cmps/notes-cmps/note-list.cmp.js';
import noteEdit from '../cmps/notes-cmps/edit-note.cmp.js'
import notesSearch from '../cmps/notes-cmps/note-search.cmp.js'

export default {
    name: 'miss-keep',
    template: `
        <section>
            <header class="flex space-around">
                <h2>My notes</h2>
                <notes-search @search="onSearch"></notes-search>
            </header>
            <note-list :notes="notesToShow"></note-list>
            <note-edit></note-edit>
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
                       ((note.type === 'text')? note.txt.toLowerCase().includes(this.filterBy.searchStr.toLowerCase()) : false)) &&
                       (this.filterBy.type === 'All' || note.type === this.filterBy.type);
            })
        }
    },
    methods: {
        onSearch(filterBy) {
            this.filterBy = filterBy;
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
        noteEdit,
        notesSearch
    }
};
