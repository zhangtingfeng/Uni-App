import{_ as l,aJ as s,o as e,c as a,w as t,a as u,b as i,r as d,d as n,e as c,i as f,I as p,v as _}from"./index.fb84ef13.js";var o=l({data:()=>({title:"getSystemInfo",systemInfo:{}}),onUnload:function(){this.systemInfo={}},methods:{getSystemInfo:function(){s({success:l=>{this.systemInfo=l}})}}},[["render",function(l,s,o,y,b,h){const m=d(c("page-head"),n),r=f,v=p,x=_;return e(),a(r,null,{default:t((()=>[u(m,{title:b.title},null,8,["title"]),u(r,{class:"uni-common-mt"},{default:t((()=>[u(r,{class:"uni-list"},{default:t((()=>[u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("设备型号")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.model},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("客户端平台")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.platform},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("操作系统版本")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.system},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("语言")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.language},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("版本")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.version},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("屏幕宽度")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.screenWidth},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("屏幕高度")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.screenHeight},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("可使用窗口高度")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.windowHeight},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("可使用窗口的顶部位置")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.windowTop},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("可使用窗口的底部位置")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.windowBottom},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("状态栏的高度")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.statusBarHeight},null,8,["value"])])),_:1})])),_:1}),u(r,{class:"uni-list-cell"},{default:t((()=>[u(r,{class:"uni-pd"},{default:t((()=>[u(r,{class:"uni-label",style:{width:"180px"}},{default:t((()=>[i("DPI")])),_:1})])),_:1}),u(r,{class:"uni-list-cell-db"},{default:t((()=>[u(v,{class:"uni-input",type:"text",disabled:!0,placeholder:"未获取",value:b.systemInfo.pixelRatio},null,8,["value"])])),_:1})])),_:1})])),_:1}),u(r,{class:"uni-padding-wrap"},{default:t((()=>[u(r,{class:"uni-btn-v"},{default:t((()=>[u(x,{type:"primary",onClick:h.getSystemInfo},{default:t((()=>[i("获取设备系统信息")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-1425791c"]]);export{o as default};