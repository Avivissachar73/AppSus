'use strict';

import booksService from '../../services/booksServices.js';

import bookPreview from '../../cmps/miss-books-cmps/book-preview.cmp.js';

export default {
    name: 'add-book',
    template: `
        <section>
            <button class="" @click="onClose">&#10005;</button>
            <input type="text" v-model="searchStr" placeholder="Search a book"/>
            <ul v-if="books" class="clean-list flex space-around wrap">
                <li v-for="book in books">
                    <button @click="onAddBook(book.id)">+</button>
                    <!-- {{book.title}} -->
                    <book-preview :book="book"></book-preview>
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