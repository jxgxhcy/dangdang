/**
 * Created by kiki on 2017/12/6.
 */

    /**
     * 购物车部分
     */
    var basket_list = document.getElementById('basket-list');
    var basket = document.getElementById('basket');
    var empty = document.getElementsByClassName('empty')[0];
    var shops = basket.getElementsByTagName('table');

    showBasket();

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
            addBasket(e.target || e.srcElement,0);
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
     * 根据购物车是否为空 显示还是隐藏
     * @type {boolean}
     */
    function showBasket() {
        var shown = false;
        for(var i=1;i<shops.length;i++){
            var bk = shops[i].getElementsByTagName('tbody')[0];
            if(bk.rows.length>0){
                shown = true;
                break;
            }
        }
        if(shown){
            empty.style.display = 'none';
            basket.style.display = 'block';
        }else {
            empty.style.display = 'block';
            basket.style.display = 'none';
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
     * 加入购物车事件
     * @param ele 点击的节点
     * @param type 自营 0  第3方 1
     * 这里只做了自营
     */
    function addBasket(ele,type) {
        switch (type){
            case 0:
                var item = ele.parentNode;
                var imgUrl = item.children[0].children[0].src;
                var name = item.children[1].children[0].innerHTML;
                var price = item.children[2].innerHTML;

                empty.style.display = 'none';
                basket.style.display = 'block';
                basket_list.style.display = 'block';
                var exist = false;
                for(var i =0;i<basket_list.rows.length-1;i++){
                    if(imgUrl == basket_list.rows[i].value){
                        basket_list.rows[i].cells[4].children[1].value = parseInt(basket_list.rows[i].cells[4].children[1].value) + 1 ;
                        shopTotal();
                        exist = true;
                        break;
                    }
                }
                if(!exist){
                    var tr = basket_list.getElementsByTagName('tbody')[0].insertRow(0);
                    tr.value = imgUrl;
                    var td0 = tr.insertCell(0);
                    td0.className = 'w50 tr';
                    td0.innerHTML = '&nbsp;&nbsp;<input checked type="checkbox" onchange="selectOne(this)">';
                    var td1 = tr.insertCell(1);
                    td1.className = 'w100 tr';
                    td1.innerHTML = '<img class="w80" src="'+ imgUrl +'">';
                    var td2 = tr.insertCell(2);
                    td2.className = 'w350';
                    td2.innerHTML = '<a href="#">'+ name +'</a>';
                    var td3 = tr.insertCell(3);
                    td3.className = 'w100 tc';
                    td3.innerHTML = price;
                    var td4 = tr.insertCell(4);
                    td4.className = 'w150 tc';
                    td4.innerHTML = '<span onclick="decrease(this)">-</span><input type="text" value="1" onblur="change(this)" oninput="change(this) on "><span onclick="increase(this)">+</span>';
                    var td5 = tr.insertCell(5);
                    td5.className = 'w100 tc cf00';
                    td5.innerHTML = price;
                    var td6 = tr.insertCell(6);
                    td6.className = 'w100 tc';
                    td6.innerHTML = '<a href="#">移入收藏</a><br/><br/><a href="javascript:void(0)" onclick="deleteOne(this)" >删除</a>';
                    shopTotal();
                    selectOne(td0.firstElementChild);
                }


                break;
            case 1:
                break;
            default:
                break;
        }
    }

    /**
     * 删除单个
     * @param ele 点击的元素node
     */
    function deleteOne(ele,type) {
        var del = confirm('确定删除吗？')
        if(del){
            var tr = ele.parentNode.parentNode;
            var tb = tr.parentNode;
            tb.removeChild(tr);
            if(tb.rows.length==0){
                tb.parentNode.style.display = 'none';
            }
            showBasket();
            shopTotal();
        }else{
            if(type==0){
                ele.parentNode.parentNode.children[4].children[1].value = 1;
            }
        }
    }

    /**
     * 批量删除
     * @param ele
     */
    function deleteMore(ele) {
        var more = document.querySelectorAll('#basket-list input:checked');
        var del = confirm('确定批量删除吗？');
        if(del){
            for(var i=0;i<more.length;i++){
                //判断子选项
                if(more[i].parentNode.parentNode.parentNode.nodeName.toLowerCase()=='tbody'){
                    more[i].parentNode.parentNode.parentNode.removeChild(more[i].parentNode.parentNode);
                }
            }
            showBasket();
            shopTotal();
        }
    }

    /**
     * 商铺全选事件
     * @param ele
     */
    function shopCheck(ele) {
        var rows = ele.parentNode.parentNode.children[1].rows;
        for(var i=0;i<rows.length;i++){
            rows[i].cells[0].firstElementChild.checked = ele.checked;
        }
        totalAll();
    }

    /**
     * 选中单个事件
     * @param ele
     */
    function selectOne(ele) {
        var trs = ele.parentNode.parentNode.parentNode.children;
        var shopChecked = true;
        for(var i=0;i<trs.length;i++){
            if(!trs[i].cells[0].firstElementChild.checked){
                shopChecked = false;
                break;
            }
        }
        var shop = ele.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild;
        shop.checked = shopChecked;
        totalAll();
    }

    /**
     * 全选
     */
    function selectAll(ele) {
        var all = document.querySelectorAll('input[type=checkbox]');
        for (var i=0;i<all.length;i++){
            all[i].checked = ele.checked;
        }
        totalAll();
    }

    /**
     * 递增
     */
    function increase(ele) {
        ele.previousElementSibling.value  = parseInt(ele.previousElementSibling.value)+1;
        var tr = ele.parentNode.parentNode;
        tr.children[5].innerHTML = '¥' + tr.children[3].innerHTML.substring(1) * tr.children[4].children[1].value+'.00';
        shopTotal();
    }

    /**
     * 递减
     */
    function decrease(ele) {
        ele.nextElementSibling.value -=1;
        if(ele.nextElementSibling.value==0){
            deleteOne(ele,0);
            return;
        }
        var tr = ele.parentNode.parentNode;
        tr.children[5].innerHTML = '¥' + tr.children[3].innerHTML.substring(1) * tr.children[4].children[1].value + '.00';
        shopTotal();
    }

    /**
     * 店铺合计
     */
    function shopTotal() {
        for(var i=1;i<shops.length;i++){
            var total = shops[i].getElementsByTagName('tfoot')[0].getElementsByClassName('shop-total')[0];
            var count = 0;
            for(var j=0;j<shops[i].rows.length-1;j++){
                shops[i].rows[j].cells[5].innerHTML = '¥' + parseFloat(shops[i].rows[j].cells[3].innerHTML.substring(1))*shops[i].rows[j].cells[4].children[1].value + '.00';
                count += parseFloat(shops[i].rows[j].cells[5].innerHTML.substring(1));
            }
            total.innerHTML = '¥' + count + '.00';
        }
        totalAll();
    }
    /**
     * 选中合计
     */
    var tota_all = document.getElementById('total-all');
    var totalCount = document.getElementById('select-count');
    function totalAll() {
        var selects = document.querySelectorAll('#basket-list input:checked');
        var count = 0;
        var scount =0;
        for(var i=0;i<selects.length;i++){
            //判断子选项
            if(selects[i].parentNode.parentNode.parentNode.nodeName.toLowerCase()=='tbody'){
                var tr = selects[i].parentNode.parentNode;
                count += parseFloat(tr.children[3].innerHTML.substring(1) * tr.children[4].children[1].value);
                scount+=1;
            }
        }
        totalCount.innerHTML =scount;
        tota_all.innerHTML = '¥' + count + '.00';
        tota_all.parentNode.nextElementSibling.disabled = count==0?true:false;
        tota_all.parentNode.nextElementSibling.style.backgroundColor = count==0?'#dedede':'#ff0000';

    }

    function change(ele) {
        if(isNaN(ele.value)){
            alert('输入有误！');
            ele.value = 1;
        }
        var tr = ele.parentNode.parentNode;
        tr.children[5].innerHTML = '¥' + tr.children[3].innerHTML.substring(1) * tr.children[4].children[1].value+'.00';
        shopTotal();
    }