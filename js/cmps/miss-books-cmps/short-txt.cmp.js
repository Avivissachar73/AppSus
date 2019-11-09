'use strict';

export default {
    name: 'short-txt',
    props: ['txt', 'txtLimit'],
    template: `
        <p v-if="txt.length < txtLimit">{{txt}}</p>
        <div v-else @click="onReadMore" class="shorted-txt">
            <p v-if="!isShowAllTxt">{{shortedTxt}}</p>
            <p v-else>{{txt}}</p>
        </div>
    `,
    data() {
        return {
            isShowAllTxt: false,
        }
    },
    computed: {
        shortedTxt() {
            return this.txt.slice(0, this.txtLimit) + '...';
        }
    },
    methods: {
        onReadMore() {
            this.isShowAllTxt = !this.isShowAllTxt
        }
    }
}