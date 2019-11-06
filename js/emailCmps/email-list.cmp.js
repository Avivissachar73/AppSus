'use strict';
import emailPreview from './email-preview.cmp.js'

export default {
    name: 'email-list',
    props:['mails'],
    template: `
        <ul class="clean-list email-list">
            <li v-for="mail in mails" :key="mail.id" >
            <router-link to="/misterEmail/details">
            <email-preview :mail="mail"></email-preview>
            </router-link>
                
            </li>
        </ul>
    `,
    components:{
        emailPreview,
    }
}