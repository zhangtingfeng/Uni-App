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
				<radio-group @change="handleActiveChange($event, Playerobj.active)">
					<label>
						<radio value=1 :checked="Playerobj.active=='1'" /><text>参加</text>
					</label>
					<label>
						<radio value=0 :checked="Playerobj.active=='0'" /><text>不参加</text>
					</label>
				</radio-group>
			</view>



			<view v-for="(CustomeDictionary,index) in CustomeDictionarylist">
				<view class="uni-padding-wrap uni-common-mt">
					<view class="uni-title">{{CustomeDictionary.name?CustomeDictionary.name:CustomeDictionary.configname}}
					</view>
					<view>
						<slider step="1" @change="sliderChangecustom($event,index)" show-value min="0" max="10"
							:value="CustomeDictionary.value" />
					</view>
				</view>
			</view>


			<view class="uni-btn-v">
				<button @click="formSubmit" form-type="submit">Save</button>
				<button type="default" @click="formReset" form-type="reset">Reset</button>
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
				teamoption: {}
			}
		},
		methods: {
			onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
				let letthis = this;
				letthis.teamoption = option;
				let letoperationtype = option.operationtype ? option.operationtype : "add";
				//debugger;

				let leturl = "/api/teamPlayer/getTeamPlayer/" + letoperationtype + "/" + option.playerid;
				console.log("this leturl" + leturl);
				uni.request({
					url: leturl,
					success: (res) => {
						//debugger;
						if (res.data.length > 0) {
							//letthis.CustomeDictionarylist = res.data;

						}
					},
					fail: (err) => {
						console.error(err);
					},
				});

				letthis.readCustonmData();

			},
			readCustonmData() {
				let letthis = this;
				let leturl = "/api/dictionary/list/Custome";
				console.log("this leturl" + leturl);
				uni.request({
					url: leturl,
					success: (res) => {
						//debugger;
						if (res.data.length > 0) {
							let letthisCustomeDictionarylist = res.data;
							let curList = [];
							for (let i = 0; i < letthisCustomeDictionarylist.length; i++) {
								//debugger;
								if (letthisCustomeDictionarylist[i].value > 0) {
									letthisCustomeDictionarylist[i].value = 8;
									letthisCustomeDictionarylist[i].id = null;
									curList.push(letthisCustomeDictionarylist[i]);
								}
							}
							letthis.CustomeDictionarylist = curList;
							localStorage.setItem("CustomeDictionarylist",JSON.stringify(letthis.CustomeDictionarylist));
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
			handleActiveChange($event, id) {
				//debugger;
				this.Playerobj.active = $event.detail.value;
				// console.log("radio-group changed:", this.Playerobj.active);
				console.log('this.Playerobj.active 发生变化：' + this.Playerobj.active);
			},
			formSubmit: function(e) {
				let letthis = this;

				let letoperationtype = letthis.teamoption.operationtype ? letthis.teamoption.operationtype : "add";


				console.log("this  before.Playerobj" + JSON.stringify(this.Playerobj));
				uni.request({
					url: '/api/teamPlayer/insert',
					method: 'POST',
					data: letthis.Playerobj,
					success(res) {
						//debugger;
						letthis.Playerobj = res.data;
						console.log("this after.res.Playerobj" + JSON.stringify(res.data));
						console.log("letthis after.Playerobj" + JSON.stringify(letthis.Playerobj));
						letthis.SaveTeamPlayerConfig(letthis.Playerobj.id);

					},
					fail(err) {
						console.log('teamPlayer失败：', err);
					}
				})
				console.log('save 发生变化：' + e.detail.value);
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				/*var rule = [{
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
				}*/
			},
			formReset: function(e) {
				//debugger;
				let letthis = this;
				letthis.CustomeDictionarylist =JSON.parse(localStorage.getItem("CustomeDictionarylist"));
				//this.readCustonmData();
				console.log('formReset清空数据')
			},
			SaveTeamPlayerConfig(teamPlayerID) {
				let letthis = this;
				let letoperationtype = letthis.teamoption.operationtype ? letthis.teamoption.operationtype : "add";


				let curList = [];
				if (letoperationtype == "add" && letthis.CustomeDictionarylist.length > 0 && letthis.CustomeDictionarylist[
						0].teamplayerid == null) {
					for (let i = 0; i < letthis.CustomeDictionarylist.length; i++) {
						let letPlayConfig = {};
						letPlayConfig.teamplayerid = teamPlayerID;
						letPlayConfig.inactive = letthis.CustomeDictionarylist[i].inactive;
						letPlayConfig.configtype = letthis.CustomeDictionarylist[i].type;
						letPlayConfig.configname = letthis.CustomeDictionarylist[i].name;
						letPlayConfig.value = letthis.CustomeDictionarylist[i].value;
						curList.push(letPlayConfig);
					}
				} else {
					curList = letthis.CustomeDictionarylist;
				}
				//debugger;
				uni.request({
					url: '/api/teamPlayerConfig/saveAll',
					method: 'POST',
					data: curList,
					success(res) {
						//debugger;
						letthis.CustomeDictionarylist = res.data;
						console.log("this after.res.data" + JSON.stringify(res.data));
						console.log("letthis after.CustomeDictionarylist" + JSON.stringify(letthis
							.CustomeDictionarylist));
						localStorage.setItem("CustomeDictionarylist",JSON.stringify(letthis.CustomeDictionarylist));
						//letthis.uniapiSuccess = letthis.uniapiSuccess + 1;

					},
					fail(err) {
						console.log('获取openid失败：', err);
					}
				})
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
