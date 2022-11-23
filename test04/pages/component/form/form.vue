<template>
	<view>
<<<<<<< HEAD
		
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
=======
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">

			<view class="uni-form-item uni-column">
				<view class="title">队员称呼</view>
				<input class="uni-input" name="nickname" v-model="Playerobj.nickname" placeholder="请输入队员称呼" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">号码</view>
				<input class="uni-input" type="number" name="playernumber" v-model="Playerobj.playernumber"
					placeholder="请输入号码" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">位置</view>
				<input class="uni-input" name="playerrole" v-model="Playerobj.playerrole" placeholder="请输入队员角色" />
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
					<view class="uni-title">
						{{CustomeDictionary.name?CustomeDictionary.name:CustomeDictionary.configname}}
					</view>
					<view>
						<slider step="0.1" @change="sliderChangecustom($event,index)" show-value min="0" max="10"
							:value="CustomeDictionary.value" />
					</view>
				</view>
			</view>


			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-title">发挥率%</view>
				<view>
					<slider-range :value="rangeValue" :min="rangeMin" :max="rangMax" :step="1" :bar-height="3"
						:block-size="26" background-color="#EEEEF6" active-color="#FF6B00" :format="format"
						:decorationVisible="true" @change="handleRangeChange"></slider-range>
				</view>
			</view>

			<view class="uni-btn-v">
				<button @click="formSubmit" form-type="submit">Save</button>

			</view>

>>>>>>> dev
		</view>
	</view>
</template>
<script>
	import graceChecker from "../../../common/graceChecker.js"
<<<<<<< HEAD
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
=======
	import SliderRange from '../../../components/primewind-sliderrange/components/primewind-sliderrange/index.vue'
	export default {
		components: {
			SliderRange
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数

			console.log(option.operationtype); //打印出上个页面传递的参数。
			console.log(option.name); //打印出上个页面传递的参数。
		},
		data() {
			return {
				rangeMin: 30,
				rangMax: 200,
				rangeValue: [95, 110],
				title: '设置队员的分项能力',
				CustomeDictionarylist: [],
				Playerobj: {
					"active": 0,
					"nickname": "",
					"playernumber": "",
					"playerrole": ""
				},
				teamoption: {}
			}
		},
		methods: {
			onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
				let letthis = this;
				letthis.teamoption = option;
				letthis.readCustonmData(option);





			},


			readCustonmData(argoption) {
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
							let letoperationtype = argoption.operationtype;
							if (letoperationtype == "modify") {
								letthis.readPlayerData(argoption);
							}
						}
					},
					fail: (err) => {
						console.error(err);
					},
				});
			},
			readPlayerData(argoption) {
				let letthis = this;
				//debugger;			
				let leturl = "/api/teamPlayer/getTeamPlayer/modify/" + argoption.playerid;
				//debugger;
				console.log("this leturl" + leturl);
				uni.request({
					url: leturl,
					success: (res) => {
						//debugger;
						if (res.data) {
							//debugger;
							letthis.Playerobj = res.data;
							letthis.rangeValue = JSON.parse(res.data.activepercent);
							let letCustomeDictionarylist = letthis.CustomeDictionarylist;
							for (let i = 0; i < letCustomeDictionarylist.length; i++) {
								for (let j = 0; j < letthis.Playerobj.teamPlayerConfig.length; j++) {
									if (letthis.Playerobj.teamPlayerConfig[j].configname ==
										letCustomeDictionarylist[i].name) {
										letCustomeDictionarylist[i].id = letthis.Playerobj.teamPlayerConfig[j]
											.id;
										letCustomeDictionarylist[i].value = letthis.Playerobj.teamPlayerConfig[
											j].value;

										//debugger;
										break;
									}

								}
							}
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
				letthis.Playerobj.activepercent = JSON.stringify(this.rangeValue);

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
						//debugger;
						letthis.SaveTeamPlayerConfig(letthis.Playerobj.id);

						console.log('switchTab 发生变化：');
						//debugger;

					},
					fail(err) {
						console.log('teamPlayer失败：', err);
					}
				});


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
				letthis.CustomeDictionarylist = JSON.parse(localStorage.getItem("CustomeDictionarylist"));
				//this.readCustonmData();
				console.log('formReset清空数据');
			},
			SaveTeamPlayerConfig(teamPlayerID) {
				let letthis = this;
				let letoperationtype = letthis.teamoption.operationtype ? letthis.teamoption.operationtype : "add";

				//debugger;
				let curList = [];
				/*if (letoperationtype == "add" && letthis.CustomeDictionarylist.length > 0 && letthis.CustomeDictionarylist[
						0].teamplayerid == null) {
					
				} else {
					debugger;
					curList = letthis.CustomeDictionarylist;
				}*/

				for (let i = 0; i < letthis.CustomeDictionarylist.length; i++) {
					let letPlayConfig = {};
					letPlayConfig.teamplayerid = teamPlayerID;
					letPlayConfig.inactive = letthis.CustomeDictionarylist[i].inactive;
					letPlayConfig.configtype = letthis.CustomeDictionarylist[i].type;
					letPlayConfig.configname = letthis.CustomeDictionarylist[i].name;
					letPlayConfig.value = letthis.CustomeDictionarylist[i].value;

					if (letoperationtype == "modify") {
						letPlayConfig.id = letthis.CustomeDictionarylist[i].id;
					}

					curList.push(letPlayConfig);
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

						uni.reLaunch({
							url: '/pages/tabBar/component/component'
						});
						//letthis.uniapiSuccess = letthis.uniapiSuccess + 1;

					},
					fail(err) {
						console.log('获取openid失败：', err);
					}
				})
			},
			format(val) {
				return val + '%'
			},
			handleRangeChange(e) {
				this.rangeValue = e
				console.log(e);
>>>>>>> dev
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
