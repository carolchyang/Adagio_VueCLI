(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2fd72053"],{1799:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{attrs:{"aria-label":"Page navigation"}},[e("ul",{staticClass:"pagination justify-content-center"},[e("li",{staticClass:"page-item",class:{disabled:1===t.pagination.current_page}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return a.preventDefault(),t.changePage(t.pagination.current_page-1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pagination.total_pages,(function(a){return e("li",{key:a,staticClass:"page-item",class:{active:a===t.pagination.current_page}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.changePage(a)}}},[t._v(" "+t._s(a)+" ")])])})),e("li",{staticClass:"page-item",class:{disabled:t.pagination.current_page===t.pagination.total_pages}},[e("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return a.preventDefault(),t.changePage(t.pagination.current_page+1)}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])])},n=[],i=e("5530"),c=e("2f62"),o={methods:{changePage:function(t){this.$emit("get-data",t)}},computed:Object(i["a"])({},Object(c["c"])("paginationModules",["pagination"]))},r=o,l=e("2877"),d=Object(l["a"])(r,s,n,!1,null,null,null);a["a"]=d.exports},"545a":function(t,a,e){"use strict";e("8482")},8482:function(t,a,e){},b0c0:function(t,a,e){var s=e("83ab"),n=e("9bf2").f,i=Function.prototype,c=i.toString,o=/^\s*function ([^ (]*)/,r="name";s&&!(r in i)&&n(i,r,{configurable:!0,get:function(){try{return c.call(this).match(o)[1]}catch(t){return""}}})},ff55:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table"},[t._m(0),t.orders.length?e("tbody",t._l(t.orders,(function(a){return e("tr",{key:a.id,class:{"table-success":a.paid}},[e("td",[t._v(t._s(a.created.datetime))]),e("td",{staticClass:"d-none d-md-table-cell"},t._l(a.products,(function(a,s){return e("ul",{key:s,staticClass:"mb-0 list-unstyled"},[e("li",[t._v(" "+t._s(a.product.title)+" ： "+t._s(a.quantity)+" "+t._s(a.product.unit)+" ")])])})),0),e("td",{staticClass:"d-none d-lg-table-cell"},[t._v(" "+t._s(a.payment)+" ")]),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("currency")(a.amount)))]),e("td",{staticClass:"d-none d-lg-table-cell"},[e("div",{staticClass:"custom-control custom-switch"},[e("input",{directives:[{name:"model",rawName:"v-model",value:a.paid,expression:"item.paid"}],staticClass:"custom-control-input active",attrs:{type:"checkbox",id:a.id},domProps:{checked:Array.isArray(a.paid)?t._i(a.paid,null)>-1:a.paid},on:{change:[function(e){var s=a.paid,n=e.target,i=!!n.checked;if(Array.isArray(s)){var c=null,o=t._i(s,c);n.checked?o<0&&t.$set(a,"paid",s.concat([c])):o>-1&&t.$set(a,"paid",s.slice(0,o).concat(s.slice(o+1)))}else t.$set(a,"paid",i)},function(e){return e.preventDefault(),t.setOrderPaid(a)}]}}),e("label",{staticClass:"custom-control-label",attrs:{for:a.id}}),a.paid?e("span",{staticClass:"text-success"},[t._v("已付款")]):e("span",{staticClass:"text-muted"},[t._v("未付款")])])])])})),0):t._e()])]),e("Pagination",{on:{"get-data":t.getOrders}})],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("下單時間")]),e("th",{staticClass:"d-none d-md-table-cell",attrs:{scope:"col"}},[t._v("購買款項")]),e("th",{staticClass:"d-none d-lg-table-cell",attrs:{scope:"col"}},[t._v(" 付款方式 ")]),e("th",{attrs:{scope:"col"}},[t._v("應付金額")]),e("th",{staticClass:"d-none d-lg-table-cell",attrs:{scope:"col"}},[t._v("付款狀態")])])])}],i=(e("99af"),e("b0c0"),e("1799")),c={name:"OrdersManage",data:function(){return{pagination:{},orders:{}}},methods:{getOrders:function(){var t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this,s="".concat("https://course-ec-api.hexschool.io/api","/").concat("7e04c7a2-2bef-47b1-8b3a-5ab4c09e67b3","/admin/ec/orders?page=").concat(a);e.$store.dispatch("updateLoading",!0,{root:!0}),e.$http.get(s).then((function(a){e.orders=a.data.data,e.$store.dispatch("paginationModules/getPagination",{routerName:t.$route.name,data:a.data}),e.$store.dispatch("updateLoading",!1,{root:!0})}))},setOrderPaid:function(t){var a=this,e="".concat("https://course-ec-api.hexschool.io/api","/").concat("7e04c7a2-2bef-47b1-8b3a-5ab4c09e67b3","/admin/ec/orders/").concat(t.id,"/paid");t.paid||(e="".concat("https://course-ec-api.hexschool.io/api","/").concat("7e04c7a2-2bef-47b1-8b3a-5ab4c09e67b3","/admin/ec/orders/").concat(t.id,"/unpaid")),a.$store.dispatch("updateLoading",!0,{root:!0}),a.$http.patch(e,t.id).then((function(){a.$store.dispatch("updateLoading",!1,{root:!0}),a.getOrders();var t={icon:"success",title:"更新成功"};a.$store.dispatch("alertMessageModules/openToast",t)})).catch((function(){a.$store.dispatch("updateLoading",!1,{root:!0});var t={icon:"error",title:"更新失敗"};a.$store.dispatch("alertMessageModules/openToast",t)}))}},components:{Pagination:i["a"]},created:function(){this.getOrders()}},o=c,r=(e("545a"),e("2877")),l=Object(r["a"])(o,s,n,!1,null,"526a64e2",null);a["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2fd72053.7a3456f6.js.map