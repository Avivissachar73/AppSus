'use strict';

export default {
    name: 'review-form',
    props: ['book'],
    template: `
        <section>
            <h3>Add a review about the book:</h3>
            <form @submit.prevent="onAddReview" class="flex column flex-start">
                <input type="text" placeholder="Your name" v-model="newReview.reviewer"/>
                <textarea placeholder="Your review" v-model="newReview.txt"></textarea>
                rate: <select v-model.number="newReview.rate">
                    <option value="1" label="1"/>
                    <option value="2" label="2"/>
                    <option value="3" label="3"/>
                    <option value="4" label="4"/>
                    <option value="5" label="5"/>
                </select>
                read at: <input type="date" v-model="newReview.readAt">
                <button>Add review</button>
            </form>
            <pre>{{newReview}}</pre>
        </section>
    `,
    data() {
        return {
            newReview: {id: Date.now(), reviewer: '', txt: '', readAt: Date.call().split(' ').splice(1,3).join(' '), rate: 3}
        }
    },
    methods: {
        onAddReview() {
            if (!this.newReview.reviewer || !this.newReview.txt) return;
            this.$emit('addReview', this.newReview);
        }
    }
}