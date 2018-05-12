# Me-Pagination
Javascript分页

#### 使用示例
> 通过Javascript进行分页

```html
<body>
	<div class="pagination" id="page"></div>
	<script src="pagination.js"></script>	// src 
	<script src="http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script> // jquery
</body>
```
```js
<script>
pagination({
	selector: '#page', // 选取的DOM
	totalPage: 10, // 总页数(可以从后台返回的记录总条数作为参数)
	currentPage: 1, // 当前页	默认第一页
	prev: '上一页', // 上一页 不传则为 <
	next: '下一页', // 下一页 不传则为 >
	first: true, // 是否显示首页
	last: true, // 是否显示尾页
	showTotalPage: true, // 是否显示总页数
	jumpBtn: true, // 需要跳转的输入框
	pageOneLoad: true, // 首页加载与否
	count: 2// 当前页前后显示的数量 比如当前页为3 那么前后显示两个即1 2  4 5
},function(pageVal){
	// 当前页
	console.log('page当前页',pageVal)
	$.ajax({  // 可以配合ajax 
	  	url: "baseUrl/page",
		type: 'POST',
		data:{
			page: pageVal	// 接收到返回的 当前页(第几页) 放入data中进行ajax请求
		},
		cache: false,
		success: function (data) {
			console.log(data)
			// 指定页的数据处理...
		}
	})  
})
</script>
