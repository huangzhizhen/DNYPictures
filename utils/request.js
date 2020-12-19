//封装异步请求之后
//需要挂载到原型上（即在入口文件main.js中）便可以使用this.request

export default (params) => {

		return new Promise((resolve, reject) => {
			uni.showLoading({
				title:"加载中"
			})
			//微信小程序的内置
			wx.request({
				...params,
				success(res) {
					resolve(res.data);
				},
				fail(err) {
					reject(err)
				},
				complete() {
					uni.hideLoading();
				}
			})
		})
	}
