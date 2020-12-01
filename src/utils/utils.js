import {e, info} from "./log";

export const h = (tagName, options) => {
  let ele = document.createElement(tagName);
  applyAttr(ele, options);
  return ele;
};

function applyAttr(dom, attrs = {}) {
  for (let attr in attrs) {
    if (attr === 'class') {
      attrs[attr] = attrs[attr].join(' ')
    }
    dom.setAttribute(attr, attrs[attr]);
  }
}

function renderUtil(domList, parentElement) {
  let root = parentElement;
  for (let dom of domList) {
    let ele = h(dom.tagName, dom.attr);
    if (typeof dom.children === "string") {
      ele.innerText = dom.children;
    }else if (Array.isArray(dom.children) && dom.children.length) {
      ele = renderUtil(dom.children, ele);
    }
    root.append(ele);
  }
  return root;
}


function defineObjectAttr(vm, key, value) {
  Object.defineProperty(vm, key, {
    enumerable: true,
    configurable: false,
    get() {
      return value;
    },
    set(v) {
      if (v !== value) {
        console.log('value changed')
        value = v;
      }
    }
  })
}

export class Tik{
  constructor({data, template}) {
    this.template = template;
    this.$data = {};
    Object.keys(data).forEach(key => defineObjectAttr(this.$data, key, data[key]));

    this.$setData = function (key, value) {
      this.$data[key] = value;
    };
  }

  mount(element) {
    if (typeof element === "string" && element[0] === '#') {
      element = document.getElementById(element.slice(1));
    } else if (!element.nodeType || element.nodeType !== 1) {
      throw Error("mount element need id or html element node");
    }
    renderUtil(this.template, element);
    return this;
  }
}