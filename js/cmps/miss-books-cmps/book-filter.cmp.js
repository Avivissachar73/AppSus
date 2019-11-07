'use strict';

export default {
    name: 'book-filter',
    props: ['categories'],
    template: `
        <section class="flex space-around align-center wrap">
            <div class="flex column">
                <label for="searchName">Search by name: </label>
                <input id="searchName" type="text" placeholder="Search by name" v-model="filterBy.title" @input="onSetFilter"/>
            </div>
            <div class="flex column">
                <label for="searchCategory">Search by category: </label>
                <select id="searchCategory" v-model="filterBy.category" @change="onSetFilter">
                    <option v-for="category in categories" :value="category" :label="category"/>
                </select>
            </div>
            <div class="flex column">
                <label for="searchByPrice">Search by max price: </label>
                <input id="searchByPrice" type="number" placeholder="Max price" v-model="filterBy.maxPrice" @input="onSetFilter"/>
            </div>
            <div class="flex column">
                <label for="searchByPageCount">Search by max amount of pages: </label>
                <input id="searchByPageCount" type="number" placeholder="Max pages" v-model="filterBy.maxPagesCount" @input="onSetFilter"/>
            </div>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                maxPrice: Infinity,
                maxPagesCount: Infinity,
                category: null
            }
        }
    },
    created() {
        this.onSetFilter();
    },
    methods: {
        onSetFilter() {
            if (!this.filterBy.maxPrice) this.filterBy.maxPrice = Infinity;
            if (!this.filterBy.maxPagesCount) this.filterBy.maxPagesCount = Infinity;
            this.$emit('getFilterBy', {...this.filterBy});
        },
    }
};