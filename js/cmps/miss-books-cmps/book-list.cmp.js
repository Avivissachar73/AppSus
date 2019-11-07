'use strict';

import utils from '../../services/util-service.js';

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
    }
};

Vue.component('book-preview', {
    props: ['book'],
    template: `
        <div class="book-preview flex column align-center justify-center">
            <h2>{{book.title}}</h2>
            <img :src="book.thumbnail"/>
            <h2>Price: {{book.listPrice.amount}}{{currencySign}}</h2>
            <router-link :to="'/books/bookId' + book.id">Read more</router-link>
        </div>
    `,
    computed: {
        currencySign() {
            let currencyCode = this.book.listPrice.currencyCode;
            return utils.getCurrency(currencyCode);
        }
    }
})