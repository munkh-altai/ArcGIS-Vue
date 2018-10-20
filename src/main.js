import "./sass/app.scss"
import 'es6-promise/auto';
import 'classlist-polyfill';


import Vue from 'vue';

import Vuex from 'vuex';


import plugins from './config/plugins';

import vuexStore from './store/store';


plugins(Vue, Vuex);


const store = new Vuex.Store(vuexStore);

import Map from './components/layouts/Map.vue'

new Vue({
    el: '#app',
    store: store,
    render: h => h(Map)
})
