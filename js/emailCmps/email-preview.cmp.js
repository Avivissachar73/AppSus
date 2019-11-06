'use strict';


export default {
    name: 'email-preview',
    props:['mail'],
    template: `
        <section class="flex space-between align-center email-preview">
            <div>
               {{mail.title}}
            </div>
            <div>
                {{mail.from}}
            </div>
        </section>
    `,
  
}