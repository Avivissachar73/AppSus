'use strict';

import booksService from '../../services/booksServices.js';

import bookPreview from '../../cmps/miss-books-cmps/book-preview.cmp.js';

import {eventBus} from '../../services/event-bus-service.js';

export default {
    name: 'add-book',
    template: `
        <section class="book-section">
            <button class="" @click="onClose">back</button>
            <h2>Search a book an add it to your list</h2>
            <input type="text" v-model="searchStr" placeholder="Search a book"/>
            <ul v-if="books" class="clean-list flex space-around wrap">
                <li v-for="book in books" :key="book.id">
                    <book-preview :book="book" @click.native="onAddBook(book.id)"></book-preview>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            books: null,
            searchStr: ''
        }
    },
    methods: {
        setBooks() {
            booksService.getGoogleBooks(this.searchStr)
                .then(books => {
                    this.books = books
                    // console.log(this.books);  
                })
        },
        onAddBook(bookId) {
            booksService.addApiBook(bookId)
                .then(() => {
                    // console.log('book added')
                    eventBus.$emit('Alert', 'Book was added successfully')
                });
        },
        onClose() {
            this.$router.push('/books');
        }
    },
    watch: {
        searchStr() {
            if (!this.searchStr) {
                this.books = null;
                return;
            }
            this.setBooks();
        }
    },
    components: {
        bookPreview
    }
}