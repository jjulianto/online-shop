"use strict";(self["webpackChunkfrontend_shop"]=self["webpackChunkfrontend_shop"]||[]).push([[125],{7800:function(t,e,r){r.d(e,{Z:function(){return v}});var l=r(3396);const n={class:"card border-0 rounded shadow"},a={class:"card-body"},d=(0,l._)("h5",{class:"fw-bold"},"Main Menu",-1),s=(0,l._)("hr",null,null,-1),o={class:"list-group"},u=(0,l._)("i",{class:"fas fa-tachometer-alt"},null,-1),i=(0,l.Uk)(" Dashboard"),c=(0,l._)("i",{class:"fas fa-shopping-cart"},null,-1),_=(0,l.Uk)(" My Order"),p=(0,l._)("i",{class:"fas fa-sign-out-alt"},null,-1),m=(0,l.Uk)(" Logout"),b=[p,m];function w(t,e,r,p,m,w){const g=(0,l.up)("router-link");return(0,l.wg)(),(0,l.iD)("div",n,[(0,l._)("div",a,[d,s,(0,l._)("ul",o,[(0,l.Wm)(g,{to:{name:"dashboard"},class:"list-group-item text-decoration-none text-dark"},{default:(0,l.w5)((()=>[u,i])),_:1}),(0,l.Wm)(g,{to:{name:"order"},class:"list-group-item text-decoration-none text-dark"},{default:(0,l.w5)((()=>[c,_])),_:1}),(0,l._)("a",{onClick:e[0]||(e[0]=(...t)=>p.logout&&p.logout(...t)),style:{cursor:"pointer"},class:"list-group-item text-decoration-none text-dark"},b)])])])}var g=r(65),h=r(678),f={name:"CustomerMenu",setup(){const t=(0,g.oR)(),e=(0,h.tv)(),r=()=>{t.dispatch("auth/logout").then((()=>{e.push({name:"login"})}))};return{store:t,router:e,logout:r}}},y=r(89);const k=(0,y.Z)(f,[["render",w]]);var v=k},512:function(t,e,r){r.r(e),r.d(e,{default:function(){return $}});var l=r(3396),n=r(7139);const a={class:"container-fluid mb-5 mt-4"},d={class:"row"},s={class:"col-md-3 mb-4"},o={class:"col-md-9 mb-4"},u={class:"card border-0 rounded shadow"},i={class:"card-body"},c=(0,l._)("h5",{class:"fw-bold"},[(0,l._)("i",{class:"fas fa-file"}),(0,l.Uk)(" Detail Invoice")],-1),_=(0,l._)("hr",null,null,-1),p={class:"table table-bordered"},m=(0,l._)("td",{style:{width:"25%"}}," No. Invoice ",-1),b=(0,l._)("td",{style:{width:"1%"}},":",-1),w=(0,l._)("td",null," Nama Lengkap ",-1),g=(0,l._)("td",null,":",-1),h=(0,l._)("td",null," No. Telp / WA ",-1),f=(0,l._)("td",null,":",-1),y=(0,l._)("td",null," Kurir / Service / Cost ",-1),k=(0,l._)("td",null,":",-1),v=(0,l._)("td",null," Alamat Lengkap ",-1),O=(0,l._)("td",null,":",-1),z=(0,l._)("td",null," Total Pembelian ",-1),D=(0,l._)("td",null,":",-1),x=(0,l._)("td",null," Status ",-1),C=(0,l._)("td",null,":",-1),M={key:1,class:"btn btn-success"},F={key:2,class:"btn btn-warning"},I={key:3,class:"btn btn-danger"},R={class:"card border-0 rounded shadow mt-4"},U={class:"card-body"},S=(0,l._)("h5",null,[(0,l._)("i",{class:"fa fa-shopping-cart"}),(0,l.Uk)(" Detail Order")],-1),W=(0,l._)("hr",{style:{"border-top":"3px solid rgb(154 155 156)","border-radius":".5rem"}},null,-1),Z={class:"table"},L={class:"b-none",width:"25%"},N={class:"wrapper-image-cart"},q=["src"],A={class:"b-none",width:"50%"},K={class:"table-borderless",style:{"font-size":"14px"}},P=(0,l._)("td",{style:{padding:".20rem"}},"Qty",-1),T=(0,l._)("td",{style:{padding:".20rem"}},":",-1),j={style:{padding:".20rem"}},B={class:"b-none text-right"},E={class:"m-0 fw-bold"};function H(t,e,r,H,Q,Y){const G=(0,l.up)("CustomerMenu");return(0,l.wg)(),(0,l.iD)("div",a,[(0,l._)("div",d,[(0,l._)("div",s,[(0,l.Wm)(G)]),(0,l._)("div",o,[(0,l._)("div",u,[(0,l._)("div",i,[c,_,(0,l._)("table",p,[(0,l._)("tbody",null,[(0,l._)("tr",null,[m,b,(0,l._)("td",null,(0,n.zw)(H.detailOrder.invoice),1)]),(0,l._)("tr",null,[w,g,(0,l._)("td",null,(0,n.zw)(H.detailOrder.name),1)]),(0,l._)("tr",null,[h,f,(0,l._)("td",null,(0,n.zw)(H.detailOrder.phone),1)]),(0,l._)("tr",null,[y,k,(0,l._)("td",null,(0,n.zw)(H.detailOrder.courier)+" / "+(0,n.zw)(H.detailOrder.service)+" / Rp. "+(0,n.zw)(t.moneyFormat(H.detailOrder.cost_courier)),1)]),(0,l._)("tr",null,[v,O,(0,l._)("td",null,(0,n.zw)(H.detailOrder.address),1)]),(0,l._)("tr",null,[z,D,(0,l._)("td",null," Rp. "+(0,n.zw)(t.moneyFormat(H.detailOrder.grand_total)),1)]),(0,l._)("tr",null,[x,C,(0,l._)("td",null,["pending"==H.detailOrder.status?((0,l.wg)(),(0,l.iD)("button",{key:0,onClick:e[0]||(e[0]=t=>H.payment(H.detailOrder.snap_token)),class:"btn btn-primary"},"Bayar Sekarang")):"success"==H.detailOrder.status?((0,l.wg)(),(0,l.iD)("button",M,(0,n.zw)(H.detailOrder.status),1)):"expired"==H.detailOrder.status?((0,l.wg)(),(0,l.iD)("button",F,(0,n.zw)(H.detailOrder.status),1)):"failed"==H.detailOrder.status?((0,l.wg)(),(0,l.iD)("button",I,(0,n.zw)(H.detailOrder.status),1)):(0,l.kq)("",!0)])])])])])]),(0,l._)("div",R,[(0,l._)("div",U,[S,W,(0,l._)("table",Z,[(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(H.productInOrder,(e=>((0,l.wg)(),(0,l.iD)("tr",{key:e.id},[(0,l._)("td",L,[(0,l._)("div",N,[(0,l._)("img",{src:e.image,style:{width:"100%","border-radius":".5rem"}},null,8,q)])]),(0,l._)("td",A,[(0,l._)("h5",null,[(0,l._)("b",null,(0,n.zw)(e.product_name),1)]),(0,l._)("table",K,[(0,l._)("tr",null,[P,T,(0,l._)("td",j,[(0,l._)("b",null,(0,n.zw)(e.qty),1)])])])]),(0,l._)("td",B,[(0,l._)("p",E,"Rp. "+(0,n.zw)(t.moneyFormat(e.price)),1)])])))),128))])])])])])])])}var Q=r(7800),Y=r(65),G=r(678),J={components:{CustomerMenu:Q.Z},setup(){const t=(0,Y.oR)(),e=(0,G.yj)(),r=(0,G.tv)();(0,l.bv)((()=>{t.dispatch("order/detailOrder",e.params.snap_token)}));const n=(0,l.Fl)((()=>t.getters["order/detailOrder"])),a=(0,l.Fl)((()=>t.getters["order/productInOrder"])),d=t=>{window.snap.pay(t,{onSuccess:function(){r.push({name:"detail_order",params:{snap_token:t}})},onPending:function(){r.push({name:"detail_order",params:{snap_token:t}})},onError:function(){r.push({name:"detail_order",params:{snap_token:t}})}})};return{store:t,route:e,router:r,detailOrder:n,productInOrder:a,payment:d}}},V=r(89);const X=(0,V.Z)(J,[["render",H]]);var $=X}}]);
//# sourceMappingURL=detail_order.5bc5fc20.js.map