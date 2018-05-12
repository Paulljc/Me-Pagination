# Me-Pagination
Javascript分页

## 使用示例
> 通过js动态添加样式，class：pagination必须

```html
<div class="pagination" id="page"></div>
```
```js
pagination({
	selector: '#page', // 选择器
	totalPage: 30, // 总页数
	currentPage: 1, // 当前页
	prev: '上一页', // 上一页，可设置 <
	next: '下一页', // 下一页，可设置 >
	first: true, // 是否显示首页
	last: true, // 是否显示尾页
	showTotalPage: true, //是否显示总页数
	jumpBtn: true, // 需要跳转的输入框
	pageOneLoad: true, // 首页加载与否
	count: 2//当前页前后显示的数量
},function(val){
	// 当前页
	$.ajax({})
	console.log('page1当前页',val)
})
