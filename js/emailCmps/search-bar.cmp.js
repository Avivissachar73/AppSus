'use strict'
export default {
    name: 'search-bar',
    template: `
        <section>
            search:
            <input type="search" placeholder="Srearch by" v-model="filterBy.name" >
        </section>
    `,
    data(){
        return{
            filterBy:{
                name:'',
            }
        }
    },
    created() {
       
        this.$emit('filtered', this.filterBy)
    },
    components:{
       
    }
}