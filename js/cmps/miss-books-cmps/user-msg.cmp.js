'use strict';

import {eventBus} from '../services/event-bus-service.js';

export default {
    name: 'user-msg',
    template: `
        <section v-if="msg" class="user-msg flex column align-center space-around">
            <h3>{{msg}}</h3>
            <button @click="onClose">X</button>
        </section>
    `,
    data() {
        return {
            msg: '',
        }
    },
    methods: {
        onClose() {
            this.msg = '';
        }
    },
    created() {
        eventBus.$on('showMsg', (msg) => {
            this.msg = msg;
            setTimeout(() => this.msg = '', 3000);
        })
    }
}