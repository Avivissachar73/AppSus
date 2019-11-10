'use strict';

import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
        <section>
            <ul class="clean-list flex wrap align-center space-around">
                <li v-for="book in books">
                    <router-link :to="'/books/bookId' + book.id">
                        <book-preview :book="book" :key="book.id"></book-preview>
                    </router-link>
                </li>
            </ul>
        </section>
    `,
    methods: {
        onSelectBook(bookId) {
            this.$emit('bookSelected', bookId);
        },
    },
    components: {
        bookPreview
    }
};
