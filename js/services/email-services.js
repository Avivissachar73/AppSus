'use strict'

import utilServices from './util-service.js'

const MAILS_STOREGE_KEY = 'my_mails'
export const mailsService={
    getMails,
    
}
var gMails;


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
        title:'event1',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos",
        from:'muki',
        isFavorie:false,
        isread:false
    },
    {
        title:'event2',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos",
        from:'puki',
        isFavorie:false,
        isread:true
    },
    {
        title:'event3',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos",
        from:'tuki',
        isFavorie:false,
        isread:false
    },
    {
        title:'event4',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos",
        from:'kuki',
        isFavorie:true,
        isread:false
    },
    

]