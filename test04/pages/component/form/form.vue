<template>
	<view>
		
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">队员称呼</view>
					<input class="uni-input" name="nickname" placeholder="请输入队员称呼" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">是否参与分组</view>
					<radio-group name="ifonline">
						<label>
							<radio value="online" /><text>参加</text>
						</label>
						<label>
							<radio value="offline" /><text>不参加</text>
						</label>
					</radio-group>
				</view>
				
				<view class="uni-form-item uni-column">
					<view class="title">进攻</view>
					<slider value="2" step="1"  @change="sliderChange" show-value min="1" max="10" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">防守</view>
					<slider value="2" step="1"  @change="sliderChange" show-value min="1" max="10" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">组织</view>
					<slider value="2" step="1"  @change="sliderChange" show-value min="1" max="10" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">传球</view>
					<slider value="2" step="1"  @change="sliderChange" show-value min="1" max="10" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">团队</view>
					<slider value="2" step="1"  @change="sliderChange" show-value min="1" max="10" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">其他</view>
					<slider value="2" step="1"  @change="sliderChange" show-value min="1" max="10" />
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
					<button type="default" form-type="reset">Reset</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	import graceChecker from "../../../common/graceChecker.js"
	export default {
		data() {
			return {
			}
		},
		methods: {
			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                //定义表单规则
                var rule = [
                    {name:"nickname", checkType : "string", checkRule:"1,6",  errorMsg:"姓名应为1-6个字符"},
					 {name:"ifonline", checkType : "in", checkRule:"online,offline",  errorMsg:"是否参与分组"},
                    {name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
                    {name:"loves", checkType : "notnull", checkRule:"",  errorMsg:"请选择爱好"}
                ];
                //进行表单检查
                var formData = e.detail.value;
                var checkRes = graceChecker.check(formData, rule);
                if(checkRes){
                    uni.showToast({title:"验证通过!", icon:"none"});
                }else{
                    uni.showToast({ title: graceChecker.error, icon: "none" });
                }
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
