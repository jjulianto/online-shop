"use strict";(self["webpackChunkfrontend_shop"]=self["webpackChunkfrontend_shop"]||[]).push([[65],{45:function(t,s,e){e.r(s),e.d(s,{default:function(){return j}});var r=e(3396),o=e(7139),a=e(5878);const d={class:"container-fluid mb-5 mt-4"},l={key:0,class:"row gy-2"},c={class:"card border-0 shadow rounded-md"},i={class:"card-img"},n={class:"w-100",style:{height:"15em","object-fit":"cover","border-top-left-radius":".25rem","border-top-right-radius":".25rem"}},u={class:"card-body text-center"},g={class:"card-title",style:{"font-weight":"bold"}},m={key:0,class:"discount mt-2 text-danger"},p=(0,r.Uk)(),b={style:{"background-color":"darkorange"},class:"badge badge-pill badge-success text-white"},w={class:"price fw-bold mt-3",style:{color:"#47b04b","font-size":"20px"}},y=(0,r._)("hr",{style:{"border-top":"1px solid rgb(0 0 0)","border-radius":".5rem"}},null,-1),f=(0,r.Uk)("Lihat Produk"),k={key:1,class:"row gy-2"},h={class:"mt-4 text-center"},_=(0,r._)("img",{src:a,style:{width:"250px"}},null,-1),v=(0,r._)("p",{class:"fs-4 mt-3 fw-bold"},"Produk tidak ditemukan di dalam kategori ini",-1),x=(0,r._)("i",{class:"fa fa-long-arrow-alt-left"},null,-1),D=(0,r.Uk)(" Beranda");function z(t,s,e,a,z,C){const F=(0,r.up)("router-link"),P=(0,r.Q2)("lazy");return(0,r.wg)(),(0,r.iD)("div",d,[a.products.length>=1?((0,r.wg)(),(0,r.iD)("div",l,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.products,(s=>((0,r.wg)(),(0,r.iD)("div",{key:s.id,class:"col-md-4 col-lg-3 col-12 mb-3"},[(0,r._)("div",c,[(0,r._)("div",i,[(0,r.wy)((0,r._)("img",n,null,512),[[P,{src:s.image}]])]),(0,r._)("div",u,[(0,r._)("p",g,(0,o.zw)(s.title),1),s.discount>=1?((0,r.wg)(),(0,r.iD)("div",m,[(0,r._)("s",null,"Rp. "+(0,o.zw)(t.moneyFormat(s.price)),1),p,(0,r._)("span",b,"Diskon "+(0,o.zw)(s.discount)+" %",1)])):(0,r.kq)("",!0),(0,r._)("div",w," Rp. "+(0,o.zw)(t.moneyFormat(t.calculateDiscount(s))),1),y,(0,r.Wm)(F,{to:{name:"detail_product",params:{slug:s.slug}},class:"btn btn-primary btn-md w-100 shadow-md"},{default:(0,r.w5)((()=>[f])),_:2},1032,["to"])])])])))),128))])):((0,r.wg)(),(0,r.iD)("div",k,[(0,r._)("div",h,[_,v,(0,r.Wm)(F,{to:{name:"home"},class:"btn btn-primary btn-lg shadow-md"},{default:(0,r.w5)((()=>[x,D])),_:1})])]))])}var C=e(65),F=e(678),P={setup(){const t=(0,C.oR)(),s=(0,F.yj)();(0,r.bv)((()=>{t.dispatch("category/getProductInCategory",s.params.slug)}));const e=(0,r.Fl)((()=>t.state.category.productInCategory));return{store:t,route:s,products:e}}},R=e(89);const U=(0,R.Z)(P,[["render",z]]);var j=U},5878:function(t,s,e){t.exports=e.p+"img/empty-products.fbb49912.svg"}}]);
//# sourceMappingURL=detail_category.278147f9.js.map