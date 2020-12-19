<template>
	<view>
		<view class="category_tab">
			<view class="category_tab_title">
				<view class="title_inner">
					<uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" style-type="text"
					 active-color="#d4237a"></uni-segmented-control>
				</view>
			</view>
			<scroll-view scroll-y enable-flex @scrolltolower="handelToLower" class="category_tab_content">
				<view class="category_imgs_item" v-for="item in vertical" :key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</scroll-view>
			<!-- <view class="category_tab_content">
				<view class="category_imgs_item" v-for="item in vertical" :key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</view> -->
		</view>
	
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default{
		components:{
			uniSegmentedControl,
		},
		data() {
			return {
				items: [{
					//为了方便改变params中的参数order,使其点击时根据索引取出这个order
						title: '最新',
						order:'new'
					},
					{
						title: '热门',
						order:'hot'
					},
				],
				current: 0,
				params:{
					limit:30,
					skip:0,
					order:'new'
				},
				id:0,
				//页面显示数据的数组
				vertical:[],
				dataMore:true
			}
		},
		methods: {
			onClickItem(e) {
				//console.log(e)
				//点击切换的时候,改变params参数中的order,并重新发送请求,
				//因为最开始默认的order时"new"
				
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}else{
					//表示点击了多次相同的hot\new那直接返回即可
					return
				}
				this.params.order=this.items[e.currentIndex].order;
				this.params.skip=0;
				this.vertical=[]
				this.getList()
				
			},
			getList(){
				
				this.request({
					url:`http://service.picasso.adesk.com/v1/vertical/category/${this.id}/vertical`,
					data:this.params
				
				}).then(result=>{
					// console.log(result)
					if(result.res.vertical.lenght===0){
						this.dataMore=false;
						return;
					}
					this.vertical=[...this.vertical,...result.res.vertical];
				})
			},
			handelToLower(){
				if(this.dataMore){
						this.params.skin+=this.params.limit;
						this.getList()
					}else{
						uni.showToast({
							title:"没有数据了哦!"
						})
					}
				}
			},
		onLoad(options){
			// console.log(options)
			for(var i in options){
				// console.log(i)
				this.id=i
			};
			this.getList();
			// const id=Object.key(options);
			// console.log(id);
		},
		//触底事件
		// onReachBottom(){
		// 	if(this.dataMore){
		// 		this.params.skin+=this.params.limit;
		// 		this.getList()
		// 	}else{
		// 		uni.showToast({
		// 			title:"没有数据了哦!"
		// 		})
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	.category_tab {
		.category_tab_title {
			position: relative;
			.title_inner {
				font-size: 20rpx;
				width: 70%;
				margin:0 auto;
			}
	
			.iconsearch {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 5%;
	
			}
		}
	
		.category_tab_content {
			display: flex;
			flex-wrap: wrap;
			height: calc(100vh - 43px);
			.category_imgs_item{
				width: 33.33%;
				border: 5rpx solid #FFFFFF;
				image{
					width: 100%;
				}
			}
		}
	}
</style>
