<!-- 这个组件主要实现两个功能
 1.保存父组件传过来的数据(list\index)
 2.数据接收到将其保存到全局数据中(getApp().globalData)
 3.实现跳转
 
 (因为有多处会用到,比如月份和热门部分都有用到)
 -->
<template>
	<view>
		<!-- <navigator url="/pages/imgDetail/index">
			<slot></slot>
		</navigator> -->
		
		
		<navigator @click="handleClick">
			<slot></slot>
		</navigator>
		
	</view>
</template>
<script>
	export default {
		props: {
			list: Array,
			index: Number
		},
		// mounted() {
		// 	// console.log(this.list);
		// 	// console.log(this.index)
			
		// 	getApp().globalData.list=this.list;
		// 	getApp().globalData.index=this.index;
		// 	uni.navigateTo({
		// 		url:"/pages/imgDetail/index"
		// 	})
		// },
		methods:{
			handleClick(){
				getApp().globalData.list=this.list;
				getApp().globalData.index=this.index;
				uni.navigateTo({
					url:"/pages/imgDetail/index"
				})
			}
		}
	}
</script>

<style>
</style>
