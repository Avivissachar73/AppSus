'use strict';

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <div class="note-preview">
            <div v-if="note.type === 'text'" :style="styling">
                <h5>{{note.title}}</h5>
                <p>{{note.txt}}</p>
            </div>
            <div v-if="note.type === 'image'">
                <h5>{{note.title}}</h5>
                <img :src="note.url"/>
            </div>
            <div v-if="note.type === 'video'">
                <h5>{{note.title}}</h5>
                <iframe :src="note.url"/>
            </div>
        </div>
    `,
    computed: {
        styling() {
            return {'font-family': this.note.fontFamily, 'color': this.note.fontColor};
        }
    }
}


{/* <section class="video-container">
    <iframe class="video" src="https://www.youtube.com/embed/otrH5hxJ2GE"></iframe>
</section> */}