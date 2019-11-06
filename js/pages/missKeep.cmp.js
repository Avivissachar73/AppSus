'use strict';

import notesService from '../services/notes-service.js';

export default {
    name: 'miss-keep',
    template: `
        <section>
            <!-- <h1>MISS KEEP</h1> -->
            <!-- <div class="place-holder" style="background-color:white;"></div> -->
            <!-- <note-list></note-list> -->
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created() {
        notesService.getNotes()
            .then(notes => {
                this.notes = notes;
                console.log(this.notes)
            });
    }
}

{/* <section class="video-container">
    <iframe class="video" src="https://www.youtube.com/embed/otrH5hxJ2GE"></iframe>
</section> */}