'use strict';


import booksService from '../../services/booksServices.js';

import bookList from '../../cmps/miss-books-cmps/book-list.cmp.js';
import bookFilter from '../../cmps/miss-books-cmps/book-filter.cmp.js';

// console.log(booksService.getBooks());

export default {
    name: 'book-app',
    template: `
        <section class="book-section">
            <header class="flex space-between wrap width-all">
                <button><router-link to="/books/add">add books</router-link></button>
                <book-filter @getFilterBy="setFilterBy" :categories="categories"></book-filter>
            </header>
            <book-list :books="booksToShow"></book-list>
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            
            let filter = this.filterBy;
            return this.books.filter(book => {
                return book.title.includes(filter.title) &&
                       book.listPrice.amount <= filter.maxPrice &&
                       book.pageCount <= filter.maxPagesCount &&
                       (!filter.category || book.categories.includes(filter.category));
            })
        },
        categories() {
            return this.books.reduce((acc, book) => {
                book.categories.forEach(category => {
                    if (!acc.includes(category)) acc.push(category);
                })
                return acc;
            }, []);
        }
    },
    methods: {
        setFilterBy(filterBy) {
            this.filterBy = filterBy;
        }
    },
    created() {
        booksService.getBooks()
            .then(books => {
                this.books = books;
                console.log(this.books)
            })
    },
    components: {
        bookList,
        bookFilter
    }
}