interface TikOptions {
    data: Object,
    template: Array<any>
}

export class Tik {
    private $data : Object = {}
    private $el: HTMLElement;

    private readonly template: Array<any>


    constructor(options: TikOptions) {
        this.template = options.template;
        Object.keys(options.data).forEach(key => defineObjectAttr(this.$data, key, options.data[key], this.render.bind(this)));

        setInterval(() => {
            this.template.push({
                tagName: 'h1',
                attr: {
                    class: ['caption']
                },
                children: "webpack app"
            })
            console.log(this.template);
            this.render();
        }, 3000)
    }

    public $setData(key, value) {
        this.$data[key] = value;
    }

    render() {
        this.$el.innerHTML = "";
        renderUtil(this.template, this.$el);
        return this;
    }

    public mount(element) {
        if (typeof element === "string" && element[0] === '#') {
            element = document.getElementById(element.slice(1));
        } else if (!element.nodeType || element.nodeType !== 1) {
            throw Error("mount element need id or html element node");
        }

        if (!this.$el) {
            this.$el = element;
        }
        renderUtil(this.template, element);
        return this;
    }
}

export const h = (tagName, options) => {
    let ele = document.createElement(tagName);
    applyAttr(ele, options);
    return ele;
};

function applyAttr(dom, attrs = {}) {
    let classListStr
    for (let attr in attrs) {
        if (attr === 'class') {
            classListStr = attrs[attr].join(' ')
        }
        dom.setAttribute(attr, classListStr);
    }
}

// type: update, remove, add, position: [0][0][1] => [0,0,1] : 3 dimensions in one array
function diff() {

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


function defineObjectAttr(vm, key, value, fn) {
    Object.defineProperty(vm, key, {
        enumerable: true,
        configurable: false,
        get() {
            return value;
        },
        set(v) {
            if (v !== value) {
                fn()
                console.log('value changed')
                value = v;
            }
        }
    })
}