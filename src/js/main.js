function $(id){
    return typeof id === 'string' ? document.getElementById(id):id;
}

//
window.onload = function () {
    waterFall('main', 'box');

    var dataImg = {"data":[{"src":"0.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"10.jpg"}]};

    window.onscroll = function(){
        if(checkWillScroll()){
            for(var i=0; i<dataImg.data.length; i++){
                // 创建div
                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);
                // 创建里面的盒子
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);
                // 创建img标签
                var img = document.createElement('img');
                img.src = 'img/' + dataImg.data[i].src;
                newPic.appendChild(img);
            }

            waterFall('main', 'box');

        }
    }
};

function waterFall(parent, box){
    var allbox = $(parent).getElementsByClassName(box);

    var boxWidth = allbox[0].offsetWidth;

    var screenWidth = document.body.clientWidth;

    //
    var cols = Math.floor(screenWidth/boxWidth);

    var heightArr = [];
    for (var i = 0; i < allbox.length; i++){
        var boxHeight = allbox[i].offsetHeight;
        if(i < cols){
            heightArr.push(boxHeight);
        }else{
            var minBoxHeight = Math.min.apply(null, heightArr);

            var minBoxIndex = getMinIndex(minBoxHeight, heightArr);

            // 对剩余盒子定位
            allbox[i].style.position = 'absolute';
            allbox[i].style.top = minBoxHeight + 'px';
            allbox[i].style.left = boxWidth * minBoxIndex + 'px';
            // 改变高度
            heightArr[minBoxIndex] += allbox[i].offsetHeight;
        }
    }

    console.log(heightArr, minBoxHeight);

}

function getMinIndex(val, arr){
    for(var i=0; i< arr.length; i++){
        if(val == arr[i]){
            return i;
        }
    }
}

// 检查是否具备滚动条件
function checkWillScroll(){
    // 求最后一个盒子的offsettop + 自身的一半
    var allBoxs = $('main').getElementsByClassName('box');
    var lastBox =  allBoxs[allBoxs.length - 1];
    var lastBoxDis = lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2);
    // 求出页面偏离的高度(标准模式和混杂模式)
    var scrollTopH = document.body.scrollTop || document.documentElement.scrollTop;
    // 求出浏览器的高度
    var screenH = document.body.clientHeight || document.documentElement.clientHeight;
    return lastBoxDis < (scrollTopH + screenH) ? true : false;
}
