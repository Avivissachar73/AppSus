'use strict';
import {mailsService} from '../services/email-services.js'


export default {
    name: 'email-details',
    
    template: `
        <section>
        <div>{{mail.title}}</div>
        <div>{{mail.from}}</div>
        <div>{{mail.time}}  {{mail.date}}</div>
        <div>{{mail.subtitle}}</div>
        </section>
    `,
    data(){
        return{
            mailId:this.$route.params.id,
        }
    },
    computed:{
       mail(){
           return mailsService.getMailById(this.mailId)
       }
    }
   
}