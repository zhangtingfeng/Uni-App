import{_ as a,$ as t,o as e,c as l,w as n,a as o,b as d,r as i,d as s,e as c,v as m,i as u}from"./index.fb84ef13.js";var f=a({data:()=>({title:"modal",modalHidden:!0,modalHidden2:!0}),methods:{modalTap:function(a){t({title:"弹窗标题",content:"弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",showCancel:!1,confirmText:"确定"})},noTitlemodalTap:function(a){t({content:"弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",confirmText:"确定",cancelText:"取消"})}}},[["render",function(a,t,f,r,p,T){const _=i(c("page-head"),s),x=m,C=u;return e(),l(C,null,{default:n((()=>[o(_,{title:p.title},null,8,["title"]),o(C,{class:"uni-padding-wrap uni-common-mt"},{default:n((()=>[o(C,{class:"uni-btn-v"},{default:n((()=>[o(x,{type:"default",onClick:T.modalTap},{default:n((()=>[d("有标题的modal")])),_:1},8,["onClick"]),o(x,{type:"default",onClick:T.noTitlemodalTap},{default:n((()=>[d("无标题的modal")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})}]]);export{f as default};