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
                    <button @click="onTogglenNav" class="main-nav-button">&#9783;</button>
                    <ul ref="mainNav" class="main-nav-bar clean-list flex wrap space-around">
                        <router-link to="/"><li>Home</li></router-link>
                        <router-link to="/about"><li>About</li></router-link>
                        <router-link to="/books"><li>MissBooks</li></router-link>
                        <router-link to="/books/add"><li>add books</li></router-link>
                        <router-link to="/misterEmail"><li>MisterEmail</li></router-link>
                        <router-link to="/missKeep"><li>MissKeep</li></router-link>
                    </ul>
                </section>
            </header>
            <router-view class="container router-preview"></router-view>

            <footer class="flex align-center justify-center">
                <h5>&copy; Created by Aviv Issachar and Adi Pinhas</h5>
            </footer>
        </main>
    `,
    methods: {
        onTogglenNav() {
            this.$refs.mainNav.classList.toggle('open')
        }
    }
};

new Vue(options);
