'use strict';

import notesService from '../../services/miss-keep-services/notes-service.js';

import notePalateEdit from '../notes-cmps/color-edit.cmp.js';

import {eventBus} from '../../services/event-bus-service.js';

import mapNote from './note-edit-cmps/map-note-edit.cmp.js';
import todoNote from './note-edit-cmps/todo-note-edit.cmp.js';

export default {
    name: 'edit-note',
    template: `
        <section>
            <section class="add-note-container">
                <div class="add-note-radios flex align-center space-around wrap">
                    <div v-for="item in radioButtons"  class="flex">
                        <button class="flex align-center justify-center"><label class="flex align-center justify-center" :for="item.val"><span v-html="item.txt"></span></label></button>
                        <input :id="item.val" type="radio" :value="item.val" v-model="type"/>
                    </div>
                </div>
            </section>

            <section  v-if="note" :style="note.style" class="note-edit-modal flex column align-center justify-center">
                <button class="close-modal-button" @click="onClose">&#10005;</button>

                <form @submit.prevent="onSaveNote" class="note-edit-form flex column flex-start">
                    <h3>{{title}}</h3>
                    <input type="text" placeholder="Title" v-model="note.title"/>

                    <textarea v-if="txtCondition" type="text" placeholder="Text" v-model="note.txt"/>
                    <input v-if="urlCondition" type="text" placeholder="url" v-model="note.url"/>
                    
                    <div v-if="note.type === 'todoNote'">
                        <todo-note :note="note" class="note-data"></todo-note>
                    </div>

                    <div v-if="note.type === 'mapNote'">
                        <map-note :note="note" :isEdit="true" class="note-data"></map-note>
                    </div>
                    <button>Save</button>
                </form>
                    
                <div class="new-note-styling flex column align-center width-all">
                    <div class="color-palate-container flex column align-center">
                        <div v-for="(colors, key) in colorPalate" class="flex column align-center space-around width-all">
                            <h5>{{key}}</h5>
                            <div class="color-palate flex space-between width-all">
                                <div v-for="(color, idx) in colors" class="flex colors">
                                    <label class="palate-color" :class="{'selected-color': color === note.style[key]}" :for="key+idx" :style="{'background-color': color}"></label>
                                    <input type="radio" :id="key+idx" :value="color" v-model="note.style[key]"/>
                                </div>
                            </div>
                        </div>
                        <button class="edit-color-palate-btn" @click.prevent.stop="onToggleEditPalate">Edit Colors</button>
                        <note-palate-edit v-if="isEditColorPalate" @saveColorPalate="onToggleEditPalate(true)" @closeColorPalate="onToggleEditPalate"></note-palate-edit>
                    </div>
                    <div class="flex align-center space around wrap width-all">
                        <label for="fontFamily">font:</label>
                        <select id="fontFamily" v-model="note.style['font-family']" placeholder="font">
                            <option :value="'Arial'" label="Arial"/>
                            <option :value="'Nanum Gothic'" label="Nanum Gothic"/>
                            <option :value="'sans-serif'" label="sans-serif"/>
                        </select>
                        <!-- <input type="text" list="fontFamily" v-model="note.style['font-family']" placeholder="font"/>
                        <datalist id="fontFamily">
                            <option :value="'Arial'" label="Arial"/>
                            <option :value="'Nanum Gothic'" label="Nanum Gothic"/>
                            <option :value="'sans-serif'" label="sans-serif"/>
                        </datalist> -->
                        <label for="fontStyle">style:</label>
                        <select id="fontStyle" v-model="note.style['font-style']" placeholder="style">
                            <option :value="'italic'" label="italic"/>
                            <option :value="'normal'" label="normal"/>
                        </select>
                    </div>
                </div>
            </section>
        </section>
    `,
    data() {
        return {
            note: null,
            type: '',
            noteId: '',
            isEditColorPalate: false,
            colorPalate: null,
            radioButtons: [{val: 'textNote', txt: '&tcaron;'},{val: 'imageNote', txt: '&#10064;'},{val: 'videoNote', txt: '▷'},{val: 'audioNote', txt: '&#9833;'},{val: 'todoNote', txt: '&#9776;'},{val: 'mapNote', txt: '&#9906;'}]
            // radioButtons: [{val: 'textNote', txt: 'T'},{val: 'imageNote', txt: 'I'},{val: 'videoNote', txt: '▷'},{val: 'audioNote', txt: 'A'},{val: 'todoNote', txt: 'D'},{val: 'mapNote', txt: 'M'}]

        }
    },
    computed: {
        urlCondition() {
            return this.note.type === 'videoNote' || this.note.type === 'imageNote' || this.note.type === 'audioNote';
        },
        txtCondition() {
            return this.note.type === 'textNote';
        },
        title() {
            if (this.type) {
                if (this.type === 'textNote') return 'Add Text';
                if (this.type === 'audioNote') return 'Add Audio';
                if (this.type === 'videoNote') return 'Add Video';
                if (this.type === 'todoNote') return 'Add List';
                if (this.type === 'imageNote') return 'Add Image';
                if (this.type === 'mapNote') return 'Add map';
            }
            
            if (this.note) {
                if (this.note.type === 'textNote') return 'Edit Text';
                if (this.note.type === 'audioNote') return 'Edit Audio';
                if (this.note.type === 'videoNote') return 'Edit Video';
                if (this.note.type === 'todoNote') return 'Edit List';
                if (this.note.type === 'imageNote') return 'Edit Image';
                if (this.note.type === 'mapNote') return 'Edit map';
            }
        }
    },
    methods: {
        getNote() {
            if (!this.noteId) {
                return notesService.getNewNote(this.type)
                    .then(note => this.note = {...note});
            } else {
                return notesService.getNoteById(this.noteId)
                    .then(note => this.note = {...note});
            }
        },
        saveNote() {
            notesService.saveNote(this.note)
                .then(() => {
                    this.$emit('noteChanged');
                    this.onClose();
                })
        },
        onSaveNote() {
            if (!this.note.title) {
                eventBus.$emit('Alert', 'You need to enter a title to your note.')
                return;
            }
            eventBus.$emit('Confirm', 'Confirm changes', this.saveNote);
        },
        onClose() {
            this.noteId = '';
            this.type = '';
            this.isEditColorPalate = false;
            this.note = null;
        },
        getColorPalate() {
            notesService.getColorPalate()
                .then(colorPalate => {
                    this.colorPalate = {...colorPalate};
                    for (let key in this.colorPalate) {
                        this.colorPalate[key] = [...this.colorPalate[key]];
                    }
                });
        },
        onToggleEditPalate(isReLoadColors) {
            this.isEditColorPalate = !this.isEditColorPalate;
            if (isReLoadColors) this.getColorPalate();
        },
    },
    created() {
        eventBus.$on('editNote', (noteId) => {
            this.noteId = noteId;
        })
        this.getColorPalate();
    },
    watch: {
        type() {
            if (this.type) this.getNote()
        },
        noteId() {
            if (this.noteId) this.getNote()
        },
    },
    components: {
        notePalateEdit,
        mapNote,
        todoNote
    }
}