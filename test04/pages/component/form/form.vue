<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">

			<view class="uni-form-item uni-column">
				<view class="title">队员称呼</view>
				<input class="uni-input" name="nickname" v-model="Playerobj.nickname" placeholder="请输入队员称呼" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">是否参与分组</view>
				<radio-group  @change="handleActiveChange($event, Playerobj.active)">
					<label>
						<radio value=1  :checked="Playerobj.active=='1'" /><text>参加</text>
					</label>
					<label>
						<radio value=0 :checked="Playerobj.active=='0'"  /><text>不参加</text>
					</label>
				</radio-group>
			</view>



			<view v-for="(CustomeDictionary,index) in CustomeDictionarylist">
				<view class="uni-padding-wrap uni-common-mt">
					<view class="uni-title">{{CustomeDictionary.name}}
					</view>
					<view>
						<slider step="1" @change="sliderChangecustom($event,index)" show-value min="0" max="10"
							:value="CustomeDictionary.value" />
					</view>
				</view>
			</view>


			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>

		</view>
	</view>
</template>
<script>
	import graceChecker from "../../../common/graceChecker.js"
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			
			console.log(option.operationtype); //打印出上个页面传递的参数。
			console.log(option.name); //打印出上个页面传递的参数。
		},
		data() {
			return {
				title: '设置队员的分项能力',
				CustomeDictionarylist: [],
				Playerobj: {
					"active": 1,
					"nickname": ""
				},
			}
		},
		methods: {
			onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
				let letthis = this;
				let letoperationtype = option.operationtype;
				letoperationtype="add";
				//debugger;
				
				let leturl = "/api/teamPlayer/getTeamPlayer/"+option.operationtype+"/"+option.playerid;
				console.log("this leturl" + leturl);
				uni.request({
					url: leturl,					
					success: (res) => {
						//debugger;
						if (res.data.length > 0) {
							letthis.CustomeDictionarylist = res.data;
							
						}
					},
					fail: (err) => {
						console.error(err);
					},
				});
			},
			sliderChangecustom(e, eindex) {
				this.CustomeDictionarylist[eindex].value = e.detail.value;
				//this.CustomeDictionarylist[eindex]=e.detail.value;
				//debugger;
				console.log('this.CustomeDictionarylist[' + eindex + '] 发生变化：' + e.detail.value)
				//debugger;
				console.log('this.CustomeDictionarylist 发生变化：' + JSON.stringify(this.CustomeDictionarylist));
			},
			handleActiveChange($event,id) {
				//debugger;
				this.Playerobj.active=$event.detail.value;
				// console.log("radio-group changed:", this.Playerobj.active);
				console.log('this.Playerobj.active 发生变化：' + this.Playerobj.active);
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [{
						name: "nickname",
						checkType: "string",
						checkRule: "1,6",
						errorMsg: "姓名应为1-6个字符"
					},
					{
						name: "ifonline",
						checkType: "in",
						checkRule: "online,offline",
						errorMsg: "是否参与分组"
					},
					{
						name: "gender",
						checkType: "in",
						checkRule: "男,女",
						errorMsg: "请选择性别"
					},
					{
						name: "loves",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择爱好"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
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
