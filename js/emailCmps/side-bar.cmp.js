'use strict';
import { eventBus } from "../services/event-bus-service.js";


export default {
    props:['unReadCount'],
    name: 'side-bar',
   
    template: `
        <ul class="email-side-bar clean-list flex column">
            <router-link to="/misterEmail/list">Inbox</router-link>
            <router-link to="/misterEmail/compose">Send email</router-link>
          
            <li @click="showStars" >starred</li>
            <li>sent-mail</li>
            <li :class="{ showing: this.isShowingTrash}" @click="showTrash">trash</li>
            <li :class="{ showing: this.isShowingUnread}" @click="showUnRead">unread({{unReadCount}})</li>
            
        </ul>
    `, 
    data(){
        return{
            unreadCount:0,
            isShowingTrash:false,
            isShowingUnread:false
        }

    },
    methods:{
        showStars(){
            eventBus.$emit('showStars')
        },
        showUnRead(){
            eventBus.$emit('showUnread')
            this.isShowingUnread=!this.isShowingUnread
        },
        showTrash(){
            eventBus.$emit('showTrash')
            this.isShowingTrash=!this.isShowingTrash
        }
    },
   
    created(){
      
    },
    components:{
       
    }
}