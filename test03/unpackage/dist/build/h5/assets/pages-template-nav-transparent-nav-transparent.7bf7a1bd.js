import{_ as e,o as a,c as s,w as l,a as t,m as u,B as c,C as i,F as d,b as n,g as p,i as r,j as f,J as o,t as m,h,H as g,E as _}from"./index.fb84ef13.js";var b=e({data:()=>({showSwiper:!1,imgUrls:["../../../static/shuijiao.jpg","https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4b60b10-5168-11eb-bd01-97bc1429a9ff.jpg","https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b1dcfa70-5168-11eb-bd01-97bc1429a9ff.jpg"],items:[{value:"img",name:"静态图",checked:!0},{value:"swiper",name:"轮播图",checked:!1}]}),methods:{radioChange(e){this.showSwiper="swiper"===e.detail.value}}},[["render",function(e,b,w,k,v,y){const C=p,U=r,j=h,S=f,x=g,E=_,G=o;return a(),s(U,{class:"page"},{default:l((()=>[v.showSwiper?u("",!0):(a(),s(U,{key:0,class:"img-view"},{default:l((()=>[t(C,{src:v.imgUrls[0]},null,8,["src"])])),_:1})),v.showSwiper?(a(),s(S,{key:1,"indicator-dots":"true"},{default:l((()=>[(a(!0),c(d,null,i(v.imgUrls,((e,u)=>(a(),s(j,{key:u},{default:l((()=>[t(C,{src:e},null,8,["src"])])),_:2},1024)))),128))])),_:1})):u("",!0),t(U,{class:"uni-padding-wrap uni-common-mt"},{default:l((()=>[t(U,{class:"uni-title"},{default:l((()=>[t(U,null,{default:l((()=>[n("在App端默认为标题栏透明，当用户向下滚动时，标题栏逐渐由透明转变为不透明；当用户再次向上滚动时，标题栏又从不透明变为透明状态。")])),_:1}),t(U,null,{default:l((()=>[n("在微信小程序端，导航栏始终为不透明样式。")])),_:1})])),_:1}),t(U,{class:"uni-title uni-common-mt"},{default:l((()=>[n("图片类型")])),_:1})])),_:1}),t(U,{class:"uni-list"},{default:l((()=>[t(G,{onChange:y.radioChange},{default:l((()=>[(a(!0),c(d,null,i(v.items,((e,u)=>(a(),s(E,{class:"uni-list-cell uni-list-cell-pd",key:u},{default:l((()=>[t(U,null,{default:l((()=>[n(m(e.name),1)])),_:2},1024),t(U,null,{default:l((()=>[t(x,{value:e.value,checked:e.checked},null,8,["value","checked"])])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["onChange"])])),_:1}),t(U,{style:{height:"1000rpx"}})])),_:1})}],["__scopeId","data-v-6edf7c1c"]]);export{b as default};