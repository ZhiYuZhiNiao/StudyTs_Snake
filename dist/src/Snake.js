/*
 * @Author: ctm 18082020969@163.com
 * @Date: 2023-11-14 11:04:13
 * @LastEditors: ctm 18082020969@163.com
 * @LastEditTime: 2023-11-14 14:25:23
 * @FilePath: \Snake\src\Snake.ts
 * @Description: 描述
 */
import GameObject from "./GameObject.js";
import Direction from './Direction.js';
class Snake extends GameObject {
    constructor(dir, selector, fn) {
        super(dir, selector, fn);
        this._snakeEl = document.getElementById('snake');
        this._body = this._snakeEl.getElementsByTagName('div');
    }
    eat(food) {
        food.changePos(); // 食物消失
        this.grouth(); // 新增一节
    }
    checkHeadCollisionBody() {
        const { _body } = this;
        const [head, ...body] = _body;
        return body.some(el => {
            const item = el;
            switch (this.dir) {
                case Direction.top:
                    return this.x === item.offsetLeft && (this.y - 10) === item.offsetTop;
                case Direction.bottom:
                    return this.x === item.offsetLeft && (this.y + 10) === item.offsetTop;
                case Direction.left:
                    return this.x === item.offsetTop && (this.y - 10) === item.offsetLeft;
                case Direction.right:
                    return this.x === item.offsetTop && (this.y + 10) === item.offsetLeft;
            }
        });
    }
    grouth() {
        const { _snakeEl, _body } = this;
        _snakeEl.insertAdjacentHTML('beforeend', '<div></div>');
        // 设置最后一节得位置，应该就是原来最后一节得位置
        const lastNodeEl = _body[_body.length - 1];
        const prevNodeEl = _body[_body.length - 2];
        lastNodeEl.style.left = prevNodeEl.offsetLeft + 'px';
        lastNodeEl.style.top = prevNodeEl.offsetTop + 'px';
    }
    headMove() {
        // 默认得 el 就是头
        const { dir } = this;
        switch (dir) {
            case Direction.top:
                this.y -= 10;
                break;
            case Direction.bottom:
                this.y += 10;
                break;
            case Direction.left:
                this.x -= 10;
                break;
            case Direction.right:
                this.x += 10;
                break;
        }
    }
    bodyMove() {
        const { _body, el } = this;
        const { length } = _body;
        /* 从后往前遍历, 最后一个先得到前一个得位置，然后最后一个移动到前一个得位置 */
        for (let i = length - 1; i >= 1; i--) {
            const item = _body[i];
            const prev = _body[i - 1];
            item.style.left = prev.offsetLeft + 'px';
            item.style.top = prev.offsetTop + 'px';
        }
    }
    move() {
        // 身体移动完之后，头开始移动, 根据当前得方向
        this.bodyMove();
        this.headMove();
    }
}
export default Snake;
