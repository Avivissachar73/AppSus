'use strict';
import emailList from '../emailCmps/email-list.cmp.js'
import sideBar from '../emailCmps/side-bar.cmp.js'
import searchEmail from '../emailCmps/search-bar.cmp.js'
import { eventBus } from "../services/event-bus-service.js"

import {mailsService} from '../services/email-services.js'
export default {
    name: 'mister-email',
    template: `
        <section>
            <search-email @filtered="setFilter"></search-email>
            <div class="flex">
            <side-bar></side-bar>
            <email-list :mails="mailsToShow"></email-list>
        </div>
        </section>
    `,
    data(){
        return{
            filterBy:null,
            mails:[],
            isSelected:false
        }
    },
    methods:{
        setFilter(filterBy){
            this.filterBy=filterBy
        },
        deleteMail(mailId){
            console.log(mailId)
            mailsService.deleteMail(mailId)
        }
    },
    created(){
        eventBus.$on('delete', (mailId)=>{
            console.log(mailId)
        })
        mailsService.getMails()
            .then(mails=>this.mails=mails)
    },
    computed:{
        mailsToShow(){
            if(!this.filterBy){return this.mails}
            var regex =new RegExp(`${this.filterBy.name}`,'i')
            return this.mails.filter(mail=>
                regex.test(mail.title)|| regex.test(mail.from)
                ||regex.test(mail.subtitle))
        }


    },

    components:{
        emailList,
        sideBar,
        searchEmail
    }
}