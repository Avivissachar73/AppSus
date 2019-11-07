'use strict';
import {mailsService} from '../services/email-services.js'


export default {
    name: 'email-details',
    
    template: `
        <section>
            {{mail.title}}
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