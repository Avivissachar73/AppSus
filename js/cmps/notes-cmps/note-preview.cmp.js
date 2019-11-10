'use strict';

import notesService from '../../services/miss-keep-services/notes-service.js';
// import mapService from '../../services/miss-keep-services/map-service.js';

import {mailsService} from '../../services/email-services.js';

import {eventBus} from '../../services/event-bus-service.js';

// import shortedTxt from './short-txt.cmp.js';

import textNote from './note-preview-cmps/text-note.cmp.js';
import audioNote from './note-preview-cmps/audio-note.cmp.js';
import videoNote from './note-preview-cmps/video-note.cmp.js';
import imageNote from './note-preview-cmps/image-note.cmp.js';
import todoNote from './note-preview-cmps/todo-note.cmp.js';
import mapNote from './note-preview-cmps/map-note.cmp.js';


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
                <button @click="onSendNote" v-if="note.txt">&#9993;</button>
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
            notesService.removeNote(this.note.id);
        },
        onRemoveNote() {
            eventBus.$emit('Confirm', 'Are you sure you want to remove tis note? you wold not be able to restore it.', this.removeNote);
        },
        onOpenEdit() {
            eventBus.$emit('editNote', this.note.id);
        },
        onSendNote() {
            mailsService.addMail({title: this.note.title, 
                                 subtitle: this.note.txt, 
                                 from: 'Notes'});
            eventBus.$emit('Alert', 'Note was sent to emails')
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
