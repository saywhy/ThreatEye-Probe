webpackJsonp([46],{WeM8:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("B9YN"),i=a("5Xf9"),d={name:"handle-lateral",data:function(){return{threats:"horizontalthreat"}},components:{VmHandleRisks:e.a},created:function(){this.check_passwd()},methods:{check_passwd:function(){var t=this;this.$axios.get("/yiiapi/site/check-passwd-reset").then(function(s){var a=s.data,e=a.status,d=a.msg;a.data;"602"==e&&(t.$message({message:d,type:"warning"}),i.a.$emit("reset"))})}}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"handle-lateral"},[e("vm-handle-risks",{attrs:{threats:t.threats}},[t._t("default",[e("span",[t._v("横向")])],{slot:"name"}),t._v(" "),t._t("default",[e("div",{staticClass:"outside-middle"},[e("div",{staticClass:"osm-top"},[e("img",{staticClass:"osm-img",attrs:{src:a("IaHF")}}),t._v(" "),e("span",{staticClass:"osm-title"},[t._v("威胁及安全建议")])]),t._v(" "),e("div",{staticClass:"osm-middle"},[e("dl",[e("dt",{staticClass:"osm-dt"},[t._v("威胁描述")]),t._v(" "),e("dd",{staticClass:"osm-dd"},[t._v("横向威胁是指攻击者为了了解所处的网络环境或者找到网络内的目标而实施的内网的扫描、暴力破解、漏洞利用、远程账号登录、远程程序以及命令执行等动作。")])]),t._v(" "),e("dl",[e("dt",{staticClass:"osm-dt"},[t._v("安全建议")]),t._v(" "),e("dd",{staticClass:"osm-dd"},[e("ul",[e("li",[t._v("1、及时更新补丁，特别是高危漏洞刚发布的几天是高级攻击的高发期；")]),t._v(" "),e("li",[t._v("2、部署带有静态分析、动态分析、漏洞防御、主机防火墙、主机IPS等多重防御功能的端点安全解决方案；")]),t._v(" "),e("li",[t._v("3、采用端点检测和响应解决方案（EDR）大力提升在端点上的威胁检测和响应的能力，包括合法账号的异常登录、系统自带或者管理员使用的工具的非法使用等；")]),t._v(" "),e("li",[t._v("4、部署东西向流量的网络威胁检测和响应解决方案。")])])])])])])])],2)],1)},staticRenderFns:[]};var n=a("VU/8")(d,l,!1,function(t){a("wReu")},"data-v-06f82f42",null);s.default=n.exports},wReu:function(t,s){}});