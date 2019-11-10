'use strict';

import home from './pages/home.cmp.js';

import missBooks from './pages/miss-books-pages/book-app.cmp.js';

import bookDetails from './pages/miss-books-pages/book-details.cmp.js';
import addBook from './pages/miss-books-pages/add-book.cmp.js';

import missKeep from './pages/missKeep.cmp.js';

import misterEmail from './pages/misterEmail.cmp.js';
import compose from './emailCmps/compose.cmp.js';
import list from './emailCmps/email-list.cmp.js'
import details from './emailCmps/email-details.cmp.js'


const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/books',
        component: missBooks,
    },
    {
        path: '/books/bookId:id',
        component: bookDetails
    },
    {
        path: '/books/add',
        component: addBook
    },
    {
        path: '/missKeep',
        component: missKeep,
    },
    {
        path: '/misterEmail',
        component: misterEmail,
        children:[
            {
                path:'list',
                component:list
            },
          {
              path:'compose',
              component: compose

          },
          {
            path:'details:id',
            component: details

            }
        ]

    },
];

const router = new VueRouter({routes})


export default router;