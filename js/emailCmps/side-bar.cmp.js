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
            <li>drafts</li>
            <li @click="showUnRead">unread({{unReadCount}})</li>
            
        </ul>
    `, 
    data(){
        return{
            unreadCount:0
        }

    },
    methods:{
        showStars(){
            eventBus.$emit('showStars')
        },
        showUnRead(){
            eventBus.$emit('showUnread')
        }
    },
   
    created(){
      
    },
    components:{
       
    }
}