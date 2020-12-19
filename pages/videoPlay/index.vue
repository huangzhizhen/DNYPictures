<template>
	<view class="video_play">
		<!-- 背景 -->
		<image :src="videoObj.img"></image>
		<!-- 工具栏开始了 -->
		<view class="video_tools">
			<view :class="['iconfont',!muted?'iconshengyin':'iconjingyin']" @click="handleAbuse"></view>
			<view class="iconfont iconzhuanfa">
				<button open-type="share"></button>
			</view>
		</view>
		<!-- 工具栏结束了 -->
		<!-- 视频开始了 -->
		<view class="video_wrap">
			<video :src="videoObj.video" controls objectFit="fill" :muted="muted"></video>
		</view>
		<!-- 视频开始了 -->
		
		
		<!-- 下载 -->
		<view class="onload">
			<view class="onload_button" @click="onLoadToLocal">
				下载高清
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				videoObj:{},
				muted:false,//是否静音
				
			}
		},
		onLoad(){
			// console.log(getApp().globalData)
			this.videoObj=getApp().globalData.video
		},
		methods:{
			handleAbuse(){
				this.muted=!this.muted;
			},
			async onLoadToLocal(){
				//分两步
				//1.保存到小程序内置内存
				//2.保存到本地
				// uni.downloadFile({
				// 	url:this.videoObj.video
				// }).then(result=>{
				// 	// console.log(result)
				uni.showLoading({
					title: "视频下载中"
				})
				const result1=await uni.downloadFile({
					url:this.videoObj.video
				})
				const {tempFilePath}=result1[1]
				console.log(tempFilePath);
				// })
				
				const result2=await uni.saveVideoToPhotosAlbum({
					filePath:tempFilePath
				})
				uni.hideLoading(
					await uni.showToast({
						title: "视频下载成功",
					})
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video_play{
		position: relative;
		image{
			width: 100vw;
			height: 100vh;
			position: absolute;
			z-index: -1;
			filter: blur(15px);
		}
		.video_tools{
			height: 70rpx;
			display: flex;
			justify-content: flex-end;
			margin: 15rpx 0;
			.iconfont{
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				width: 70rpx;
				// height: 80rpx;
				font-size: 50rpx;
				background-color:rgba(0,0,0,0.2);
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.iconzhuanfa{
				position: relative;
				button{
					position: absolute;
					// opacity: 1;
					width: 100%;
					height: 100%;
					background-color: rgba(0,0,0,0);
				}
			}
		}
		.video_wrap{
			display: flex;
			justify-content: center;
			video{
				width: 360rpx;
				height: 600rpx;
			}
		}
		.onload{
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			.onload_button{
				width: 360rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;	
				color: #FFFFFF;
				background-color: rgba(0,0,0,0.2);
				border-radius: 40rpx;
				border: 1rpx solid #FFFFFF;
			}
		}
		
	}
</style>
