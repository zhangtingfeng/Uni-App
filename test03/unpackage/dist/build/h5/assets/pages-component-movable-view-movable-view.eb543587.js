import{_ as l,o as t,c as a,w as e,a as n,b as i,r as u,d as s,e as o,f as c,i as d,q as f,u as m}from"./index.fb84ef13.js";var _=l({data:()=>({x:0,y:0,scale:2,old:{x:0,y:0,scale:2}}),methods:{tap:function(l){this.x=this.old.x,this.y=this.old.y,this.$nextTick((function(){this.x=30,this.y=30}))},tap2(){this.scale=this.old.scale,this.scale=this.old.scale,this.$nextTick((function(){this.scale=3}))},onChange:function(l){this.old.x=l.detail.x,this.old.y=l.detail.y},onScale:function(l){this.old.scale=l.detail.scale}}},[["render",function(l,_,r,x,h,p){const v=u(o("page-head"),s),y=c,b=d,g=f,k=m;return t(),a(b,{class:"page-body"},{default:e((()=>[n(v,{title:"movable-view,可拖动视图"}),n(b,{class:"uni-padding-wrap uni-common-mt"},{default:e((()=>[n(b,{class:"uni-title uni-common-mt"},{default:e((()=>[i(" 示例 1 "),n(y,null,{default:e((()=>[i("\\nmovable-view 区域小于 movable-area")])),_:1})])),_:1}),n(k,null,{default:e((()=>[n(g,{x:h.x,y:h.y,direction:"all",onChange:p.onChange},{default:e((()=>[i("text")])),_:1},8,["x","y","onChange"])])),_:1}),n(b,{onClick:p.tap,class:"uni-link uni-center uni-common-mt"},{default:e((()=>[i(" 点击这里移动至 (30px, 30px) ")])),_:1},8,["onClick"]),n(b,{class:"uni-title uni-common-mt"},{default:e((()=>[i(" 示例 2 "),n(y,null,{default:e((()=>[i("\\nmovable-view区域大于movable-area")])),_:1})])),_:1}),n(k,null,{default:e((()=>[n(g,{class:"max",direction:"all"},{default:e((()=>[i("text")])),_:1})])),_:1}),n(b,{class:"uni-title uni-common-mt"},{default:e((()=>[i(" 示例 3 "),n(y,null,{default:e((()=>[i("\\n只可以横向移动")])),_:1})])),_:1}),n(k,null,{default:e((()=>[n(g,{direction:"horizontal"},{default:e((()=>[i("text")])),_:1})])),_:1}),n(b,{class:"uni-title uni-common-mt"},{default:e((()=>[i(" 示例 4 "),n(y,null,{default:e((()=>[i("\\n只可以纵向移动")])),_:1})])),_:1}),n(k,null,{default:e((()=>[n(g,{direction:"vertical"},{default:e((()=>[i("text")])),_:1})])),_:1}),n(b,{class:"uni-title uni-common-mt"},{default:e((()=>[i(" 示例 5 "),n(y,null,{default:e((()=>[i("\\n可超出边界")])),_:1})])),_:1}),n(k,null,{default:e((()=>[n(g,{direction:"all","out-of-bounds":""},{default:e((()=>[i("text")])),_:1})])),_:1}),n(b,{class:"uni-title uni-common-mt"},{default:e((()=>[i(" 示例 6 "),n(y,null,{default:e((()=>[i("\\n带有惯性")])),_:1})])),_:1}),n(k,null,{default:e((()=>[n(g,{direction:"all",inertia:""},{default:e((()=>[i("text")])),_:1})])),_:1}),n(b,{class:"uni-title uni-common-mt"},{default:e((()=>[i(" 示例 7 "),n(y,null,{default:e((()=>[i("\\n可放缩")])),_:1})])),_:1}),n(k,{"scale-area":""},{default:e((()=>[n(g,{direction:"all",onScale:p.onScale,scale:"","scale-min":"0.5","scale-max":"4","scale-value":h.scale},{default:e((()=>[i("text")])),_:1},8,["onScale","scale-value"])])),_:1}),n(b,{onClick:p.tap2,class:"uni-link uni-center uni-common-mt",style:{"padding-bottom":"80rpx"}},{default:e((()=>[i(" 点击这里放大3倍 ")])),_:1},8,["onClick"])])),_:1})])),_:1})}],["__scopeId","data-v-da163286"]]);export{_ as default};