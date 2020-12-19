<template>
	<view>
		<!-- 用户信息开始啦 -->
		<view class="user_info">
			<view class="user_icon">
				<image :src="imgDetail.user.avatar?imgDetail.user.avatar:'http://img5.adesk.com/5f87b807e7bce761c72583ae?imageView2/3/h/240'"
				 mode="aspectFill">
				</image>
			</view>
			<view class="user_desc">
				<view class="user_name">
					{{imgDetail.user.name?imgDetail.user.name:'我是一只小可爱'}}
				</view>
				<view class="user_time">
					{{imgDetail.cntime}}
				</view>
			</view>
		</view>
		<!-- 用户信息结束啦 -->

		<!-- 图片 -->
		<view class="high_img">
			<image :src="imgDetail.img" mode="widthFix"></image>
		</view>

		<!-- 点赞 -->
		<view class="uer_rank">
			<view class="rank">
				<text class="iconfont icondianzan">{{imgDetail.rank}}</text>
			</view>
			<view class="user_collect">
				<text class="iconfont iconshoucang"> 收藏 </text>
			</view>

		</view>
		<!-- 点赞 -->

		<!-- 专辑开始了 -->
		<view class="album_wrap">
			<view class="about">
				相关
			</view>
			<view class="album_desc">
				<view class="ablum_pic">
					<image :src="album.album_pic" mode="aspectFill"></image>
				</view>
				<view class="album_info">
					<view class="album_title">
						专辑
					</view>
					<view class="album_name">
						{{album.album_name}}
					</view>
				</view>
				<view class="jiantou">
					<text class="iconfont iconiconfontjiantou4"></text>
				</view>
			</view>


		</view>
		<!-- 专辑结束了 -->

		<!-- 最热评论 -->

		<view class="commont hot">
			<view class="commont_title">
				<text class="iconfont iconhot1"></text>
				<text class="comment_text">
					最热评论
				</text>
			</view>
			<view class="comment_list">
				<view class="comment_item" v-for="(item,index) in hot" :key="index">
					<!-- <image :src="item.pic" mode="widthFix"></image> -->
					<view class="user_info">
						<!-- 用户头像 -->
						<view class="user_pics">
							<image :src="item.pic" mode="aspectFill"></image>
						</view>
						<!-- 用户名称 -->
						<view class="user_desc">
							<view class="user_name">
								{{item.user_name}}
							</view>
							<view class="user_time">
								{{item.cntime}}
							</view>
						</view>
						<!-- 用户徽章 -->
					</view>
					<view class="comment_desc">
						<view class="comment_text">{{item.text}}</view>
						<view class="dianzan">
							<text class="iconfont icondianzan">{{item.rank}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 最热评论 -->

		<!-- 最新评论 -->
		<view class="commont new">
			<view class="commont_title">
				<text class="iconfont iconpinglun"></text>
				<text class="comment_text">
					最新评论
				</text>
			</view>
			<view class="comment_list">
				<view class="comment_item" v-for="(item,index) in hot" :key="index">
					<!-- <image :src="item.pic" mode="widthFix"></image> -->
					<view class="user_info">
						<!-- 用户头像 -->
						<view class="user_pics">
							<image :src="item.pic" mode="aspectFill"></image>
						</view>
						<!-- 用户名称 -->
						<view class="user_desc">
							<view class="user_name">
								{{item.user_name}}
							</view>
							<view class="user_time">
								{{item.cntime}}
							</view>
						</view>
						<!-- 用户徽章 -->
					</view>
					<view class="comment_desc">
						<view class="comment_text">{{item.text}}</view>
						<view class="dianzan">
							<text class="iconfont icondianzan">{{item.rank}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 最新评论 -->

		<!-- 下载图片 -->
		<view class="down_img">
			<view class="down_button" @click="handleDownload">
				下载图片
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment';
	//设置语言为中文
	moment.locale("zh-cn")
	export default {

		data() {
			return {
				imgDetail: {},
				//专辑数组
				album: {
					album_pic: 'http://img5.adesk.com/5d25d01ee7bce72126746183?imageView2/3/h/240',
					album_name: '毕业快乐,一切顺利!',
				},
				//最热评论
				hot: [{
						pic: 'http://img5.adesk.com/5d25d01ee7bce72126746183?imageView2/3/h/240',
						user_name: '我是一只小可爱',
						user_atime: '1511777782',
						rank: 5,
						text: '模块化\组件化'
					},
					{
						pic: 'http://img5.adesk.com/5f51c0c8e7bce7620521f3c9?imageView2/3/h/240',
						user_name: '快乐的程序员',
						user_atime: '1511386982',
						rank: 6,
						text: 'axios拦截器的实现?怎样实现跨域?'
					},
					{
						pic: 'http://img5.adesk.com/5f50696ce7bce76234b880bb?imageView2/3/h/240',
						user_name: 'Pinke',
						user_atime: '1511777782',
						rank: 0,
						text: '数据接口是自己写的吗?如何实现跨域?'
					}
				],


				//最新评论
				comment: []

			}
		},
		onLoad() {
			const {
				list,
				index
			} = getApp().globalData;
			console.log("index", index)
			this.imgDetail = list[index];
			console.log(this.imgDetail)
			//moment函數接收的是毫秒,而傳過去的值为秒,因此需要*1000
			// 将时间戳atime:1511308982----转换成-----xx年前的格式(配合moment.locale("zh-cn")使用)
			this.imgDetail.cntime = moment(this.imgDetail.atime * 1000).fromNow();
			//改变评论数据中的时间格式,并将其添加为cntime属性
			this.hot.forEach(v => v.cntime = moment(v.user_atime * 1000).fromNow())
		},
		methods: {
			getList(id) {
				this.request({
					// url:`http://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`5fc9d441e7bce72c43389db0,
					url: 'http://157.122.54.189:9088/image/v2/wallpaper/${id}/comment`5fc9d441e7bce72c43389db0'
				})
			},
			//点击下载图片
			async handleDownload() {
				//1.将远程文件下载到本地内存中(小程序会返回一个临时路径)
				// uni.downloadFile()
				// uni.saveImageToPhotosAlbum()
				// uni.downloadFile({url:this.imgDetail.img}).then(result=>{})=====等价于async awiat
				// 1.将远程文件下载到本地内存中(小程序会返回一个临时路径)

				//触发下载图片的事件,然后弹出
				uni.showLoading({
					title: "下载中"
				})


				const result1 = await uni.downloadFile({
					url: this.imgDetail.img
				})
				// console.log(result)
				const {
					tempFilePath
				} = result1[1];
				// console.log(tempFilePath)
				//2.将小程序内存中的临时文件下载到本地上
				const result2 = await uni.saveImageToPhotosAlbum({
					filePath: tempFilePath
				})
				//3.提示用户下载成功
				// console.log(result2);
				// console.log('下载成功');

				//下载成功提示
				uni.hideLoading(
					await uni.showToast({
						title: "下载成功",
					})
				)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user_info {
		display: flex;
		padding: 15rpx;

		.user_icon {
			padding: 0 10rpx;

			image {
				border-radius: 50%;
				width: 80rpx;
				height: 80rpx;
			}
		}

		.user_desc {
			margin-left: 10rpx;

			.user_name {

				color: #000;
				font-weight: 600;
			}

			.user_time {
				color: #ccc;
				font-size: 24exp;
				padding: 15rpx 0;
			}
		}
	}

	.uer_rank {
		padding: 20rpx;
		display: flex;
		justify-content: space-around;
		height: 70rpx;
		border-bottom: 1rpx solid #ccc;

		.rank {
			// padding: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				font-size: 24rpx;
			}
		}

		.user_collect {
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				font-size: 24rpx;
			}
		}
	}


	.album_wrap {
		border-bottom: 5rpx solid #eeeeee;
		padding: 10rpx;

		.about {
			margin: 15rpx;
			font-weight: 200;
			color: black;
		}

		.album_desc {
			position: relative;
			display: flex;

			.ablum_pic {

				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.album_info {
				// padding: 15rpx;
				padding-left: 15rpx;

				.album_title {
					font-size: 24rpx;
					background-color: $color;
					height: 50rpx;
					width: 80rpx;
					color: white;
					line-height: 50rpx;
					text-align: center;
				}

				.album_name {
					padding-top: 10rpx;
					font-size: 24rpx;
					color: black;
				}

			}

			.jiantou {
				font-size: 40rpx;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 5%;
			}
		}

	}

	.commont {
		.commont_title {
			padding: 15rpx;

			.iconfont {
				color: red;
				font-size: 40rpx;
				padding-right: 15rpx;
			}

			.comment_text {
				font-weight: 600;
				font-size: 28rpx;
				color: 666;

			}
		}

		.comment_list {
			.comment_item {
				.user_info {
					display: flex;

					.user_pics {
						image {
							width: 50rpx;
							height: 50rpx;
						}

					}

					.user_desc {
						padding-left: 10rpx;

						.user_name {
							font-size: 24rpx;
							color: #666;
							font-weight: 0;
						}

						.user_time {
							font-size: 20rpx;
							color: #d3d3d3;
						}
					}
				}

				.comment_desc {
					display: flex;
					justify-content: space-between;
					padding-left: 80rpx;
					border-bottom: 1rpx solid #ccc;
					padding-bottom: 10rpx;

					.comment_text {
						font-size: 24rpx;
						color: #666;
					}

					.dianzan {
						padding-right: 15rpx;

						text {
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}

	//最新评论
	.new {
		.iconpinglun {
			color: aqua !important;
		}
	}


	.down_img {
		height: 80rpx;
		// width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.down_button {
			width: 100%;
			height: 100%;
			display: flex;
			color: white;
			font-weight: 600;
			justify-content: center;
			align-items: center;
			background-color: $color;
			border-radius: 25rpx;
		}
	}
</style>
