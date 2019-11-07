'use strict';


import booksService from '../../services/booksServices.js';

import bookList from '../../cmps/miss-books-cmps/book-list.cmp.js';
import bookFilter from '../../cmps/miss-books-cmps/book-filter.cmp.js';

// console.log(booksService.getBooks());

export default {
    name: 'book-app',
    template: `
        <main>
            <section v-if="!selectedBook">
                <book-filter @getFilterBy="setFilterBy" :categories="categories"></book-filter>
                <book-list :books="booksToShow" @bookSelected="selectBook"></book-list>
            </section>
            <book-details v-else :book="selectedBook" @bookDisSelect="selectBook"></book-details> 
        </main>
    `,
    data() {
        return {
            books: [],
            selectedBook: null,
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
        selectBook(bookId) {
            if (!bookId) {
                this.selectedBook = null;
                return
            }
            booksService.getBookById(bookId)
                .then(book => this.selectedBook = book);
        },
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