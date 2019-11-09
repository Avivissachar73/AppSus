'use strict';

import notesService from '../../services/notes-service.js';

import notePalateEdit from '../notes-cmps/color-edit.cmp.js';

import {eventBus} from '../../services/event-bus-service.js';

export default {
    name: 'edit-note',
    template: `
        <section>
            <!-- <form class="add-note-container flex align-center space-between"> -->
            <form class="add-note-container">
                <!-- <h4>Add:</h4> -->
                <div class="add-note-radios flex align-center space-around">
                    <div class="flex">
                        <button class="flex align-center justify-center"><label class="flex align-center justify-center" for="textRadio">&tcaron;</label></button>
                        <!-- <label class="flex align-center justify-center" for="textRadio"><button class="flex align-center justify-center">&tcaron;</button></label> -->
                        <input id="textRadio" type="radio" value="textNote" v-model="type"/>
                    </div>
                    <div class="flex">
                        <button class="flex align-center justify-center"><label class="flex align-center justify-center" for="imageRadio">&#10064;</label></button>
                        <!-- <label class="flex align-center justify-center" for="imageRadio"><button class="flex align-center justify-center">&#10064;</button></label> -->
                        <input id="imageRadio" type="radio" value="imageNote" v-model="type"/>
                    </div>
                    <div class="flex">
                        <button class="flex align-center justify-center"><label class="flex align-center justify-center" for="videoRadio">▷</label></button>
                        <!-- <label class="flex align-center justify-center" for="videoRadio"><button class="flex align-center justify-center">▷</button></label> -->
                        <input id="videoRadio" type="radio" value="videoNote" v-model="type"/>
                    </div>
                    <div class="flex">
                        <button class="flex align-center justify-center"><label class="flex align-center justify-center" for="audioRadio">&#9833;</label></button>
                        <!-- <label class="flex align-center justify-center" for="audioRadio"><button class="flex align-center justify-center">&#9833;</button></label> -->
                        <input id="audioRadio" type="radio" value="audioNote" v-model="type"/>
                    </div>
                    <div class="flex">
                        <button class="flex align-center justify-center"><label class="flex align-center justify-center" for="todoRadio">&#9776;</label></button>
                        <!-- <label class="flex align-center justify-center" for="todoRadio"><button class="flex align-center justify-center">&#9776;</button></label> -->
                        <input id="todoRadio" type="radio" value="todoNote" v-model="type"/>
                    </div>
                </div>
            </form>

            <section  v-if="noteId || type" :style="note.style" class="note-edit-modal flex align-center justify-center">
            <!-- <section  v-if="note" class="note-edit-modal flex align-center justify-center"> -->
                <button class="close-modal-button" @click="onCloseEdit">&#10005;</button>

                <form @submit.prevent="onSaveNote" class="note-edit-form flex column flex-start">
                    <h3>{{title}}</h3>
                    <input type="text" placeholder="Title" v-model="note.title"/>
                    <textarea v-if="txtCondition" type="text" placeholder="Text" v-model="note.txt"/>
                    <input v-if="urlCondition" type="text" placeholder="url" v-model="note.url"/>
                    
                    <div v-if="note.todos">
                        <form @submit.prevent.stop="onAddTodo" class="flex">
                            <input type="text" placeholder="Add todo" v-model="newTodoTxt"/>
                            <button>+</button>
                        </form>
                        <ul class="clean-list">
                            <li v-for="(todo, idx) in note.todos">
                                <button @click.stop.prevent="onRemoveTodo(idx)">X</button>
                                {{todo.txt}}
                            </li>
                        </ul>
                    </div>
                    
                    <div class="new-note-styling flex column align-center">
                        <div class="color-palate-container flex column">
                            <div v-for="(colors, key) in colorPalate" class="flex column">
                                {{key}}
                                <div class="color-palate flex space-between margin-bottom-5px">
                                    <div v-for="(color, idx) in colors" class="flex margin-bottom-5px">
                                        <label class="palate-color" :class="{'selected-color': color === note.style[key]}" :for="colorPalate[key]+idx" :style="{'background-color': color}"></label>
                                        <input type="radio" :id="colorPalate[key]+idx" :value="color" v-model="note.style[key]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="edit-color-palate-btn" @click.prevent.stop="onToggleEditPalate">Edit Colors</button>
                        
                        <note-palate-edit v-if="isEditColorPalate" @saveColorPalate="onToggleEditPalate(true)" @closeColorPalate="onToggleEditPalate"></note-palate-edit>
                    </div>
                    <button>Save</button>
                </form>
            </section>
        </section>
    `,
    data() {
        return {
            note: null,
            type: '',
            noteId: '',
            newTodoTxt: '',
            isEditColorPalate: false,
            colorPalate: null,
            currEditColorIdx: -1
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
            }
            
            if (this.note) {
                if (this.note.type === 'textNote') return 'Edit Text';
                if (this.note.type === 'audioNote') return 'Edit Audio';
                if (this.note.type === 'videoNote') return 'Edit Video';
                if (this.note.type === 'todoNote') return 'Edit List';
                if (this.note.type === 'imageNote') return 'Edit Image';
            }
        }
    },
    methods: {
        getNote() {
            if (!this.noteId) {
                notesService.getNewNote(this.type)
                    .then(note => this.note = {...note});
                return;
            } else {
                notesService.getNoteById(this.noteId)
                    .then(note => this.note = {...note});
            }
        },
        saveNote() {
            notesService.saveNote(this.note)
                .then(() => {
                    console.log('note was saved successfullyS');
                    this.$emit('noteChanged');
                    this.onCloseEdit();
                })
        },
        onSaveNote() {
            if (!this.note.title) return;
            eventBus.$emit('Confirm', 'Confirm changes', this.saveNote);
        },
        onAddTodo() {
            this.note.todos.unshift(notesService.createTodo(this.newTodoTxt));
            this.newTodoTxt = '';
        },
        onRemoveTodo(idx) {
            this.note.todos.splice(idx, 1);
        },
        onCloseEdit() {
            this.noteId = '';
            this.type = '';
            this.note = null;
            this.isEditColorPalate = false;
        },
        getColorPalate() {
            notesService.getColorPalate()
                .then(colorPalate => {
                    this.colorPalate = {...colorPalate};
                    for (let key in this.colorPalate) {
                        this.colorPalate[key] = [...this.colorPalate[key]];
                    }
                    console.log(this.colorPalate);
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
        // this.getNote();
    },
    watch: {
        type() {
            this.getNote();
        },
        noteId() {
            this.getNote();
        }
    },
    components: {
        notePalateEdit
    }
}