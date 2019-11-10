'use strict';

export default {
    name: 'short-txt',
    props: ['txt', 'txtLimit'],
    template: `
        <section style="overflow:overlay;width:100%;">
            <p v-if="txt.length < txtLimit">{{txt}}</p>
            <div v-else class="shorted-txt">
                <p v-if="!isShowAllTxt">
                    {{shortedTxt}}
                    <button class="short-txt-btn" @click="onReadMore">{{buttonMsg}}</button>
                </p>
                <p v-else>
                    {{txt}}
                    <button class="short-txt-btn" @click="onReadMore">{{buttonMsg}}</button>
                </p>
            </div>
        </section>
    `,
    data() {
        return {
            isShowAllTxt: false,
        }
    },
    computed: {
        shortedTxt() {
            return this.txt.slice(0, this.txtLimit) + '...';
        },
        buttonMsg() {
            return (this.isShowAllTxt)? 'Show less' : 'Show more';
        }
    },
    methods: {
        onReadMore() {
            this.isShowAllTxt = !this.isShowAllTxt;
        }
    }
}