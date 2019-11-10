'use strict';

import {eventBus} from '../services/event-bus-service.js';

export default {
    name: 'alert',
    template: `
        <section v-if="msgTxt" class="flex column align-center justify-center confirm-modal">
            <!-- <h3>{{title}}</h3> -->
            <p>{{msgTxt}}</p>
            <div class="flex align-center space-around">
                <button v-if="isConfirm" @click="confirmFunc">{{confirmMsg}}</button>
                <button @click="onClose">{{closeMsg}}</button>
            </div>
        </section>
    `,
    data() {
        return {
            isConfirm: false,
            title: '',
            msgTxt: '',
            cbFunc: null
        }
    },
    computed: {
        confirmMsg() {
            return 'Confirm';
        },
        closeMsg() {
            return (this.isConfirm)? 'Cancel' : 'Close';
        },
    },
    methods: {
        confirmFunc() {
            if (this.cbFunc) {
                this.cbFunc();
                this.cbFunc = null;
            }
            this.onClose();
        },
        onClose() {
            this.msgTxt = '';
            this.isConfirm = false;
        }
    },
    created() {
        console.log('alert was loded')
        eventBus.$on('Confirm', (msg, cbFunc) => {
            this.isConfirm = true;
            this.msgTxt = msg;
            if (cbFunc) this.cbFunc = cbFunc;
        });
        eventBus.$on('Alert', (msg) => {
            this.isConfirm = false;
            this.msgTxt = msg;
        });
    }
}