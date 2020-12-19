<template>
	<scroll-view scroll-y @scrolltolower="lower" class="album_scroll_swiper">
		<!-- 轮播图开始 可以查看小程序开发文档-->
		<!--  -->
		<view class="swiper_album">
			<swiper indicator-dots autoplay interval="2000" circular class="ablum_swiper">
				<swiper-item v-for="item in banner" :key="item.id">
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 轮播图结束 -->

		<!-- 列表开始啦 -->
		<view class="album_list">
			<!-- 循环项 -->
			<navigator class="album_item" v-for="(item,index) in album" :key="item.id" :url="`/pages/album/index?id=${item.id}`">
				<view class="album_img">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="album_info">
					<view class="album_name">
						{{item.name}}
					</view>
					<view class="album_desc">
						{{item.desc}}
					</view>
					<view class="album_button">
						<view class="album_attention"> + 关注 </view>
					</view>
				</view>

			</navigator>
		</view>
		<!-- 列表结束啦 -->
	</scroll-view>
</template>

<script>
	export default {
		
		data() {
			return {
				params: {
					limit: 30,
					order: "new",
					skip: 0
				},
				//轮播图数据
				banner: [],
				//列表数组
				album: [],
				dataMore:true
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: '专辑'
			})
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					url: 'http://service.picasso.adesk.com/v1/wallpaper/album',
					data: this.params
				}).then(result => {
					//当没有请求数据后,改变dataMore的状态
					if(result.res.album.length===0){
						this.dataMore=false;
						return;
					}
					// console.log(result);
					//反之多次请求时其重复赋值
					if(this.banner.length===0){
						this.banner = result.res.banner;
					}
					
					this.album = [...this.album,...result.res.album]
					// console.log(this.banner)
				})
			},
			lower(e){
				// console.log(e)
				if(this.dataMore){
					this.params.skip+=this.params.limit;
					this.getList();
				}else{
					uni.showToast({
						title:'没有数据了哦!',
						icon:'none'
					})
				}
				
			}
		}

	}
</script>

<style lang="scss" scoped>
	.album_scroll_swiper{
		height: calc( 100vh - 40px );
	}
	.ablum_swiper {
		//  414/183=750/x
		height: calc(750rpx / 2.3);

		image {
			width: 100%;
			height: 100%;
		}
	}

	.album_list {
		padding: 10rpx;

		.album_item {
			display: flex;
			border-bottom: 1rpx solid #ccc;
			.album_img {
				flex: 1;
				image {
					padding: 10rpx;
					width: 200rpx;
					height: 200rpx;
				}
			}

			.album_info {
				flex: 2;
				padding: 10rpx 10rpx;
				overflow: hidden;
				.album_name {
					font-size: 32rpx;
					font-weight: 600;
					color: black;
					padding-left: 10rpx;
				}

				.album_desc {
					color: #666;
					padding: 15rpx 10rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.album_button {
					display: flex;
					justify-content: flex-end;
					.album_attention {
						color: $color;
						font-weight: 600;
						border: 1rpx solid $color;
						border-radius: 10rpx;
						width: 100rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>
