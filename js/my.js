/**
 * Created by anxia on 2016/12/12.
 */
$(document).ready(function () {

    var side = document.getElementById("side");
    var iLis = side.children;
    var leibie = document.getElementById("leibie");
    var lunbo = document.getElementById("lunbo");
    var leiLis = leibie.children[0].children;
    var picLis = lunbo.children;
    var vipKai = document.getElementById("vip-kai");
    var spanLis = vipKai.children;
    var nav = document.getElementById("nav");
    var navLis = nav.children[1].children;
    var pri = document.getElementById("pri");
    var act = document.getElementById("act");
    console.log(vipKai);
    side.style.zIndex = 500;
    nav.style.zIndex = 500;
    var sides = $("#side").find("i");
    console.log(sides);
    for(var i = 0;i<sides.length;i++){
        $(sides[i]).mouseenter(function(){
//                    $(sides).find("span").css("display","none");
            $(sides).find("span").hide(0);
//                    $(this).find("span").css("display","inline-block");
            $(this).find("span").show(0);
        });
        $(sides[i]).mouseleave(function(){
            $(this).find("span").css("display","none");
        });
    }
    for (var i = 0; i < iLis.length; i++) {
        iLis[i].style.backgroundPosition = "" + (-i * 32 - 155) + "px" + " " + (-190) + "px";
        console.log(iLis[i].style.backgroundPosition);
    }
    navLis[1].onmouseover = function () {
        pri.style.display = "inline-block";
    };
    navLis[2].onmouseover = function () {
        act.style.display = "block";
    };
    navLis[1].onmouseout = function () {
        pri.style.display = "";
    };
    navLis[2].onmouseout = function () {
        act.style.display = "";
    };
    for (var i = 0; i < leiLis.length; i++) {
        leiLis[i].index = i;
        leiLis[i].onmouseout = function () {
            for (var j = 0; j < leiLis.length; j++) {
                leiLis[j].style.opacity = "0.5";
            }
        };
        leiLis[i].onmouseover = function () {
            for (var j = 0; j < leiLis.length; j++) {
                leiLis[j].style.opacity = "0.5";
            }
            this.style.opacity = "1";
//
//                animate(leiLis[this.index],{"opacity":1});
//                this.style.opacity="0.5";
        };
        leiLis[i].onclick = function () {
            for (var j = 0; j < leiLis.length; j++) {
                leiLis[j].className = "l" + j + "";
            }
            this.className = "l" + (this.index + 3) + "";
            console.log(this.index);
            console.log(this.className);

            for (var i = 0; i < picLis.length; i++) {
                picLis[i].style.display = "none";
            }
            picLis[this.index].style.display = "block";
            animate(picLis[this.index], {"opacity": 1});
            picLis[this.index].style.opacity = 0;
            spanLis[0].style.backgroundPosition = 0 + "px" + " " + (-this.index * 100) + "px";
            spanLis[1].style.backgroundPosition = 0 + "px" + " " + (-302 - this.index * 29) + "px";
            spanLis[2].style.zIndex++;
            console.log(spanLis[this.index].style.backgroundPosition);
            console.log(this.index);
        };


    }

    //……………………缓动函数
    function animate(obj, json, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var k in json) {
                if (k === "opacity") {//opacity要特殊处理
                    //opacity没有单位 参与运算自动转换成数值 所以不用parsetInt
                    //取值范围 0-1 0.1 0.33 33 为了让以前的计算公式生效 要扩大100倍
                    var leader = getStyle(obj, k) * 100;
                    var target = json[k] * 100;
                    var step = (target - leader) / 60;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = (leader + step) / 100;
                    obj.style[k] = leader;//opacity没有单位
                } else if (k === "zIndex") {
                    obj.style.zIndex = json[k];//层级不需要渐变 直接设置即可
                } else {
                    var leader = parseInt(getStyle(obj, k)) || 0;
                    var target = json[k];
                    var step = (target - leader) / 60;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    obj.style[k] = leader + "px";
                }
                if (leader != target) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, 15);
    }

    //全部属性都到达目标值才能清空
    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj, null)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }

});