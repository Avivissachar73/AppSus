'use strict'

import utilServices from './util-service.js'

const MAILS_STOREGE_KEY = 'my_mails'
export const mailsService={
    getMails,
    deleteMail,
    getUnreadCount,
    addMail,
    getMailById,
    starringEmail,
    readMail,
    // getUnreadPrecent
    
}
var gMails;
getMails();

function addMail(newMail){
     console.log(newMail)
     gMails.unshift(
        {
            title:newMail.title,
            id:utilServices.getRandomId(),
            subtitle:newMail.subtitle,
            from:newMail.from,
            isFavorie:false,
            isread:false,
            isStarred:false,
            isTrash:false,
            time:Date.call().split(' ')[4],
            date:`${Date.call().split(' ')[1]} ${Date.call().split(' ')[2]}`
        }

     )
     utilServices.saveToLocalStorage(MAILS_STOREGE_KEY,gMails)
}
// function getUnreadPrecent(){
//     var precent =gMails.length/getUnreadCount()
//     return precent
// }
function starringEmail(id){
    for(var i = 0 ;i < gMails.length ;i++){
        if(gMails[i].id===id){
            gMails[i].isStarred=! gMails[i].isStarred
        }
    }
    utilServices.saveToLocalStorage(MAILS_STOREGE_KEY,gMails)

}
function getMailById(id){
    for(var i = 0 ;i < gMails.length ;i++){
        if(gMails[i].id===id){
            console.log(gMails[i])
            return gMails[i]
        }
    }
}
function readMail(id){
    for(var i = 0 ;i < gMails.length ;i++){
        if(gMails[i].id===id){
            gMails[i].isread=true
        }
    }
    utilServices.saveToLocalStorage(MAILS_STOREGE_KEY,gMails)

}

function getUnreadCount(){
    var unReadCount=0
    for(var i = 0 ;i < gMails.length ;i++){
        if(!gMails[i].isread){unReadCount++}
    }
    return unReadCount
}

function deleteMail(mailId){
    for(var i = 0;i<gMails.length;i++){
        if(gMails[i].id===mailId){
            
            gMails[i].isTrash=true
            utilServices.saveToLocalStorage(MAILS_STOREGE_KEY,gMails)
        }
    }
    // console.log(mailId,)
    // someMails.forEach(function(mail){
    //     if(mail.id===mailId){
    //        someMails.splice(1,1)
    //     }
    // })
}
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
                utilServices.saveToLocalStorage(MAILS_STOREGE_KEY,gMails)
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
        isread:false,
        isStarred:false,
        isTrash:false,
        time:Date.call().split(' ')[4],
        date:`${Date.call().split(' ')[1]} ${Date.call().split(' ')[2]}`
    },
    {
        title:'mail2',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'puki',
        isFavorie:false,
        isread:true,
        isStarred:false,
        isTrash:false,
        time:Date.call().split(' ')[4],
        date:`${Date.call().split(' ')[1]} ${Date.call().split(' ')[2]}`

    },
    {
        title:'mail3',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'tuki',
        isFavorie:false,
        isread:true,
        isStarred:false,
        isTrash:false,
        time:Date.call().split(' ')[4],
        date:`${Date.call().split(' ')[1]} ${Date.call().split(' ')[2]}`

    },
    {
        title:'mail4',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'kuki',
        isFavorie:true,
        isread:false,
        isStarred:false,
        isTrash:false,
        time:Date.call().split(' ')[4],
        date:`${Date.call().split(' ')[1]} ${Date.call().split(' ')[2]}`

    },{
        title:'mail5',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'shuki',
        isFavorie:true,
        isread:false,
        isStarred:false,
        isTrash:false,
        time:Date.call().split(' ')[4],
        date:`${Date.call().split(' ')[1]} ${Date.call().split(' ')[2]}`

    },{
        title:'mail6',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'ruki',
        isFavorie:true,
        isread:false,
        isStarred:false,
        isTrash:false,
        time:Date.call().split(' ')[4],
        date:`${Date.call().split(' ')[1]} ${Date.call().split(' ')[2]}`

    },{
        title:'mail7',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos ",
        from:'vuki',
        isFavorie:true,
        isread:true,
        isStarred:true,
        isTrash:false,
        time:Date.call().split(' ')[4],
        date:`${Date.call().split(' ')[1]} ${Date.call().split(' ')[2]}`

    },{
        title:'mail8',
        id:utilServices.getRandomId(),
        subtitle:"mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos mi est eros convallis auctor arcu dapibus himenaeos",
        from:'ouki',
        isFavorie:true,
        isread:false,
        isStarred:false,
        isTrash:false,
        time:Date.call().split(' ')[4],
        date:`${Date.call().split(' ')[1]} ${Date.call().split(' ')[2]}`

    },
    

]