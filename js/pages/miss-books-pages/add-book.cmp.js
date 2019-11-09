'use strict';

import booksService from '../../services/booksServices.js';

export default {
    name: 'add-book',
    template: `
        <section>
            <input type="text" v-model="searchStr" placeholder="Search a book"/>
            <ul v-if="books">
                <li v-for="book in books">
                    <button @click="onAddBook(book.id)">+</button>
                    {{book.title}}
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
    }
}