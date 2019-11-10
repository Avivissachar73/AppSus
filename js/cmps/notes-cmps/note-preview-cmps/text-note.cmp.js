'use strict';

import shortedTxt from '../short-txt.cmp.js';


export default {
    name: 'textNote',
    props: ['note'],
    template: `
        <shorted-txt :txt="note.txt" :txtLimit="150"></shorted-txt>
    `,
    components: {
        shortedTxt
    }
}