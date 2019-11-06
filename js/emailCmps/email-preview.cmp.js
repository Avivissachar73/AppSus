'use strict';
import emailList from '../emailCmps/email-list.cmp.js'

export default {
    name: 'email-preview',
    props:['mail'],
    template: `
        <section class="flex space-around">
            <div>
                from{{mail.from}}
            </div>
            <div>
                title{{mail.title}}
            </div>
        </section>
    `,
  
}