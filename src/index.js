// import {h, Tik} from "./utils/utils";
import {Tik} from './utils/core';
import './index.css';

const domList = [
  {
    tagName: 'div',
    attr: {
      class: ["header", "header-wrp"],
    },
    children: [
      {
        tagName: 'div',
        attr: {
          class: ["title", "title-text"],
        },
        children: '12312311'
      },
    ]
  },
  {
    tagName: "span",
    attr: {
      class: ['span-text']
    },
    children: "123213"
  }
];

// window.tik = new Tik({
//   data: {
//     title: '123'
//   },
//   template: domList
// }).mount('#app');

// tik.$setData('title', 22222222);
// tik.$setData('title', 33333333333333333);*/

let tik = new Tik({
  data: {
    title: 'webpack app'
  },
  template: domList
}).mount('#app');

tik.$setData('title', 'title1')
tik.$setData('title', 'title2')