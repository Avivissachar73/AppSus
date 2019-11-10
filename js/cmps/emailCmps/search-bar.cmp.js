'use strict'
export default {
    name: 'search-bar',
    template: `
        <section class="search-bar">
            <!-- <div class="search-icon"></div> -->
            <input type="search" placeholder="Srearch in emails" v-model="filterBy.name" >
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