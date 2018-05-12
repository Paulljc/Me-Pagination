// 分页逻辑的封装
function pagination(data, callback) {
    // 分页的 css样式 加入到 head 中
    if (!document.getElementById('pageStyle')) {
        var style = document.createElement('style')
        style.id = 'pageStyle'
        style.innerHTML = '.pagination{text-align:center;margin-top:100px}.pagination a,.pagination span{margin:0 2px;padding:4px 8px;color:#428bca;background:#fff;text-decoration:none;border:1px solid #ddd;border-radius:4px;user-select:none;cursor:pointer}.pagination a:hover,.pagination span:hover{color:#fff;background:#428bca}.pagination .active{color:#fff;background:#428bca;cursor:default;}.pagination input{width:40px;padding:7px 0;border:none;outline:0;border:1px solid #ddd;border-radius:4px;text-align:center;margin:0 5px}.pagination i{font-style: normal;margin:0 5px;color:#999}.pagination input:focus{border:1px solid #428bca}'
        document.getElementsByTagName('head')[0].appendChild(style)
    }

    var page = document.getElementById(data.selector.slice(1)), // 除去#
        nextPage = document.getElementById('nextPage'),     // 取到下一页
        prevPage = document.getElementById('prevPage'),     // 取到上一页
        inputGo = document.getElementById('inputGo'),       // 指定跳转页
        currentPage = data.currentPage,     // 当前第几页 默认第一页
        nowPage = currentPage ? currentPage : 1,
        visiblePage = Math.ceil(data.visiblePage / 2),
        i_html = '',        // 用来插入新标签的字符串
        pageOneLoad = data.pageOneLoad ? false : true; // data中没有带pageOneLoad 则为undefined 即 false 那么就会取true

    // 初始化
    pageAction(nowPage) // 传入参数为第几页

    function pageAction(dataPage) {
        nowPage = dataPage;
        i_html = '';
        // var count = data.count <= 1 ? 1 : data.count ? data.count : 2;   // count为当前页前后显示的数量
        //根据 count 前后显示的数量决定 startPage 和 endPage 是哪页
        startPage = dataPage - data.count <= 1 ? 1 : dataPage - data.count,
        endPage = dataPage + data.count >= data.totalPage ? data.totalPage : dataPage + data.count,
        prevPage = data.prev ? data.prev : '<',     // 文字信息
        nextPage = data.next ? data.next : '>';     // 文字信息
        if (dataPage > 1) { // 当前页若不为第一页 则 可以显示上一页并显示首页
            i_html += '<span id=\"prevPage\">' + prevPage + '</span>'
            if (data.first) {
                i_html += '<a data-page="1" href=\"javascript:void(0);\">首页</a>'
            }
        }
        if (dataPage >= 5) {    // 当前页大于等于5的时候  保留前两页
            for (var i = 1; i <= 2; i++) {
                i_html += '<a data-page="' + i + '" href=\"javascript:void(0);\">' + i + '</a>'
            }
            i_html += '<span>...</span>'
        }
        for (var j = startPage; j <= endPage; j++) {    // 当前页的前后两页显示
            i_html += '<a data-page="' + j + '" href=\"javascript:void(0);\">' + j + '</a>'
        }
        if (endPage + 1 < data.totalPage) {     // 当前页的后一页如果不是最后一页则显示省略号
            i_html += '<span>...</span>'
            for (var i = (endPage > data.totalPage - 2 ? data.totalPage : data.totalPage - 1 ); i <= data.totalPage; i++) {
                i_html += '<a data-page="' + i + '" href=\"javascript:void(0);\">' + i + '</a>'
            }
            if (data.last) {    //  当前页若为最后一页   则不显示尾页
                i_html += '<a data-page="' + data.totalPage + '" href=\"javascript:void(0);\">尾页</a>'
            }
            i_html += '<span id=\"nextPage\">' + nextPage + '</span>'
        }
        if (data.showTotalPage && data.totalPage >= 1) {    // 显示 当前页/总页
            i_html += '<i>' + nowPage + '/' + data.totalPage + '</i>'
        }
        if (data.jumpBtn && data.totalPage >= 1) {  // 跳页
            i_html += '前往<input id="pageInput" type="text" />页 <span id="inputGo">确定</span>'
        }

        page.innerHTML = i_html;    // 标签放进选取的DOM对象中
        var pageA = page.getElementsByTagName('a'); // 遍历标签，添加类和属性
        for (var i = 0, pageALength = pageA.length; i < pageALength; i++) {
            pageA[i].className = ''
            if (pageA[i].getAttribute('data-page') == dataPage) {
                pageA[i].className = "active"
            }
        }

        // 第一页不请求
        if (!pageOneLoad) {
            callback && callback.call(null, dataPage)
        }
    }

    // 绑定点击事件
    page.onclick = function (event) {
        var event = event || window.event,  // 兼容IE
            target = event.target || event.srcElement,
            dataPage = parseInt(target.getAttribute('data-page'));
        pageOneLoad = false;
        if (target.className == 'active') return;   // 点击当前页无效
        if (target.nodeName.toLowerCase() == 'a') {  // 点击的是 a 标签 跳转到点击页
            pageAction(dataPage)
        }
        if (target.id == 'nextPage') {  // 上一页
            nowPage++
            pageAction(nowPage)
        }
        if (target.id == 'prevPage') {  // 下一页
            nowPage--
            pageAction(nowPage)
        }
        if (target.id == 'inputGo') {   // 指定页
            var pageInput = document.getElementById('pageInput'),   // 正则匹配  不符合条件的转向第一页
                goPage = pageInput.value > data.totalPage ? 1 : /[1-9]+/g.test(pageInput.value) ? pageInput.value : 1;
            pageAction(parseInt(goPage))
        }
    }
}