'use strict';

import router from './router.js';


var options = {
    router,
    el: '#appSus',
    template: `
        <section>
            <header class="container flex align-center space-between">
                <h1>App Sus</h1>
                <ul class="main-nab-bar clean-list flex">
                    <li><router-link to="/">Home</router-link></li> |
                    <li><router-link to="/about">About</router-link></li> |
                    <li><router-link to="/missBooks">MissBooks</router-link></li> |
                    <li><router-link to="/misterEmail">MisterEmail</router-link></li> |
                    <li><router-link to="/missKeep">MissKeep</router-link></li>
                </ul>
            </header>
            <router-view class="container"></router-view>
        </section>
    `,
    components: {
    }
};

new Vue(options);
