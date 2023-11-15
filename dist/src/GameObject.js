class GameObject {
    constructor(dir, selector, fn) {
        this.el = fn(selector);
        this.dir = dir;
    }
    get x() {
        return this.el.offsetLeft;
    }
    get y() {
        return this.el.offsetTop;
    }
    set x(val) {
        this.el.style.left = val + 'px';
    }
    set y(val) {
        this.el.style.top = val + 'px';
    }
}
export default GameObject;
