'use strict';

import utils from '../../services/util-service.js';
import booksService from '../../services/booksServices.js';

import shortTxt from '../../cmps/notes-cmps/short-txt.cmp.js'
import bookReviewForm from '../../cmps/miss-books-cmps/book-review-form.cmp.js';

import {eventBus} from '../../services/event-bus-service.js'

export default {
    name: 'book-details',
    template: `
        <section class="book-details-preview" v-if="book">
            <button @click="getDiffBook(-1)">Prev book</button>
            <button @click="getDiffBook(1)">Next book</button>
            <section class="book-info flex column align-center justify-center">
                <button class="absolute-to-right-corner" @click="onClose">X</button>
                <!-- <div class="book-info"> -->
                    <a :href="book.thumbnail"><img :src="book.thumbnail"/></a>
                    <h2>Book Id: <span>{{book.id}}</span></h2>
                    <h2>Book authors: <span v-for="author in book.authors">{{author}},</span></h2>
                    <h2>Categories: <span v-for="category in book.categories">{{category}}, </span></h2>
                    <h2>Book title: <span>{{book.title}}</span></h2>
                    <h2>subtitle: <span>{{book.subtitle}}</span></h2>
                    <h2>Amount of pages: <span>{{book.pageCount}}</span></h2>
                    <h2>read difficulty: <span>{{readDifficulty}}</span></h2>
                    <h2>publishedDate: <span>{{book.publishedDate}}</span></h2>
                    <h2>{{publishedTimeMsg}}</h2>
                    <h2>{{saleMsg}}</h2>
                    <h2>Price: <span  class="book-price" :class="priceClass">{{book.listPrice.amount}}{{currencySign}}</span></h2>
                    <div class="about-container flex column">
                        <h3>About:</h3>
                        <short-txt :txt="book.description" :txtLimit="100"></short-txt>
                    </div>
                    <div v-if="book.reviews" class="reviews-container">
                        <h2>reviews:</h2>
                        <div v-for="review in book.reviews" class="book-review flex align-center">
                            <button @click="onRemoveReview(review.id)">X</button>
                            <p>{{review.reviewer}}: {{review.txt}}</p>
                        </div>
                    </div>
                <!-- </div> -->
            </section>
            <book-review-form @addReview="onAddReview"></book-review-form>
        </section>
    `,
    methods: {
        setBook() {
            booksService.getBookById(this.bookId).then(book => {
                this.book = book;
            });
        },
        onClose() {
            this.$router.push('/books')
        },
        onAddReview(review) {
            booksService.addBookReview(this.book.id, review)
                .then(book => {
                    this.book = book
                    eventBus.$emit('showMsg', 'review has been added successfully')
                });
        },
        onRemoveReview(reviewId) {
            booksService.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book;
                    eventBus.$emit('showMsg', 'review has been removed successfully')
                });
        },
        getDiffBook(diff) {
            var nextBookId = booksService.getDiffBookIdById(diff, this.book.id);
            this.$router.push('/books/bookId' + nextBookId);
         }
    },
    data() {
        return {
            bookId: this.$route.params.id,
            book: null,
        }
    },
    computed: {
        readDifficulty() {
            let pageCount = this.book.pageCount;

            if (pageCount >= 500) return 'Long reading';
            if (pageCount >= 250) return 'Decent reading';
            if (pageCount >= 100) return 'light reading';
            if (pageCount > 0) return 'short reading';
        },
        priceClass() {
            return {'high-price': this.book.listPrice.amount >= 150, 'low-price': this.book.listPrice.amount < 150}
        },
        publishedTimeMsg() {
            let currYear = (new Date).getFullYear();
            if (currYear - this.book.publishedDate >= 10) {
                return 'Veteran Book';
            } else return 'New Book!'
        },
        saleMsg() {
            if (this.book.listPrice.isOnSale) return 'On sale!';
            return 'Not on sale..'
        },
        currencySign() {
            return utils.getCurrency(this.book.listPrice.currencyCode);
        }
    },
    components: {
        bookReviewForm,
        shortTxt
    },
    created() {
        this.setBook();
    },
    watch: {
        '$route.params.id'(newId) {
            this.bookId = newId;
            this.setBook();
        }
    }
};
