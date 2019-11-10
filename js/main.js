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
                    <button @click="onToggleNav" class="main-nav-button">&#9783;</button>
                    <ul ref="mainNav" class="main-nav-bar clean-list flex wrap space-around">
                        <li @click="onToggleNav"><router-link to="/">Home</router-link></li>
                        <li @click="onToggleNav"><router-link to="/books">MissBooks</router-link></li>
                        <li @click="onToggleNav"><router-link to="/misterEmail/list">MisterEmail</router-link></li>
                        <li @click="onToggleNav"><router-link to="/missKeep">MissKeep</router-link></li>
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
        onToggleNav() {
            this.$refs.mainNav.classList.toggle('open')
        }
    }
};

new Vue(options);
