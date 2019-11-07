'use strict';

export default {
    name: 'note-search',
    template: `
        <section>
            <input type="text" placeholder="Search" v-model="filterBy.searchStr" @input="onSearch"/>
            <select v-model="filterBy.type" @change="onSearch">
                <option value="All" label="All"/>
                <option value="textNote" label="Text"/>
                <option value="videoNote" label="Video"/>
                <option value="imageNote" label="Image"/>
                <option value="audioNote" label="Audio"/>
                <option value="todoNote" label="Todo"/>
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