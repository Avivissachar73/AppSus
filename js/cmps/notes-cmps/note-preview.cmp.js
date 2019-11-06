'use strict';

import notesService from '../../services/notes-service.js';


export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <div class="note-preview flex column flex-start" :style="note.style">
            <h5>{{note.title}}</h5>
            <p v-if="note.type === 'text'">{{note.txt}}</p>
            <img :src="note.url" v-if="note.type === 'image'"/>
            <iframe :src="note.url" v-if="note.type === 'video'"/>
            <div class="flex space around">
                <button @click="onPinNote">{{pinMsg}}</button>
                <router-link :to="'/missKeep/'+note.id">read more</router-link>
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
            notesService.pinNote(this.note.id)
        },
    }
}