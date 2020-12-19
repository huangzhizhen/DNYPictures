<template>
	<scroll-view scroll-y enable-flex class="video" @scrolltolower="handleToLower">
		<view class="video_item" v-for="item in videoList" :key="item.id" @click="handleGoVideo(item)">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
	// 思路:
	//将请求的参数封装在标题数组中
	//然后动态传递过来.(这样便于操作)
	//但是要注意我们公用的是一个video-main组件,因此需要使用watch来监听传过来的urlObj值的变化!(因为mounted是无法重复触发的)
	export default{
		props:{
			urlObj:Object
		},
		data(){
			return{
				videoList:[],
				dataMore:true
			}
		},
		//但是需要注意的时mounted钩子函数中表示组件以及挂载完毕,那么当你点击切换时(由于是共用一个组件,而此时以及挂载完毕,那么是无法变化的)
		//因此,使用watch监听变化来改变接收的urlObj值
		//记住mounted只会触发一次!!!
		//但是还是需要在mounted中发送请求,因此组件被创建时触发的是mounted钩子函数,watch是不会管的
		//但是也需要在watch中监听urlObj即请求参数的变化,重新发送请求跟新数据
		mounted(){
			console.log(this.urlObj);
			this.getList();
			
		},
		watch:{
			urlObj(){
				// console.log('参数翻身');
				// console.log(this.urlObj);
				//当urlObj发生改变时,也发送请求
				//skip参数不用改变,因为此时当你点击不同项时,参数时重新传递的,每次重新的时候skip值是为0
				//这里watch监听了urlObj的变化,便可以不使用广播事件,这样更为简便
				this.videoList=[]
				this.getList();
			}
				
		},
		methods:{
			getList(){
				this.request({
					url:this.urlObj.url,
					data:this.urlObj.params
				}).then(result=>{
					// console.log(result)
					if(result.res.videowp.length===0){
						this.dataMore=false;
						uni.showToast({
							title:"没有更多数据了哦!",
							icon:'none'
						});
						return ;
						
					}
					this.videoList=[...this.videoList,...result.res.videowp]
					// console.log(this.videoList)
				})
			},
			handleToLower(){
				if(this.dataMore){
					this.urlObj.params.skip+=this.urlObj.params.limit;
					this.getList()
				}else{
					uni.showToast({
						title:"没有更多数据了哦!",
						icon:'none'
					})
				}
			},
			handleGoVideo(item){
				//1.存到全局数据中
				getApp().globalData.video=item;
				uni.navigateTo({
					url:'/pages/videoPlay/index'
				})
				
			}
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.video{
		height: calc(100vh - 36px);
		display: flex;
		flex-wrap: wrap;
		.video_item{
			width: 33.33%;
			border: 5rpx solid #FFFFFF;
			image{
				
			}
		}
	}
</style>
