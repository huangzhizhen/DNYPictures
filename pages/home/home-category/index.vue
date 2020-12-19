<template>
	<view class="home_category">
		<navigator class="cate_item" v-for="item in category" :key="item.id" :url="`/pages/imgCategory/index?${item.id}`">
			<image :src="item.cover" mode="aspectFill"></image>
			<view class="cate_name">
				{{item.name}}
			</view>
		</navigator>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				category: []
			}
		},
		methods: {
			async getList() {
				const result = await this.request({
					url: 'http://service.picasso.adesk.com/v1/vertical/category'
				})
				// console.log(result)
				this.category = result.res.category;
				console.log(this.category)
			}
		},

		mounted() {
			uni.setNavigationBarTitle({
					title: '分类'
				}),
				this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.home_category {

		display: flex;
		flex-wrap: wrap;

		.cate_item {
			position: relative;
			// width: 33.33%;
			image {
				width: 250rpx;
				height: 250rpx;
				border: 5rpx solid white;
			}

			.cate_name {
				position: absolute;
				width: 100%;
				height: 50rpx;
				bottom: 5rpx;
				left: 0rpx;
				font-size: 34rpx;
				padding-left: 20rpx;
				line-height: 50rpx;
				color: white;
				background-image: linear-gradient(to right top,rgba(0,0,0,.2),rgba(0,0,0,0));
			}
		}


	}
</style>
