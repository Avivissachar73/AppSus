'use strict';

export default {
    name: 'audioNote',
    props: ['note'],
    template: `
        <!-- <audio controls :src="note.url" controls="controls"/> -->
        <audio controls>
            <source :src="note.url" type="audio/mpeg"/>
        </audio>
    `,
}