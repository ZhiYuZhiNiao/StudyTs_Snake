/*
 * @Author: ctm 18082020969@163.com
 * @Date: 2023-11-14 10:40:17
 * @LastEditors: ctm 18082020969@163.com
 * @LastEditTime: 2023-11-14 15:15:31
 * @FilePath: \Snake\src\GameMgr.ts
 * @Description: 描述
 */
import Food from './Food.js';
import Snake from './Snake.js';
import Direction from './Direction.js';
class GameMgr {
    constructor() {
        this.key = -1;
        this.isOver = false;
        this.food = new Food(Direction.top, 'food', (selector) => {
            return document.getElementById(selector);
        });
        this.snake = new Snake(Direction.right, '#snake > div', (selector) => {
            return document.querySelector(selector);
        });
    }
    start() {
        const { onKeyDown, onUpdate } = this;
        document.addEventListener('keydown', onKeyDown.bind(this));
        this.key = setInterval(onUpdate.bind(this), 300);
    }
    onUpdate() {
        const { snake, food } = this;
        // 每次move之前进行各种检测
        if (this.chekcCollision()) {
            this.gameOver();
            return;
        }
        if (this.checkIsEatFood()) {
            snake.eat(food);
        }
        snake.move();
    }
    gameOver() {
        this.isOver = true;
        clearInterval(this.key);
    }
    chekcCollision() {
        return this.checkCollisionWall() || this.snake.checkHeadCollisionBody();
    }
    checkIsEatFood() {
        const { snake, food } = this;
        return snake.x === food.x && snake.y === food.y;
    }
    /* 检测蛇撞墙, 330 * 340  => 320 330 */
    checkCollisionWall() {
        const { snake } = this;
        switch (snake.dir) {
            case Direction.top:
                return snake.y === 0;
                break;
            case Direction.bottom:
                return snake.y === 330;
                break;
            case Direction.left:
                return snake.x === 0;
                break;
            case Direction.right:
                return snake.x === 320;
                break;
        }
    }
    onKeyDown(e) {
        const key = e.key.toLowerCase();
        const { snake } = this;
        switch (key) {
            case 'w':
            case 'arrowtop':
                if (snake.dir !== Direction.bottom)
                    snake.dir = Direction.top;
                break;
            case 's':
            case 'arrowdown':
                if (snake.dir !== Direction.top)
                    snake.dir = Direction.bottom;
                break;
            case 'a':
            case 'arrowleft':
                if (snake.dir !== Direction.right)
                    snake.dir = Direction.left;
                break;
            case 'd':
            case 'arrowright':
                if (snake.dir !== Direction.left)
                    snake.dir = Direction.right;
                break;
        }
    }
}
export default GameMgr;
