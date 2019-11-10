'use strict';

import utils from '../../services/util-service.js';

export default {
    name: 'book-preview',
    props: ['book'],
    template: `
        <div class="book-preview flex column align-center justify-center">
            <h2>{{book.title}}</h2>
            <img :src="book.thumbnail"/>
            <h2>Price: {{book.listPrice.amount}}{{currencySign}}</h2>
        </div>
    `,
    computed: {
        currencySign() {
            let currencyCode = this.book.listPrice.currencyCode;
            return utils.getCurrency(currencyCode);
        }
    }
}