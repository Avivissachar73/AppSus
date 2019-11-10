import { eventBus } from "../../services/event-bus-service.js"

export default {
    name: 'email-list',
    props:['mails'],
    template: `<section class="compose"> 
                 <div>new messege</div>
                <form @submit.prevent="submiton">
                <input class="compose-input" type="text"ref="mailTo" id="mailTo" placeholder="to:" v-model="newMail.to" >
                <input class="compose-input" type="text" ref="title" id="title"name="title" placeholder="title:"v-model="newMail.title" >
                <!-- <input type="text" ref="subtitle" id="subtitle"name="placeholder" placeholder="text..."v-model="newMail.subtitle"> -->
                <textarea  class="compose-input" ref="subtitle" v-model="newMail.subtitle" rows="20" autofocus>
                    
                   
                </textarea>
                <input type="submit">
                </form>
            </section>
    `,methods:{
        submiton(){
            console.log(this.newMail)
           
            eventBus.$emit('sendingNewMail',this.newMail)
            this.$refs.mailTo.value=''
            this.$refs.title.value=''
            this.$refs.subtitle.value=''
        }
    },
    data(){
        return{
            newMail:{
                to:'',
                title:'',
                subtitle:'',
                from: 'adi'
            }
        }
    },
    created(){
        eventBus.$on('replyToCompose',(replyMail)=>{
           this.newMail.title=replyMail.title+' Re :',
           this.newMail.subtitle='\n\n\n\n'+'- - - - -- - -- ---- -- ------- --- -'+'\n\n\n'+replyMail.subtitle
        })
    },
    computed:{
        
    }

    
}