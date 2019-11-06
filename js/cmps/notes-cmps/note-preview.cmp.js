'use strict';

import notesService from '../../services/notes-service.js';

import shortedTxt from './short-txt.cmp.js';

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <div class="note-preview flex column flex-start" :style="note.style">
            <h5>{{note.title}}</h5>
            <shorted-txt v-if="note.type === 'text'" :txt="note.txt" :txtLimit="200"></shorted-txt>
            <img :src="note.url" v-if="note.type === 'image'"/>
            <iframe :src="note.url" v-if="note.type === 'video'"/>
            <div class="flex space around">
                <button @click="onPinNote">{{pinMsg}}</button>
                <!-- <router-link :to="'/missKeep/details'+note.id">More details</router-link> -->
                <button @click="onOpenEditModal(note.id)">Edit</button>
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
    },
    components: {
        shortedTxt
    }
}