/*
 * @Author: ctm 18082020969@163.com
 * @Date: 2023-11-14 09:53:12
 * @LastEditors: ctm 18082020969@163.com
 * @LastEditTime: 2023-11-14 11:03:22
 * @FilePath: \Snake\src\Food.ts
 * @Description: 描述
 */
import { getRandomIntInclusive } from './util.js';
import GameObject from './GameObject.js';
class Food extends GameObject {
    // 食物没有消失, 食物只是改变了位置, 没必要一直去 new 新得
    constructor(dir, selector, fn) {
        super(dir, selector, fn);
        this.changePos();
    }
    changePos() {
        /*
          330 * 340 step=10px  要保证食物正好就在这些 格子里面
          eg: 坐标只能是10得倍数, 蛇每次移动10， 所以食物坐标只能是10得倍数，不然碰撞检测会有问题
        */
        const posX = getRandomIntInclusive(0, 32) * 10;
        const posY = getRandomIntInclusive(0, 33) * 10;
        this.x = posX;
        this.y = posY;
    }
}
export default Food;
