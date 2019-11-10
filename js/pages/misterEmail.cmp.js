'use strict';
import emailList from '../cmps/emailCmps/email-list.cmp.js'
import sideBar from '../cmps/emailCmps/side-bar.cmp.js'
import searchEmail from '../cmps/emailCmps/search-bar.cmp.js'
import { eventBus } from "../services/event-bus-service.js"

import {mailsService} from '../services/email-services.js'
export default {
    name: 'mister-email',
    template: `
        <section>
            <search-email @filtered="setFilter"></search-email>
            <div class="list-side">
            <side-bar :unreadPrecent="unreadPrecent" :unReadCount="unreadCount"></side-bar>
            <router-view :mails="mailsToShow"></router-view>
            
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
            showTrash:false,
          
            

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
        eventBus.$on('reply',(replyMail)=>{
            // replyMail.title+=' Re :',
            // replyMail.subtitle='----------------\n'+replyMail.subtitle

            eventBus.$emit('replyToCompose',replyMail)
        })
        eventBus.$on('starring',(mailId)=>{
            mailsService.starringEmail(mailId)
        })
        
        eventBus.$on('read',(mailId)=>{
            mailsService.readMail(mailId)
        })
        
        eventBus.$on('sendingNewMail',(newMail)=>{
            if(newMail.to===''||newMail.subtitle===''){return}
            mailsService.addMail(newMail)
        })
        eventBus.$on('showTrash',()=>{
            this.showTrash=!this.showTrash
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

        eventBus.$on('showInbox',()=>{
            this.showTrash=false
            this.showUnread=false
            this.showStars=false
           
        })
    },
    computed:{
        unreadCount(){
            var unReadCount=0
            for(var i = 0 ;i < this.mails.length ;i++){
                if(!this.mails[i].isread){unReadCount++}
            }
            return unReadCount
        }, 
        unreadPrecent(){
            return Math.floor((this.unreadCount/this.mails.length)*100)
        },

        mailsToShow(){
            if(!this.filterBy){return this.mails}
            // if(this.showTrash){
            //     return this.mails.filter(mail=>{
            //         !mail.isTrash
            //     })
            // }
            var regex =new RegExp(`${this.filterBy.name}`,'i')
            return this.mails.filter(mail=>
                (regex.test(mail.title)|| regex.test(mail.from)
                ||regex.test(mail.subtitle))&&(!this.showStars || mail.isStarred)&&
                (!this.showUnread || !mail.isread)&&((this.showTrash && mail.isTrash)||(!this.showTrash && !mail.isTrash)))
        }


    },

    components:{
        emailList,
        sideBar,
        searchEmail
    }
}