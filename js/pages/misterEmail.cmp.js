'use strict';
import emailList from '../emailCmps/email-list.cmp.js'


import {mailsService} from '../services/email-services.js'
export default {
    name: 'mister-email',
    template: `
        <section>
            <email-list :mails="mails"></email-list>
        </section>
    `,
    data(){
        return{
            mails:[]
        }
    },
    created(){
        mailsService.getMails()
            .then(mails=>this.mails=mails)
    },

    components:{
        emailList,
    }
}