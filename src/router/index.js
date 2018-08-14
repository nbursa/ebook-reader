/*jshint esversion: 6 */

import Vue from 'vue';
import Router from 'vue-router';
import Reader from '@/components/Reader';
import Settings from '@/components/Settings';
import Book1 from '@/components/How to Sell a Crapload of Books/Book1';
import Contents from '@/components/How to Sell a Crapload of Books/Contents';
import Chapter1 from '@/components/How to Sell a Crapload of Books/Chapter1';
import Chapter2 from '@/components/How to Sell a Crapload of Books/Chapter2';
import Chapter3 from '@/components/How to Sell a Crapload of Books/Chapter3';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'Cover',
      component: Book1
    },
    {
      path: '/Contents',
      name: 'Contents',
      component: Contents
    },
    {
      path: '/Page-1',
      name: 'Chapter 1',
      component: Chapter1
    },
    {
      path: '/Page-2',
      name: 'Chapter 2',
      component: Chapter2
    },
    {
      path: '/End',
      name: 'End',
      component: Chapter3
    }
  ]
  // scrollBehavior(to, from, savedPosition) {
  //   if (to.hash) {
  //     return {
  //       selector: to.hash, 
  //       offset: { 
  //         x: 0, 
  //         y: 0 
  //       }
  //     };
  //   }
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     // return { pageNum: 0 };
  //     return { x: 0, y: 0 };
  //   }
  //   // return new Promise((resolve, reject) => {
  //   //   setTimeout(() => {
  //   //     resolve({
  //   //       x: 0,
  //   //       y: 0
  //   //     });
  //   //   }, 100);
  //   // }
  // // );
  // }

});
