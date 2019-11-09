'use strict';

import {eventBus} from '../services/event-bus-service.js';

export default {
    name: 'alert',
    template: `
        <section v-if="msgTxt" class="flex column align-center justify-center confirm-modal">
            <h3>{{title}}</h3>
            <p>{{msgTxt}}</p>
            <div class="flex align-center space-between">
                <button @click="confirmFunc">{{confirmMsg}}</button>
                <button @click="onClose">{{closeMsg}}</button>
            </div>
        </section>
    `,
    data() {
        return {
            msgTxt: '',
            cbFunc: null
        }
    },
    computed: {
        confirmMsg() {
            return 'Confirm';
        },
        closeMsg() {
            return 'Cancel';
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
        }
    },
    created() {
        eventBus.$on('Confirm', (msg, cbFunc) => {
            this.msgTxt = msg;
            // this.cbFunc = cbFunc;
            console.log(this.msgTxt)
            if (cbFunc) this.cbFunc = cbFunc;
        });
    }
}