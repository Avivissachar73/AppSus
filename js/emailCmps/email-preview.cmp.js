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
               </div>
           </div>
            <div class="sub-title-perview" v-if="selected">
            <button>⭐</button>
            <button @click="deleteMail">🗑️</button>
            <button>📖</button>
                
                <p> {{mail.subtitle}}</p>
               
</div>
        </section>
    `,
    data(){
        return{
            selected:false,
        }
    },
    methods:{
        selectedPreview(){
            this.selected=!this.selected
        },
        deleteMail(){
            console.log(this.mail.id)
            eventBus.$emit('delete',this.mail.id)
        }
        


    }
  
}