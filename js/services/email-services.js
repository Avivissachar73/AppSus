'use strict'

import utilServices from './util-service.js'

const MAILS_STOREGE_KEY = 'my_mails'
export const mailsService={
    getMails,
    
}
var gMails;

// function deleteMail(mailId){

// }
function getMails(){
    return new Promise((resolve, reject) =>  {
        utilServices.loadFromLocalStorage(MAILS_STOREGE_KEY)
            .then(mails => {
                gMails = mails;
                resolve(gMails);
            })
            .catch(err => {
                console.log(err);
                gMails = someMails;
                resolve(gMails);
            })
    })

}
var someMails=[
    {
        title:'mail1',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'muki',
        isFavorie:false,
        isread:false
    },
    {
        title:'mail2',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'puki',
        isFavorie:false,
        isread:true
    },
    {
        title:'mail3',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'tuki',
        isFavorie:false,
        isread:true
    },
    {
        title:'mail4',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'kuki',
        isFavorie:true,
        isread:false
    },{
        title:'mail5',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'shuki',
        isFavorie:true,
        isread:false
    },{
        title:'mail6',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'ruki',
        isFavorie:true,
        isread:false
    },{
        title:'mail7',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos ",
        from:'vuki',
        isFavorie:true,
        isread:true
    },{
        title:'mail8',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'ouki',
        isFavorie:true,
        isread:false
    },
    

]