'use strict';

import router from './router.js';


var options = {
    router,
    el: '#appSus',
    template: `
        <main>
            <header class="flex align-center">
                <section class="container flex align-center space-between">
                    <h1>App Sus</h1>
                    <ul class="main-nav-bar clean-list flex wrap space-around">
                        <li><router-link to="/">Home</router-link></li> |
                        <li><router-link to="/about">About</router-link></li> |
                        <li><router-link to="/missBooks">MissBooks</router-link></li> |
                        <li><router-link to="/misterEmail">MisterEmail</router-link></li> |
                        <li><router-link to="/missKeep">MissKeep</router-link></li>
                    </ul>
                </section>
            </header>
            <router-view class="container router-preview"></router-view>
        </main>
    `,
    components: {
    }
};

new Vue(options);
