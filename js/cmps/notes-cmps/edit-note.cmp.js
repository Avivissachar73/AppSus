'use strict';

import notesService from '../../services/notes-service.js';

import {eventBus} from '../../services/event-bus-service.js';

export default {
    name: 'edit-note',
    // props: ['noteId'],
    template: `
        <section>
            <!-- <h2>EDIT_NOTE</h2> -->

            <form class="add-note-container flex align-center space-between">
                <h4>Add:</h4>
                <div class="add-note-radios flex align-center space-around">
                    <div class="flex">
                        <!-- <label for="textRadio"><button>&tcaron;</button></label> -->
                        <button><label for="textRadio">&tcaron;</label></button>
                        <input id="textRadio" type="radio" value="textNote" v-model="type"/>
                    </div>
                    <div class="flex">
                        <!-- <label for="imageRadio"><button>&#10064;</button></label> -->
                        <button><label for="imageRadio">&#10064;</label></button>
                        <input id="imageRadio" type="radio" value="imageNote" v-model="type"/>
                    </div>
                    <div class="flex">
                        <!-- <label for="videoRadio"><button>▷</button></label> -->
                        <button><label for="videoRadio">▷</label></button>
                        <input id="videoRadio" type="radio" value="videoNote" v-model="type"/>
                    </div>
                    <div class="flex">
                        <!-- <label for="audioRadio"><button>&#9833;</button></label> -->
                        <button><label for="audioRadio">&#9833;</label></button>
                        <input id="audioRadio" type="radio" value="audioNote" v-model="type"/>
                    </div>
                    <div class="flex">
                        <!-- <label for="todoRadio"><button>&#9776;</button></label> -->
                        <button><label for="todoRadio">&#9776;</label></button>
                        <input id="todoRadio" type="radio" value="todoNote" v-model="type"/>
                    </div>
                </div>
            </form>

            <section  v-if="noteId || type" class="note-edit-modal flex align-center justify-center">
                <!-- <button @click="onCloseEdit">close</button> -->
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
                    
                    <div class="new-note-styling flex space-between align-center">
                        <div class="flex column">
                            <label for="newNoteBgc">bgColor</label>
                            <input id="newNoteBgc" type="color" v-model="note.style['background-color']">
                        </div>
                        <div class="flex column">
                            <label for="newNoteColor">Color</label>
                            <input id="newNoteColor" type="color" v-model="note.style['color']">
                        </div>
                    </div>
                    <button>Save</button>
                </form>
                <!-- <pre>{{note}}</pre> -->
            </section>
        </section>
    `,
    data() {
        return {
            note: null,
            type: '',
            noteId: '',
            newTodoTxt: '',
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
            if (!this.type) return;
            if (this.type === 'textNote') return 'Add Text';
            if (this.type === 'audioNote') return 'Add Audio';
            if (this.type === 'videoNote') return 'Add Video';
            if (this.type === 'todoNote') return 'Add List';
            if (this.type === 'imageNote') return 'Add Image';
            
            if (!this.note.type) return;
            if (this.note.type === 'textNote') return 'Edit Text';
            if (this.note.type === 'audioNote') return 'Edit Audio';
            if (this.note.type === 'videoNote') return 'Edit Video';
            if (this.note.type === 'todoNote') return 'Edit List';
            if (this.note.type === 'imageNote') return 'Edit Image';
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
                    // notesService.getNewNote(this.type)
                    //     .then(note => this.note = note);
                    // this.note = null;
                    // this.noteId = '';
                    // this.type = '';
                    this.onCloseEdit();
                })
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
        }
    },
    created() {
        eventBus.$on('editNote', (noteId) => {
            this.noteId = noteId;
        })
        // this.getNote();
    },
    watch: {
        type() {
            this.getNote();
        },
        noteId() {
            this.getNote();
        }
    }
}