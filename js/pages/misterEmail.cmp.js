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
            <side-bar :unReadCount="unreadCount"></side-bar>
            <router-view :mails="mailsToShow"></router-view>
            {{unreadCount}}
        </div>
        </section>
    `,
    data(){
        return{
            filterBy:null,
            mails:[],
            isSelected:false,
            showStars:false,
            showUnread:false,
          

        }
    },
    methods:{
        setFilter(filterBy){
            this.filterBy=filterBy
        },
        
        
        // deleteMail(mailId){
        //     console.log(mailId,'ijijij')
        //     mailsService.deleteMail(mailId)
        // }
    },
    created(){
        eventBus.$on('sendingNewMail',(newMail)=>{
            mailsService.addMail(newMail)
        })
        
        eventBus.$on('showUnread',()=>{
            this.showUnread=!this.showUnread
        })
        eventBus.$on('showStars',()=>{
            this.showStars=!this.showStars
        })
        eventBus.$on('delete', (mailId)=>{
            console.log(mailId,)
           mailsService.deleteMail(mailId)
        })
        mailsService.getMails()
            .then(mails=>this.mails=mails)
    },
    computed:{
        unreadCount(){
            var unReadCount=1
            for(var i = 0 ;i < this.mails.length ;i++){
                if(!this.mails[i].isread){unReadCount++}
            }
            
            return unReadCount
        }, 
        mailsToShow(){
           
            if(!this.filterBy){return this.mails}
            var regex =new RegExp(`${this.filterBy.name}`,'i')
            return this.mails.filter(mail=>
                (regex.test(mail.title)|| regex.test(mail.from)
                ||regex.test(mail.subtitle))&&(!this.showStars || mail.isStarred)&&
                (!this.showUnread || !mail.isread))
        }


    },

    components:{
        emailList,
        sideBar,
        searchEmail
    }
}