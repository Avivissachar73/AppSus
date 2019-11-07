import { eventBus } from "../services/event-bus-service.js"

export default {
    name: 'email-list',
    props:['mails'],
    template: `<section class="compose"> 
                 <div>new messege</div>
                <form @submit.prevent="submiton">
                <input type="text"ref="mailTo" id="mailTo" placeholder="to:" v-model="newMail.to">
                <input type="text" ref="title" id="title"name="title" placeholder="title:"v-model="newMail.title" >
                <input type="text" ref="subtitle" id="subtitle"name="placeholder" placeholder="text..."v-model="newMail.subtitle">
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
            }
        }
    },
    computed:{
        
    }

    
}