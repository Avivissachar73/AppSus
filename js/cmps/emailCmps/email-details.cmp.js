'use strict';
import {mailsService} from '../../services/email-services.js'
import { eventBus } from "../../services/event-bus-service.js"
import emailShortTextCmp from './emailShortText.cmp.js';

export default {
    name: 'email-details',
    
    template: `
        <section class="mail-details" >
        <div>{{mail.title}}</div>
        <div>{{mail.from}}</div>
        <div>{{mail.time}}  {{mail.date}}</div>
        <p>{{mail.subtitle}}</p>
        <button @click="reply"><router-link to="/misterEmail/compose">reply</router-link></button>
        
        </section>
    `,
    data(){
        return{
            mailId:this.$route.params.id,
        }
    },
    methods:{
      reply(){
            eventBus.$emit('reply',this.mail)
            console.log(this.mail)
      }
    },
    computed:{
       mail(){
           return mailsService.getMailById(this.mailId)
       }
    }
   
}