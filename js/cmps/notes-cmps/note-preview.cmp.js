'use strict';

import notesService from '../../services/notes-service.js';

import shortedTxt from './short-txt.cmp.js';

var textPreview = {
    name: 'textPreview',
    props: ['note'],
    template: `
        <div>
            <shorted-txt :txt="note.txt" :txtLimit="150"></shorted-txt>
        </div>
    `,
    components: {
        shortedTxt
    }
}

var audioPreview = {
    name: 'audioPreview',
    props: ['note'],
    template: `
        <div>
            <audio controls :src="note.url" controls="controls"/>
                <!-- <source :src="note.url" type="audio/ogg">
                <source :src="note.url" type="audio/mpeg">
            </audio> -->
        </div>
    `,
}

var videoPreview = {
    name: 'videoPreview',
    props: ['note'],
    template: `
        <div>
            <iframe :src="note.url"/>
        </div>
    `,
}

var imagePreview = {
    name: 'imagePreview',
    props: ['note'],
    template: `
        <div>
            <img :src="note.url"/>
        </div>
    `,
}

var todoPreview = {
    name: 'todoPreview',
    props: ['note'],
    template: `
        <div>
            <form @submit.prevent="onAddTodo" class="flex">
                <input type="text" placeholder="Add todo" @input="checkNewTodoTxt(note.id)" v-model="newTodos[note.id]"/>
                <button>+</button>
            </form>
            <ul class="clean-list">
                <li v-for="todo in note.todos" :key="todo.id" class="flex" @click="onMarkTodo(todo.id)">
                    <button @click.stop="onRemoveTodo(todo.id)">X</button>
                    <div :class="{'done-todo': todo.isDone}">{{todo.txt}}</div>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
            newTodos: {}
        }
    },
    methods: {
        onRemoveTodo(todoId) {
            notesService.removeTodo(this.note.id, todoId)
                .then(() => console.log('todo was removed successfully'));
        },
        onMarkTodo(todoId) {
            notesService.markTodo(this.note.id, todoId)
                .then(() => console.log('todo was toggled!'))
        },
        onAddTodo() {
            var id = this.note.id
            if (!this.newTodos[id]) return;
            notesService.addTodo(id, this.newTodos[id]);
            this.newTodos[id] = '';
        },
        checkNewTodoTxt(noteId) {
            if (this.newTodos[noteId].length > 20) {
                this.newTodos[noteId] = this.newTodos[noteId].slice(0, 20);
            }
        },
    }
}

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <div class="note-preview flex column flex-start" :style="note.style">
            <h5>{{note.title}}</h5>

            <component :is="note.type" :name="note.type" :note="note"/>
            
            <div class="flex space-around">
                <button @click="onPinNote">{{pinMsg}}</button>
                <button @click="onOpenEditModal(note.id)">Edit</button>
                <button @click="onRemoveNote(note.id)">Remove</button>
            </div>
        </div>
    `,
    computed: {
        styling() {
            return {'font-family': this.note.fontFamily, 'color': this.note.fontColor};
        },
        pinMsg() {
            return (this.note.isPined)? 'un pin' : 'Pin it';
        }
    },
    methods: {
        onPinNote() {
            notesService.pinNote(this.note.id);
        },
        onRemoveNote() {
            notesService.removeNote(this.note.id)
                .then(() => console.log('note has been removed successfully'))
        }
    },
    components: {
        textPreview,
        audioPreview,
        videoPreview,
        todoPreview,
        imagePreview
    }
}
