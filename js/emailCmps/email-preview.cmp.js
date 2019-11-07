'use strict'; 


import { eventBus } from "../services/event-bus-service.js";


export default {
    name: 'email-preview',
    props:['mail'],
    template: `
        <section @click="selectedPreview" class="email-preview">
           <div :class="{ unReadMail: !mail.isread}" class="flex space-between align-center ">
         
                <div>
               {{mail.title}}
               </div>
               <div>
                {{mail.from}}
                <button @click.stop="starringMail" v-if="!isStarred">✰</button>
                <button @click.stop="starringMail" v-else>⭐</button>
                
                
               </div>
           </div>
                <div class="sub-title-perview" v-if="selected">
                <button @click="deleteMail">🗑️</button>
                <button>📖</button>
                    
                    <p> {{mail.subtitle}}</p>
                
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
        },
        deleteMail(){
            console.log(this.mail.id)
            eventBus.$emit('delete',this.mail.id)
        },
        starringMail(){
            this.isStarred=!this.isStarred
        }
        
        


    }
  
}