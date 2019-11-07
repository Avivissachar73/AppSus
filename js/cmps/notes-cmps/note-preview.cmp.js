'use strict';

import notesService from '../../services/notes-service.js';

import {eventBus} from '../../services/event-bus-service.js';

import shortedTxt from './short-txt.cmp.js';

var textNote = {
    name: 'textNote',
    props: ['note'],
    template: `
        <shorted-txt :txt="note.txt" :txtLimit="150"></shorted-txt>
    `,
    components: {
        shortedTxt
    }
}

var audioNote = {
    name: 'audioNote',
    props: ['note'],
    template: `
        <!-- <audio controls :src="note.url" controls="controls"/> -->
        <audio controls>
            <source :src="note.url" type="audio/mpeg"/>
        </audio>
        <!-- <audio controls/>
            <source :src="note.url" type="audio/ogg">
            <source :src="note.url" type="audio/mpeg">
        </audio> -->
    `,
}

var videoNote = {
    name: 'videoNote',
    props: ['note'],
    template: `
        <iframe :src="note.url"/>
    `,
}

var imageNote = {
    name: 'imageNote',
    props: ['note'],
    template: `
        <img :src="note.url"/>
    `,
}

var todoNote = {
    name: 'todoNote',
    props: ['note'],
    template: `
        <div>
            <form @submit.prevent="onAddTodo" class="flex">
                <input type="text" placeholder="Add todo" v-model="newTodoTxt"/>
                <button>+</button>
            </form>
            <ul class="clean-list">
                <li v-for="todo in note.todos" :key="todo.id" class="flex align-center" @click="onMarkTodo(todo.id)">
                    <button @click.stop="onRemoveTodo(todo.id)">X</button>
                    <div :class="{'done-todo': todo.isDone}">{{todo.txt}}</div>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
            newTodoTxt: ''
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
            if (!this.newTodoTxt) return;
            notesService.addTodo(this.note.id, this.newTodoTxt);
            this.newTodoTxt = '';
        },
    },
    watch: {
        // newTodoTxt(currVall) {
        //     if (currVall.length > 20) {
        //         this.newTodoTxt = this.newTodoTxt.slice(0, 20);
        //     }
        // }
    }
}

export default {
    name: 'note-Preview',
    props: ['note'],
    template: `
        <div class="note-preview flex column align-center justify-center" :style="note.style">
            <h5>{{note.title}}</h5>

            <component :is="note.type" :name="note.type" :note="note"/>
            
            <div class="flex space-around">
                <button @click="onPinNote">{{pinMsg}}</button>
                <!-- <button @click="onOpenEdit">Edit</button> -->
                <button @click="onOpenEdit">&#10002;</button>
                <!-- <button @click="onRemoveNote">Remove</button> -->
                <button @click="onRemoveNote">&#10005;</button>
            </div>
        </div>
    `,
    computed: {
        styling() {
            return {'font-family': this.note.fontFamily, 'color': this.note.fontColor};
        },
        pinMsg() {
            // return (this.note.isPined)? 'un pin' : 'Pin it';
            return (this.note.isPined)? '➶' : '➴';
        }
    },
    methods: {
        onPinNote() {
            notesService.pinNote(this.note.id);
        },
        onRemoveNote() {
            notesService.removeNote(this.note.id)
                .then(() => console.log('note has been removed successfully'))
        },
        onOpenEdit() {
            eventBus.$emit('editNote', this.note.id);
        }
    },
    components: {
        textNote,
        audioNote,
        videoNote,
        todoNote,
        imageNote
    }
}
