'use strict';

import home from './pages/home.cmp.js';
import about from './pages/about.cmp.js';
import missBooks from './pages/missBooks.cmp.js';
import missKeep from './pages/missKeep.cmp.js';
import misterEmail from './pages/misterEmail.cmp.js';
import compose from './emailCmps/compose.cmp.js';
import list from './emailCmps/email-list.cmp.js'


const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/about',
        component: about
    },
    {
        path: '/missBooks',
        component: missBooks
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

          }
        ]

    },
];

const router = new VueRouter({routes})


export default router;