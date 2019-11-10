'use strict';

export default {
    name: 'videoNote',
    props: ['note'],
    template: `
        <iframe :src="note.url"/>
    `,
}