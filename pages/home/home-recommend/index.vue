<!-- 要清除这些是组件并不是页面，因此其生命周期固然也不一样 -->
<template>
	<scroll-view scroll-y class="recommend_view" @scrolltolower="handelToLower" v-if="recommends.length>0">
		<!-- 推荐 -->
		<view class="recommend_wrap">
			<navigator class="recommend_item" v-for="item in recommends" :key="item.id" :url="`/pages/album/index?id=${item.target}`">
				<image mode="widthFix" :src="item.thumb"></image>
			</navigator>
		</view>

		<!-- 月份 -->
		<view class="moment_wrap">
			<view class="moment_title">
				<view class="moment_title_info">
					<view class="moment_info">
						<text> {{monthes.DD}}/ </text>
						{{monthes.MM}}月
					</view>
					<view class="months_text">
						{{monthes.title}}
					</view>
				</view>
				<view class="moment_title_more">更多 >
				</view>
			</view>
			<view class="moment_content">
				<view class="moment_item" v-for="(item,index) in monthes.items" :key="item.id">
					<go-detail :list="monthes.items" :index="index">
						<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
					</go-detail>
				</view>

			</view>
		</view>
		<!-- 月份結束 -->

		<!-- 热门开始啦 -->
		<view class="hots_wrap">
			<view class="hots_title">
				<text>热门</text>
			</view>
			<view class="hots_content">
				<view class="hots_item" v-for="(item,index) in hots" :key="item.id">
					<go-detail :list="hots" :index="index">
					<image mode="widthFix" :src="item.thumb"></image>
					</go-detail>
				</view>
			</view>
		</view>
		<!-- 热门结束啦 -->
	</view>
	
	</scroll-view>
</template>

<script>
	import moment from 'moment';
	import goDetail from '../../../components/goDetail.vue'
	export default {
		components:{
			goDetail
		},
		data() {
			return {
				recommends: [],
				monthes: {}, //月份
				// pics:[]//图片
				hots: [],
				//请求参数
				params:{
					limit: 30,
					//关键字
					order: 'hot',
					//要跳过几条:当请求第一页数据时,跳过0条;请求第二页数据时,跳过30条
					//因此将其提取出来用为全局数据,便于修改
					skip: 0
				},
				dataMore:true
			}
		},
		methods:{
			//滚动条触底事件
			handelToLower(e){
				// console.log(e);
				//当触发底部事件时,还有数据的话,改变skip的值,重新发送请求
				if(this.dataMore){
				this.params.skip+=this.params.limit;
				this.getList();
				}else{
					uni.showToast({
						title:"没有数据了哦!",
						icon:"none"
					})
				}
			},
			getList(){
				this.request({
					url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
					// data: {
					// 	//获取几条数据
					// 	limit: 30,
					// 	//关键字
					// 	order: 'hot',
					// 	//要跳过几条:当请求第一页数据时,跳过0条;请求第二页数据时,跳过30条
					// 	//因此将其提取出来用为全局数据,便于修改
					// 	skip: 0
					// },
					data:this.params
					
				}).then(result => {
					
					// console.log(result)
					//头部推荐部分的数据
					if(result.res.vertical.length===0){
						//表示没有数据了(即新请求的数据为空)
						this.dataMore=false;//这里也牵连到触底事件
						return
					}
					if(this.recommends.length===0){
						//优化代码,反之每次请求hots数据时,以下数据也再次请求
						this.recommends = result.res.homepage[1].items;
						// console.log(this.recommends)
						//月份标题数据
						this.monthes = result.res.homepage[2];
						//引入第三方库moment,将时间戳转换成符合月份的时间格式
						this.monthes.MM = moment(this.monthes.stime).format('MM')
						this.monthes.DD = moment(this.monthes.stime).format('DD')
						// this.pics=this.monthes.items
					}
					
				
					//热门数据
					//拼接,每次请求的数据均拼接起来
					this.hots = [...this.hots,...result.res.vertical];
					// console.log(this.hots)
				
				})
			}
			
		},
		mounted() {
			this.getList(),
			uni.setNavigationBarTitle({
				title:"推荐"
			})
		}
	}
</script>

<style lang="scss" scoped>
	
	.recommend_view{
		//设置滚动的高度等于全屏-导航栏的高度(注意,屏幕高度不能写死,因为每个手机屏幕高不一样)
		//这里设置了高度之后,那么其滚动时不会影响上方的导航,因为其高度时整个屏幕的高度减去了导航栏的高度
		height: calc( 100vh - 43px);
	}
	.recommend_wrap {
		display: flex;
		flex-wrap: wrap; //换行

		.recommend_item {
			width: 50%;
			border: 5rpx solid white;
		}
	}


	//月份
	.moment_wrap {
		.moment_title {
			display: flex;
			// flex-direction: ;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;

			.moment_title_info {
				// padding: 10rpx 15rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: $color;
				font-size: 30rpx;
				font-weight: 600;

				.moment_info {
					text {
						font-size: 36rpx;

					}
				}

				.months_text {
					color: #666;
					margin-left: 20rpx;
				}
			}

			.moment_title_more {
				color: $color;
				font-size: 24rpx;
			}

		}

		.moment_content {
			display: flex;
			flex-wrap: wrap;

			.moment_item {
				width: 33.33%;
				border: 5rpx solid white;
			}

		}

	}

	.hots_wrap {
		.hots_title {
			padding: 20rpx;

			text {
				border-left: 10rpx solid $color;
				color: #666;
				padding-left: 20rpx;
				font-weight: 600;
				font-size: 34rpx;
			}

		}

		.hots_content {
			display: flex;
			flex-wrap: wrap;

			.hots_item {
				width: 33.33%;
				border: 5rpx solid #fff;

			}
		}
	}
</style>
