<template>
	<view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		onShow    : function(option) { //option为object类型，会序列化上个页面传递的参数
		
			/*uni.reLaunch({
				url: '/pages/tabBar/component/component'
			});*、
			
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
		
			/*uni.reLaunch({
				url: '/pages/tabBar/component/component'
			});*/
			
		},
	}
</script>

<style>
	.flex-item {
		width: 33.3%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}

	.flex-item-V {
		width: 100%;
		height: 150rpx;
		text-align: center;
		line-height: 150rpx;
	}

	.text {
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}

	.desc {
		/* text-indent: 40rpx; */
	}
	.flex-pc {
		display: flex;
		justify-content: center;
	}
</style>
