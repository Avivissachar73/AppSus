'use strict';

import notesService from '../../services/notes-service.js';

import {eventBus} from '../../services/event-bus-service.js';

export default {
    name: 'edit-note',
    // props: ['noteId'],
    template: `
        <section>
            <!-- <h2>EDIT_NOTE</h2> -->

            <form v-if="!noteId" class="add-note-radios flex align-center justify-center">
                <h4>Add a note: </h4>
                <div class="flex">
                    <input id="textRadio" type="radio" value="textNote" v-model="type"/>
                    <!-- <label for="textRadio">Text</label> -->
                    <label for="textRadio">&tcaron;</label>
                </div>
                <div class="flex">
                    <input id="imageRadio" type="radio" value="imageNote" v-model="type"/>
                    <!-- <label for="imageRadio">Image</label> -->
                    <label for="imageRadio">&#10064;</label>
                </div>
                <div class="flex">
                    <input id="videoRadio" type="radio" value="videoNote" v-model="type"/>
                    <!-- <label for="videoRadio">Video</label> -->
                    <label for="videoRadio">▷</label>
                </div>
                <div class="flex">
                    <input id="audioRadio" type="radio" value="audioNote" v-model="type"/>
                    <!-- <label for="audioRadio">Audio</label> -->
                    <label for="audioRadio">&#9833;</label>
                </div>
                <div class="flex">
                    <input id="todoRadio" type="radio" value="todoNote" v-model="type"/>
                    <!-- <label for="todoRadio">Todo</label> -->
                    <!-- <label for="todoRadio">&#8285;&#9783;</label> -->
                    <label for="todoRadio">&#9776;</label>
                </div>
            </form>

            <section  v-if="noteId || type">
                <button @click="onCloseEdit">close</button>

                <form @submit.prevent="onSaveNote" class="flex column flex-start">
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
                    
                    <div class="new-note-styling">
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