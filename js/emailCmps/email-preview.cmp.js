'use strict'; 


import { eventBus } from "../services/event-bus-service.js";
import {mailsService} from '../services/email-services.js';
import noteService from '../services/miss-keep-services/notes-service.js'
 import emailShortText from '../emailCmps/emailShortText.cmp.js'


export default {
    name: 'email-preview',
    props:['mail'],
    template: `
        <section @click="selectedPreview" class="email-preview" :class="{ unReadMail: !mail.isread}">
           <div  class="flex space-between align-center ">
         
                <div>
               {{mail.title}}
               <div class="smallSize">
                {{mail.from}}
                <email-short-text :txtLimit="30" :txt="mail.subtitle"></email-short-text>
                </div>
                </div>
               <div class="smallSize" >
               {{mail.time}}
               {{mail.date}}
                <button @click.stop="starringMail" v-if="!mail.isStarred">✰</button>
                <button @click.stop="starringMail" v-else>⭐</button>
                
                
               </div>
           </div>
                <div class="sub-title-perview" v-if="selected">
                <button @click="deleteMail">🗑️</button>
                <button @click="makeNote">n</button>
                <router-link :to="'/misterEmail/details'+mail.id"> 📖</router-link>
                <email-short-text :txtLimit="130" :txt="mail.subtitle"></email-short-text>
               
                    
                   
                
            </div>
        </section>
    `,
    data(){
        return{
            selected:false,
            isStarred:this.mail.isStarred
        }
    },
    methods:{
        selectedPreview(){
            this.selected=!this.selected
            // this.mail.isread=true
            eventBus.$emit('read',this.mail.id)
        },
        deleteMail(){
             this.mail.trash=!this.mail.trash
            console.log(this.mail.id)
            eventBus.$emit('delete',this.mail.id)
        },
        starringMail(){
            //   this.mail.isStarred=!this.isStarred
            //   this.isStarred=!this.isStarred
            //  mailsService.starringEmail(this.mail.id)
            eventBus.$emit('starring',this.mail.id)
        },
        makeNote(){
            noteService.getNewNote('textNote')
                .then(note=>{
                    note.title= this.mail.title,
                    note.txt=this.mail.subtitle,
                    noteService.saveNote(note)
                    

                })



        }
    },
    components:{
        emailShortText
    }
    
  
}