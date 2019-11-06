'use strict';

import home from './pages/home.cmp.js';
import about from './pages/about.cmp.js';
import missBooks from './pages/missBooks.cmp.js';

import missKeep from './pages/missKeep.cmp.js';

import misterEmail from './pages/misterEmail.cmp.js';
import emailPreview from './emailCmps/email-preview.cmp.js';
import emailDetails from './emailCmps/email-details.cmp.js'

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
            path:'preview',
            component: emailPreview
        },
        {
            path:'details',
            component: emailDetails
        }
        ]

    },
];

const router = new VueRouter({routes})


export default router;