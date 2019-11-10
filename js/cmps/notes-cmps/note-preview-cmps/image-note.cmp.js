'use strict';

export default {
    name: 'imageNote',
    props: ['note'],
    template: `
        <img :src="note.url"/>
    `,
}