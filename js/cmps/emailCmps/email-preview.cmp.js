'use strict'; 


import { eventBus } from "../../services/event-bus-service.js";
import {mailsService} from '../../services/email-services.js';
import noteService from '../../services/miss-keep-services/notes-service.js'
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
                <button class="stars" @click.stop="starringMail" v-if="!mail.isStarred">&star;</button>
                <button class="yellow-stars" @click.stop="starringMail" v-else>&starf;</button>
                
                
               </div>
           </div>
                <div class="sub-title-perview" v-if="selected">
                <button @click="onDeleteMail"><i class="fas fa-trash-alt"></i></button>
                <button @click="makeNote"><i class="far fa-clipboard"></i></button>
                <router-link :to="'/misterEmail/details'+mail.id"><button @click="read"> <i class="fas fa-book-open"></i> </button></router-link>
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
        read(){
            eventBus.$emit('read',this.mail.id)
            
        },
        onDeleteMail(){
            eventBus.$emit('Confirm','are you sure you to delete?',this.deleteMail)
        },
        selectedPreview(){
            this.selected=!this.selected
            // this.mail.isread=true
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