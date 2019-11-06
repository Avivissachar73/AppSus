'use strict';

export default {
    name: 'note-search',
    template: `
        <section>
            <input type="text" placeholder="Search" v-model="filterBy.searchStr" @input="onSearch"/>
            <select v-model="filterBy.type" @change="onSearch">
                <option value="All" label="All"/>
                <option value="textPreview" label="Text"/>
                <option value="videoPreview" label="Video"/>
                <option value="imagePreview" label="Image"/>
                <option value="audioPreview" label="Audio"/>
                <option value="todoPreview" label="Todo"/>
            </select>
        </section>
    `,
    data() {
        return {
            filterBy: {
                searchStr: '',
                type: 'All'
            }
        }
    },
    methods: {
        onSearch() {
            this.$emit('search', this.filterBy);
        }
    },
}