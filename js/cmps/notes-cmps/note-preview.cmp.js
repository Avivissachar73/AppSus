'use strict';

import notesService from '../../services/notes-service.js';
import mapService from '../../services/miss-keep-services/map-service.js';

import {mailsService} from '../../services/email-services.js';

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
            <form @submit.prevent="onAddTodo" class="flex space-between width-all">
                <input type="text" placeholder="Add todo" v-model="newTodoTxt"/>
                <button>+</button>
            </form>
            <ul class="clean-list width-all">
                <li v-for="todo in note.todos" :key="todo.id" class="flex align-center width-all" @click="onMarkTodo(todo.id)">
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

var mapNote = {
    name: 'map-note',
    props: ['note'],
    template: `
        <div hidden ref="googleMap" style="height: 250px; overflow: hidden;"></div>
    `,
    data() {
        return {
            map: {},
            marker: null
        }
    },
    methods: {
        setMap() {
            mapService.initMap(this.$refs.googleMap, this.note.pos.lat, this.note.pos.lng)
                .then(map => {
                    this.map = map;
                    this.marker = mapService.addMarker(this.map, this.map.center);
                })
        }
    },
    mounted() {
        this.setMap();
    },
}

export default {
    name: 'note-Preview',
    props: ['note'],
    template: `
        <div class="note-preview flex column align-center justify-center" :style="note.style">
            <h4>{{note.title}}</h4>

            <component :is="note.type" :name="note.type" class="note-data" :note="note"/>
            
            <div class="flex space-around">
                <button @click="onPinNote">{{pinMsg}}</button>
                <button @click="onOpenEdit">&#10002;</button>
                <button @click="onSendNote" v-if="note.txt">Send</button>
                <button @click="onRemoveNote">&#10005;</button>
            </div>
        </div>
    `,
    computed: {
        styling() {
            return {'font-family': this.note.fontFamily, 'color': this.note.fontColor};
        },
        pinMsg() {
            return (this.note.isPined)? '➶' : '➴';
        }
    },
    methods: {
        onPinNote() {
            notesService.pinNote(this.note.id);
        },
        removeNote() {
            notesService.removeNote(this.note.id)
                .then(() => console.log('note has been removed successfully'))
        },
        onRemoveNote() {
            eventBus.$emit('Confirm', 'Are you sure you want to remove tis note? you wold not be able to restore it.', this.removeNote);
        },
        onOpenEdit() {
            eventBus.$emit('editNote', this.note.id);
        },
        onSendNote() {
            console.log('sending', this.note);
            mailsService.addMail({title: this.note.title, 
                                 subtitle: this.note.txt, 
                                 from: 'Notes'});
        }
    },
    components: {
        textNote,
        audioNote,
        videoNote,
        todoNote,
        imageNote,
        mapNote
    }
}
