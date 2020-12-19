<!-- z专辑详情页 -->
<template>
	<view>
		<!-- 专辑背景 -->
		<view class="album_bg">
			<image class="album_cover" :src="album.cover" mode="widthFix">

			</image>
			<view class="album_info">
				<view class="album_desc">
					{{album.name}}
				</view>
				<view class="album_button">
					<view class="album_content">关注专辑</view>
				</view>
			</view>
		</view>
		<!-- 专辑背景 -->

		<!-- 专辑作者 -->
		<view class="album_author">
			<view class="album_author_info">
				<view class="album_author_pic">
					<image :src="album.user.avatar" mode="widthFix"></image>
				</view>
				<view class="album_author_name">
					<text>{{album.user.name}}</text>
				</view>
			</view>
			<view class="album_author_desc">
				{{album.desc}}
			</view>
		</view>
		<!-- 专辑作者 -->


		<!-- 专辑图片列表 -->
		<view class="album_list">
			<view class="album_item" v-for="(item,index) in photos">
				<go-detail :list="photos" :index="item.id">
					<image :src="item.img" :key="item.id" mode="aspectFill"></image>
				</go-detail>
			</view>
		</view>
		<!-- 专辑图片列表 -->
	</view>
</template>

<script>
	import goDetail from '../../components/goDetail.vue'
	export default {
		components: {
			goDetail
		},
		data() {
			return {
				params: {
					limit: 30,
					order: "new",
					skip: 0,
					//1--第一次请求数据(返回值中有album对象)
					//0 不是第一次请求数据(返回值中只有wallpaper数组)
					first: 1
				},
				id: -1,
				album: {},
			
				photos: [
					{
						id:0,
						img:"http://img5.adesk.com/5efdbdb9e7bce7372377050a?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'学无无无止境鸭!',
							avatar:"http://img5.adesk.com/5c10af74e7bce704a6350c41?imageView2/3/h/240",	
						}
						
					},
					{
						id:1,
						img:"http://img5.adesk.com/5eecae05e7bce739655156c3?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'aaaaaa!',
							avatar:"http://img5.adesk.com/5f0e6ba7e7bce77827f1da10?imageView2/3/h/240",	
						}
						
					},
					{
						id:2,
						img:"http://img5.adesk.com/5f0ed986e7bce778489d6600?imageView2/3/h/240",
						
						avetor:"http://img5.adesk.com/5f06f487e7bce7375e60ba3e?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'bbbbbb!',
							avatar:"http://img5.adesk.com/5b35aabc31f6136469ef0fe5?imageView2/3/h/240",	
						}
						
					},
					{
						id:3,
						img:"http://img5.adesk.com/5f87b807e7bce761c72583ae?imageView2/3/h/240",
						
						avetor:"http://img5.adesk.com/5f06f487e7bce7375e60ba3e?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'cccccc!',
							avatar:"http://img5.adesk.com/5e269d8be7bce7393fd169f0?imageView2/3/h/240",	
						}
						
					},
					{
						id:4,
						img:"http://img5.adesk.com/5f6460f9e7bce75eee0c845f?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'会让人同年!',
							avatar:"http://img5.adesk.com/5ee8a18ae7bce7393fd1a791?imageView2/3/h/240",	
						}
						
					},
					{
						id:5,
						img:"http://img5.adesk.com/5efdbdb9e7bce7372377050a?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'dddddd!',
							avatar:"http://img5.adesk.com/5ccff47ce7bce720e115e45f?imageView2/3/h/240",	
						}
						
					},
					{
						id:6,
						img:"http://img5.adesk.com/5eecae05e7bce739655156c3?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'eeeeeee!',
							avatar:"http://img5.adesk.com/5d149fa8e7bce7210c067a44?imageView2/3/h/240",	
						}
						
					},
					{
						id:7,
						img:"http://img5.adesk.com/5f0ed986e7bce778489d6600?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'fffffff!',
							avatar:"http://img5.adesk.com/5f325c68e7bce77880d61366?imageView2/3/h/240",	
						}
						
					},
					{
						id:8,
						img:"http://img5.adesk.com/5f87b807e7bce761c72583ae?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'gggggg!',
							avatar:"http://img5.adesk.com/5f06f487e7bce7375e60ba3e?imageView2/3/h/240",	
						}
						
					},
					{
						id:9,
						img:"http://img5.adesk.com/5f6460f9e7bce75eee0c845f?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'hhhhhhhh!',
							avatar:"http://img5.adesk.com/5f06f487e7bce7375e60ba3e?imageView2/3/h/240",	
						}
						
					},
					{
						id:10,
						img:"http://img5.adesk.com/5efdbdb9e7bce7372377050a?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'iiiiiiiii!',
							avatar:"http://img0.adesk.com/download/5687124d69401b24c8da66db",	
						}
						
					},
					{
						id:11,
						img:"http://img5.adesk.com/5eecae05e7bce739655156c3?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'jjjjjjjjjjjj!',
							avatar:"http://img5.adesk.com/5f06f487e7bce7375e60ba3e?imageView2/3/h/240",	
						}
						
					},
					{
						id:12,
						img:"http://img5.adesk.com/5f0ed986e7bce778489d6600?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'kkkkkkkkkk!',
							avatar:"http://img5.adesk.com/5f06f487e7bce7375e60ba3e?imageView2/3/h/240",	
						}
						
					},
					{
						id:13,
						img:"http://img5.adesk.com/5f87b807e7bce761c72583ae?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'lllllll!',
							avatar:"http://img5.adesk.com/5f06f487e7bce7375e60ba3e?imageView2/3/h/240",	
						}
						
					},
					{
						id:14,
						img:"http://img5.adesk.com/5f6460f9e7bce75eee0c845f?imageView2/3/h/240",
						rank:7550,
						time:'5天前',
						atime:1511308982,
						user:{
							name:'ooooooooo!',
							avatar:"http://img5.adesk.com/5f06f487e7bce7375e60ba3e?imageView2/3/h/240",	
						}
						
					}
					
		
				],
			
			}
		},
		onLoad(options) {
			// console.log(options)
			this.id = options.id;
			// this.id="5fc9d441e7bce72c43389db0"
			this.getList();
		},
		methods: {
			getList() {
				this.request({
					url: `http://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,
					// url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params
				}).then(result => {
					console.log(result)
					this.album = result.res.album;
				})
			}
		},
		//区别于scroll-view
		//使用下方这个时整个页面的分页
		onReachBottom() {
			uni.showToast({
				title: "没有数据了哦!"
			})
		}
	}
</script>

<style lang="scss" scoped>
	.album_bg {
		position: relative;

		.album_cover {}

		.album_info {
			padding: 0 15rpx;
			position: absolute;
			width: 100%;
			height: 80rpx;
			display: flex;
			// justify-content: center;
			align-items: center;
			// justify-content: space-around;
			justify-content: space-between;
			bottom: 10rpx;

			.album_desc {
				font-size: 34rpx;
				color: white;
				padding-left: 10rpx;
			}

			.album_button {

				.album_content {
					color: white;
					font-size: 32rpx;
					background-color: $color;
					width: 150rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 10rpx;
				}
			}
		}
	}

	.album_author {
		padding: 15rpx;

		.album_author_info {

			display: flex;

			.album_author_pic {
				padding: 10rpx;

				image {
					width: 70rpx;
					height: 70rpx;
				}

			}

			.album_author_name {
				color: black;
				margin-left: 15rpx;
			}
		}

		.album_author_desc {}
	}

	.album_list {
		display: flex;
		flex-wrap: wrap;

		.album_item {
			width: 33.33%;
			image{
				height: 160rpx;
				border: 5rpx solid white;
			}
		
		}
	}
</style>
