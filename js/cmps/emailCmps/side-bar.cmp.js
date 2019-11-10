'use strict';
import { eventBus } from "../../services/event-bus-service.js";
// import {mailsService} from '../services/email-services.js'


export default {
    props:['unreadPrecent','unReadCount'],
    name: 'side-bar',
   
    template: `
    <section class="email-side-bar flex column">
        <ul class=" clean-list list-side-bar">
            <li :class="{ showing: this.isShowingInbox}"  @click="showInbox"><router-link to="/misterEmail/list">Inbox</router-link></li>
            <li><router-link to="/misterEmail/compose">Send email</router-link></li>
          
            <li :class="{ showing: this.isShowingStars}" @click="showStars" ><router-link to="/misterEmail/list">starred</router-link></li>
            <!-- <li>sent-mail</li> -->
            <li :class="{ showing: this.isShowingTrash}" @click="showTrash"><router-link to="/misterEmail/list">trash</router-link></li>
            <li :class="{ showing: this.isShowingUnread}" @click="showUnRead"><router-link to="/misterEmail/list">unread({{unReadCount}})</router-link></li>
        </ul>
                <div class="bar">
                <div class="precent" :style="{width:unreadPrecent+'%'}"> {{unreadPrecent}}%</div>
                </div>
    </section>
    `, 
    data(){
        return{
            unreadCount:0,
            isShowingTrash:false,
            isShowingUnread:false,
            isShowingStars:false,
            isShowingInbox:false
            
        }

    },
    methods:{

        showStars(){
            eventBus.$emit('showStars')
            this.isShowingStars=!this.isShowingStars
        },
        showUnRead(){
            eventBus.$emit('showUnread')
            this.isShowingUnread=!this.isShowingUnread
        },
        showTrash(){
            eventBus.$emit('showTrash')
            this.isShowingTrash=!this.isShowingTrash
        },
        showInbox(){
            this. isShowingInbox=!this. isShowingInbox
            this.isShowingStars=false
            this.isShowingUnread=false
            this.isShowingTrash=false
            eventBus.$emit('showInbox')
        }
    },
   
    created(){
      
    },
    components:{
       
    }
}