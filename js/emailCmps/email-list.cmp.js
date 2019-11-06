'use strict';
import emailPreview from './email-preview.cmp.js'

export default {
    name: 'email-list',
    props:['mails'],
    template: `
        <ul>
            <li v-for="mail in mails" :key="mail.id" class="clean-list">
                <email-preview :mail="mail"></email-preview>
            </li>
        </ul>
    `,
    components:{
        emailPreview,
    }
}