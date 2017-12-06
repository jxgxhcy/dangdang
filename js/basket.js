/**
 * Created by kiki on 2017/12/6.
 */
window.onload = function () {

    /**
     * 初始化 相关推荐 数据
     */
    var relate_box = document.querySelector('#relate #box');
    var relate_indi = document.querySelector('#relate #indi');
    var rela_pos = {pos: 0};
    var rprev = document.querySelector('#relate #prev_page');
    var rnext = document.querySelector('#relate #next_page');

    for (var i = 0; i < 2; i++) {//生成两页
        var ul = document.createElement('ul');
        ul.className = 'page';
        relate_box.appendChild(ul);
    }

    for (var i = 0; i < 10; i++) {//第1页
        var li = document.createElement('li');
        li.innerHTML = '<a href="#"><img src="images/' + app.book_list[i] +
            '"></a><p><a href="#">这是当当网根据您购物车中物品推荐的商品！</a></p>' +
            '<p class="price">¥' +
            parseInt(Math.random() * 100) + ".00" +
            '</p><p><img src="images/collect.png"></p>' +
            '<p class="add-basket" style="text-align: center">加入购物车</p>';
        relate_box.children[0].appendChild(li);
    }

    for (var i = 10; i < 20; i++) {//第2页
        var li = document.createElement('li');
        li.innerHTML = '<a href="#"><img src="images/' + app.book_list[i] +
            '"></a><p><a href="#">这是当当网根据您购物车中物品推荐的商品！</a></p>' +
            '<p class="price">¥' +
            parseInt(Math.random() * 100) + ".00" +
            '</p><p><img src="images/collect.png"></p>' +
            '<p class="add-basket" style="text-align: center">加入购物车</p>';
        relate_box.children[1].appendChild(li);
    }

    // 加入购物车事件
    var adds = document.getElementsByClassName('add-basket');
    for (var i = 0; i < adds.length; i++) {
        adds[i].onclick = function (e) {
            addBasket(e.target || e.srcElement);
        }
    }

    setIndicator(2, relate_box, relate_indi, rela_pos);
    rprev.onclick = function () {
        prevPage(rela_pos, relate_box, relate_indi, 2);
    }
    rnext.onclick = function () {
        nextPage(rela_pos, relate_box, relate_indi, 2);
    }

    /**
     * 初始化 推广商品 数据
     */
    var show_box = document.querySelector('#show #box');
    var show_indi = document.querySelector('#show #indi');
    var show_pos = {pos: 0};
    var sprev = document.querySelector('#show #prev_page');
    var snext = document.querySelector('#show #next_page');

    for (var i = 0; i < app.show_list.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = '<a href="#"><img src="images/' + app.show_list[i] +
            '"></a><p><a href="#">这是当当网推广的商品，物美价廉，望您考虑购买！</a></p>' +
            '<p class="price">¥' +
            parseInt(Math.random() * 100) + ".00" +
            '</p><p><img src="images/collect.png"></p>' +
            '<p><img src="images/hi.png"></p>';
        show_box.appendChild(li);
    }

    setIndicator(5, show_box, show_indi, show_pos);
    sprev.onclick = function () {
        prevPage(show_pos, show_box, show_indi, 5);
    }
    snext.onclick = function () {
        nextPage(show_pos, show_box, show_indi, 5);
    }

    /**
     * 初始化指示器
     * @param num 页数
     * @param box 实际容器
     * @param pos 当前显示位置 left
     */
    function setIndicator(num, box, ibox, po) {
        for (var i = 0; i < num; i++) {
            var opt = document.createElement('i');
            opt.className = 'opt';
            opt.tabIndex = i;
            if (i == 0) {
                opt.style.backgroundColor = '#f00';
            }
            opt.onclick = function (e) {
                var ele = e.targetName || e.srcElement;
                clearBg(ele.parentNode);
                ele.style.backgroundColor = '#f00';
                po.pos = -960 * ele.tabIndex;
                box.style.left = po.pos + 'px';
            }
            ibox.appendChild(opt);
        }
    }

    /**
     * 清除背景色
     * @param ele parentNode 指示器容器节点
     */
    function clearBg(ele) {
        for (var i = 0; i < ele.children.length; i++) {
            ele.children[i].style.backgroundColor = '#fff';
        }
    }

    /**
     * 下一页
     * @param pos
     * @param box
     * @param ibox
     */
    function nextPage(po, box, ibox, pageNum) {
        po.pos -= 960;
        if (po.pos < -960 * (pageNum - 1)) {
            po.pos = 0;
        }
        clearBg(ibox);
        ibox.children[Math.abs(po.pos / 960)].style.backgroundColor = '#f00';
        box.style.left = po.pos + 'px';
    }

    /**
     * 前一页
     * @param pos
     * @param box
     * @param ibox
     */
    function prevPage(po, box, ibox, pageNum) {
        po.pos += 960;
        if (po.pos > 0) {
            po.pos = -960 * (pageNum - 1);
        }
        clearBg(ibox);
        ibox.children[Math.abs(po.pos / 960)].style.backgroundColor = '#f00';
        box.style.left = po.pos + 'px';
    }

    /**
     * 加入购物车
     */
    function addBasket(ele) {
        alert(11);
    }
}