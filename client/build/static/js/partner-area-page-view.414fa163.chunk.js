(this["webpackJsonpnode-server"]=this["webpackJsonpnode-server"]||[]).push([[9],{199:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n(0);var a=n(213),c=n.n(a),r=(n(214),n(202),n(1));var s=function(e){var t=e.value,n=e.onChange,a=e.name,s=e.disabled;return Object(r.jsx)(c.a,{inputClass:"custom-phone-input",buttonClass:"custom-phone-dropdown",placeholder:"+1201 XXX - XX - XX ",name:a,country:"us",value:t,onChange:n,disabled:s,inputProps:{name:"phone",required:!0,autoFocus:!0}})}},202:function(e,t,n){},277:function(e,t,n){e.exports={label:"AddSubPartner_label__3YrAT",addLicenseButton:"AddSubPartner_addLicenseButton__1kVFU"}},278:function(e,t,n){e.exports={label:"AddLicense_label__12FPw",addLicenseButton:"AddLicense_addLicenseButton__mmUZI",appBox:"AddLicense_appBox__10KFy"}},279:function(e,t,n){e.exports={centrallBlock:"CentrallPartnersBlock_centrallBlock__1RYxW",totalLicense:"CentrallPartnersBlock_totalLicense__i7gQv",totalPartners:"CentrallPartnersBlock_totalPartners__krpYL",partnerCounter:"CentrallPartnersBlock_partnerCounter__2NOeo",partnerCounterNumber:"CentrallPartnersBlock_partnerCounterNumber__12czu"}},317:function(e,t,n){e.exports={button:"ButtonActions_button__3Cp1u",icon:"ButtonActions_icon__2r-80"}},319:function(e,t,n){e.exports={actionBlock:"RightPartnerBlock_actionBlock__3pw5Q",topActionsBlock:"RightPartnerBlock_topActionsBlock__1_XVR"}},327:function(e,t,n){e.exports={controlsBlock:"PartnerArea_controlsBlock__2AXeo"}},411:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return ce}));var a=n(0),c=n(10),r=n(23),s=n(212),i=n(262),l=n(16),o=n(72),u=n(74),j=n(59),d=n(199),b=n(35),O=n(195),h=n(277),p=n.n(h),C=n(1);var x=function(e){var t=e.onCloseClick,n=Object(a.useState)(""),r=Object(l.a)(n,2),s=r[0],i=r[1],o=Object(a.useState)(""),h=Object(l.a)(o,2),x=h[0],m=h[1],v=Object(a.useState)(""),f=Object(l.a)(v,2),A=f[0],L=f[1],k=Object(a.useState)(1),g=Object(l.a)(k,2),_=g[0],w=g[1],S=function(e){var t=e.target;switch(t.name){case"name":i(t.value);break;case"email":m(t.value);break;case"licenses":w(t.value)}},N=Object(c.b)();return Object(C.jsx)(u.a,{size:"medium",title:"Add Sub-partner",onCloseClick:t,children:Object(C.jsxs)("form",{onSubmit:function(e){e.preventDefault(),N(O.a.addSubPartner({name:s,email:x,phone:A,licenses:_})),t()},children:[Object(C.jsx)("p",{className:p.a.label,children:"Name"}),Object(C.jsx)(j.a,{width:"100%",placeholder:"Enter name",name:"name",onChange:S,value:s,min:"5",required:!0}),Object(C.jsx)("p",{className:p.a.label,children:"Email"}),Object(C.jsx)(j.a,{type:"email",width:"100%",placeholder:"Enter email",name:"email",onChange:S,value:x,required:!0}),Object(C.jsx)("p",{className:p.a.label,children:"Full phone number"}),Object(C.jsx)(d.a,{value:A,onChange:function(e){return L(e)}}),Object(C.jsx)("p",{className:p.a.label,children:"Licenses"}),Object(C.jsx)(j.a,{type:"number",min:"1",step:"1",width:"100%",placeholder:"Licenses",name:"licenses",onChange:S,value:_,required:!0}),Object(C.jsx)("div",{className:p.a.addLicenseButton,children:Object(C.jsx)(b.a,{type:"submit",bgColor:"darkBlue",width:"100%",children:"Add sub-partner"})})]})})},m=n(33),v=n(410),f=n(413),A=n(422),L=n(271),k=n(26),g=Object(L.a)((function(){return{formControl:{minWidth:"100%","& *":{color:k.a.darkBlue}},root:{fontSize:"16px","& > *:first-child":{padding:"10px 32px 10px 10px"}}}}));var _=function(e){var t=e.arrValues,n=e.value,a=e.onChange,c=e.name,r=g();return Object(C.jsx)(C.Fragment,{children:Array.isArray(t)&&Object(C.jsx)(v.a,{className:r.formControl,variant:"outlined",children:Object(C.jsx)(f.a,{className:r.root,name:c,id:"select_".concat(c),value:n,onChange:a,children:t.map((function(e){return Object(C.jsx)(A.a,{value:e,children:e},e)}))})})})},w=n(278),S=n.n(w),N=n(71);var B=function(e){var t,n=e.onCloseClick,r=Object(c.c)(N.a.allApps),s=Object(c.c)(N.a.licensesPlans),i=Object(a.useState)(""),o=Object(l.a)(i,2),h=o[0],p=o[1],x=Object(a.useState)(""),v=Object(l.a)(x,2),f=v[0],A=v[1],L=Object(a.useState)(""),k=Object(l.a)(L,2),g=k[0],w=k[1],B=Object(a.useState)([]),P=Object(l.a)(B,2),E=P[0],V=P[1],H=Object(a.useState)(null===(t=r[0])||void 0===t?void 0:t.Name),D=Object(l.a)(H,2),R=D[0],y=D[1],F=Object(a.useState)(""),X=Object(l.a)(F,2),I=X[0],Z=X[1];Object(a.useEffect)((function(){var e,t=r.find((function(e){return e.Name===R})).Id,n=null===(e=s[t])||void 0===e?void 0:e.map((function(e){return e.name}));n?(V(n),Z(n[0])):V([])}),[R,s,r]);var M=function(e){var t=e.target;switch(t.name){case"name":p(t.value);break;case"email":A(t.value);break;case"app":y(t.value);break;case"plan":Z(t.value)}},q=Object(c.b)();return Object(C.jsx)(u.a,{size:"medium",title:"Add License",onCloseClick:n,children:Object(C.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=r.find((function(e){return e.Name===R})).Id,a=s[t].find((function(e){return e.name===I})).id;q(O.a.addLicense({name:h,email:f,phone:g,appId:t,planId:a,appName:R})),n()},children:[Object(C.jsx)("p",{className:S.a.label,children:"Name"}),Object(C.jsx)(j.a,{width:"100%",placeholder:"Enter name",name:"name",onChange:M,value:h,min:"5",required:!0}),Object(C.jsx)("p",{className:S.a.label,children:"Email"}),Object(C.jsx)(j.a,{type:"email",width:"100%",placeholder:"Enter email",name:"email",onChange:M,value:f,min:"6",required:!0}),Object(C.jsx)("p",{className:S.a.label,children:"Full phone number"}),Object(C.jsx)(d.a,{value:g,onChange:function(e){return w(e)}}),Object(C.jsxs)("div",{className:S.a.appBox,children:[Object(C.jsx)("p",{className:S.a.label,children:"Choose app"}),Object(C.jsx)(_,{name:"app",value:R,onChange:M,arrValues:Object(m.a)(r.map((function(e){return e.Name})))})]}),Object(C.jsxs)("div",{className:S.a.planBox,children:[Object(C.jsx)("p",{className:S.a.label,children:"Choose plan"}),Object(C.jsx)(_,{name:"plan",value:I,onChange:M,arrValues:E})]}),Object(C.jsx)("div",{className:S.a.addLicenseButton,children:Object(C.jsx)(b.a,{type:"submit",bgColor:"darkBlue",width:"100%",children:"Add license"})})]})})},P=n(279),E=n.n(P),V=n(13);var H=function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],s=t[1],i=Object(a.useState)(""),u=Object(l.a)(i,2),j=u[0],d=u[1],O=Object(c.c)(N.a.total),h=Object(c.c)(N.a.isLoading),p=Object(r.h)(V.a.partnerAreaLicenses),m=Object(r.h)(V.a.partnerAreaSubPartners);return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)(o.a,{show:n,onHide:function(){return s(!1)},children:["addLicense"===j&&Object(C.jsx)(B,{onCloseClick:function(){return s(!1)}}),"addSubPartner"===j&&Object(C.jsx)(x,{onCloseClick:function(){return s(!1)}})]}),Object(C.jsxs)("div",{className:E.a.centrallBlock,children:[p&&Object(C.jsxs)("div",{className:E.a.totalLicense,children:[!h&&Object(C.jsxs)("div",{className:E.a.partnerCounter,children:[Object(C.jsx)("span",{className:E.a.partnerCounterNumber,children:O}),"Total License"]}),Object(C.jsx)(b.a,{onClick:function(){d("addLicense"),s(!0)},bgColor:"transparent",color:"#004AAD",width:"185px",children:"Add License"})]}),m&&Object(C.jsxs)("div",{className:E.a.totalPartners,children:[!h&&Object(C.jsxs)("div",{className:E.a.partnerCounter,children:[Object(C.jsx)("span",{className:E.a.partnerCounterNumber,children:O}),"Total partners"]}),Object(C.jsx)(b.a,{onClick:function(){d("addSubPartner"),s(!0)},bgColor:"transparent",color:"#004AAD",width:"185px",children:"Add Sub-partner"})]})]})]})},D=n(261),R=n(317),y=n.n(R);var F=function(e){var t=e.onClick,n=e.icon,a=e.children;return Object(C.jsxs)("button",{className:y.a.button,onClick:t,children:[Object(C.jsx)("span",{className:y.a.icon,children:n}),a]})},X=n(263);function I(){return Object(C.jsx)("svg",{width:"11",height:"12",viewBox:"0 0 11 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(C.jsx)("path",{d:"M9.7776 4.94805C9.96574 5.05164 10.1226 5.20383 10.2319 5.38873C10.3412 5.57363 10.3988 5.78447 10.3988 5.99925C10.3988 6.21403 10.3412 6.42487 10.2319 6.60977C10.1226 6.79467 9.96574 6.94686 9.7776 7.05045L1.7776 11.4489C1.59486 11.5492 1.38913 11.6002 1.18068 11.5968C0.97223 11.5935 0.768249 11.5359 0.588836 11.4297C0.409422 11.3235 0.260766 11.1724 0.157513 10.9913C0.0542604 10.8102 -2.68916e-05 10.6053 9.99328e-09 10.3969V1.60165C3.57111e-05 1.39313 0.0544088 1.18821 0.15776 1.0071C0.261112 0.825987 0.409874 0.674934 0.589384 0.568827C0.768894 0.46272 0.972956 0.405221 1.18146 0.401999C1.38996 0.398776 1.5957 0.449941 1.7784 0.55045L9.7784 4.94805H9.7776Z",fill:"#004aad"})})}function Z(){return Object(C.jsxs)("svg",{width:"12",height:"14",viewBox:"0 0 12 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(C.jsx)("path",{d:"M7.59985 1.8001C7.59985 1.48184 7.72628 1.17661 7.95133 0.95157C8.17637 0.726526 8.48159 0.600098 8.79985 0.600098H10.3999C10.7181 0.600098 11.0233 0.726526 11.2484 0.95157C11.4734 1.17661 11.5999 1.48184 11.5999 1.8001V12.2001C11.5999 12.5184 11.4734 12.8236 11.2484 13.0486C11.0233 13.2737 10.7181 13.4001 10.3999 13.4001H8.79985C8.48159 13.4001 8.17637 13.2737 7.95133 13.0486C7.72628 12.8236 7.59985 12.5184 7.59985 12.2001V1.8001Z",fill:"#004aad"}),Object(C.jsx)("path",{d:"M0.399902 1.8001C0.399902 1.48184 0.526331 1.17661 0.751374 0.95157C0.976418 0.726526 1.28164 0.600098 1.5999 0.600098H3.1999C3.51816 0.600098 3.82339 0.726526 4.04843 0.95157C4.27347 1.17661 4.3999 1.48184 4.3999 1.8001V12.2001C4.3999 12.5184 4.27347 12.8236 4.04843 13.0486C3.82339 13.2737 3.51816 13.4001 3.1999 13.4001H1.5999C1.28164 13.4001 0.976418 13.2737 0.751374 13.0486C0.526331 12.8236 0.399902 12.5184 0.399902 12.2001V1.8001Z",fill:"#004aad"})]})}function M(){return Object(C.jsx)("svg",{width:"16",height:"18",viewBox:"0 0 16 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(C.jsx)("path",{d:"M8 0.375C8.80891 0.37497 9.58632 0.688608 10.1687 1.24996C10.7512 1.81131 11.0932 2.57664 11.123 3.385L11.125 3.5005L14.5 3.5C14.7258 3.5001 14.9427 3.58746 15.1056 3.74381C15.2684 3.90016 15.3646 4.1134 15.3739 4.33897C15.3832 4.56454 15.3049 4.78497 15.1555 4.95419C15.006 5.12341 14.797 5.22832 14.572 5.247L14.5 5.25H13.9165L13.103 16.035C13.0627 16.5694 12.8219 17.0688 12.4289 17.4332C12.036 17.7975 11.5199 18 10.984 18H5.016C4.48011 18 3.964 17.7975 3.57105 17.4332C3.17811 17.0688 2.93735 16.5694 2.897 16.035L2.083 5.25H1.5C1.28033 5.24998 1.06869 5.16734 0.907146 5.01848C0.745597 4.86962 0.64595 4.66544 0.628 4.4465L0.625 4.375C0.625019 4.15533 0.707666 3.94369 0.856524 3.78215C1.00538 3.6206 1.20956 3.52095 1.4285 3.503L1.5 3.5H4.875C4.875 1.851 6.1525 0.5 7.772 0.383L7.8855 0.377L8 0.375ZM9.875 6.875C9.72027 6.87493 9.57102 6.93226 9.45612 7.03589C9.34122 7.13952 9.26884 7.28208 9.253 7.436L9.25 7.5V13.5L9.253 13.564C9.26819 13.7184 9.34027 13.8617 9.45524 13.9659C9.57021 14.0701 9.71983 14.1278 9.875 14.1278C10.0302 14.1278 10.1798 14.0701 10.2948 13.9659C10.4097 13.8617 10.4818 13.7184 10.497 13.564L10.5 13.5V7.5L10.497 7.436C10.4812 7.28208 10.4088 7.13952 10.2939 7.03589C10.179 6.93226 10.0297 6.87493 9.875 6.875ZM6.125 6.875C5.97027 6.87493 5.82102 6.93226 5.70612 7.03589C5.59122 7.13952 5.51884 7.28208 5.503 7.436L5.5 7.5V13.5L5.503 13.564C5.51819 13.7184 5.59027 13.8617 5.70524 13.9659C5.82021 14.0701 5.96983 14.1278 6.125 14.1278C6.28017 14.1278 6.42979 14.0701 6.54476 13.9659C6.65973 13.8617 6.73181 13.7184 6.747 13.564L6.75 13.5V7.5L6.747 7.436C6.73116 7.28208 6.65878 7.13952 6.54388 7.03589C6.42898 6.93226 6.27973 6.87493 6.125 6.875ZM8.084 2.1275L8 2.125C7.64986 2.12498 7.3129 2.25855 7.05785 2.49845C6.80281 2.73835 6.64889 3.06651 6.6275 3.416L6.625 3.5005L9.375 3.5C9.37502 3.14986 9.24145 2.8129 9.00155 2.55785C8.76165 2.30281 8.43349 2.14889 8.084 2.1275Z",fill:"#004aad"})})}var q=n(319),T=n.n(q);var z=function(){var e=Object(c.b)(),t=Object(a.useState)(!1),n=Object(l.a)(t,2),s=n[0],i=n[1],u=Object(a.useState)(!1),j=Object(l.a)(u,2),d=j[0],b=j[1],h=Object(a.useState)(!1),p=Object(l.a)(h,2),x=p[0],m=p[1],v=Object(c.c)(N.a.isSelectedAnyRows),f=Object(c.c)(N.a.isAllSelectedRowsActive),A=Object(c.c)(N.a.isAllSelectedRowsInactive),L=Object(c.c)(N.a.checkedData),k=Object(r.h)(V.a.partnerAreaLicenses),g=Object(r.h)(V.a.partnerAreaSubPartners);return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)("div",{className:T.a.actionBlock,children:[Object(C.jsxs)("div",{className:T.a.topActionsBlock,children:[A&&v&&Object(C.jsx)(F,{onClick:function(){return i(!0)},icon:Object(C.jsx)(I,{}),children:L.length>1?"Activate selected":"Activate"}),f&&v&&Object(C.jsx)(F,{onClick:function(){return b(!0)},icon:Object(C.jsx)(Z,{}),children:L.length>1?"Deactivate selected":"Deactivate"}),v&&Object(C.jsx)(F,{onClick:function(){return m(!0)},icon:Object(C.jsx)(M,{}),children:L.length>1?"Delete all":"Delete"})]}),Object(C.jsx)(D.a,{})]}),Object(C.jsx)(o.a,{show:s,onHide:function(){return i(!1)},children:Object(C.jsx)(X.a,{id:L,title:"Activate",color:"darkBlue",onConfirm:function(){i(!1),(null===k||void 0===k?void 0:k.isExact)&&e(O.a.changeLicensesStatus({status:"Active",checkedRows:L})),(null===g||void 0===g?void 0:g.isExact)&&e(O.a.changeSubPartnrsStatus({status:"Active",checkedRows:L}))},onCancel:function(){return i(!1)}})}),Object(C.jsx)(o.a,{show:d,onHide:function(){return b(!1)},children:Object(C.jsx)(X.a,{id:L,title:"Deactivate",color:"black",onConfirm:function(){b(!1),(null===k||void 0===k?void 0:k.isExact)&&e(O.a.changeLicensesStatus({status:"Inactive",checkedRows:L})),(null===g||void 0===g?void 0:g.isExact)&&e(O.a.changeSubPartnrsStatus({status:"Inactive",checkedRows:L}))},onCancel:function(){return b(!1)}})}),Object(C.jsx)(o.a,{show:x,onHide:function(){return m(!1)},children:Object(C.jsx)(X.a,{id:L,title:"Delete",color:"red",onConfirm:function(){m(!1),(null===k||void 0===k?void 0:k.isExact)&&e(O.a.deleteLicenses(L)),(null===g||void 0===g?void 0:g.isExact)&&e(O.a.deleteSubPartners(L))},onCancel:function(){return m(!1)}})})]})},Y=n(259),J=n(8),Q=n(61),U=n(14),W=n(232);function K(e){var t=e.component,n=e.redirectTo,a=Object(Q.a)(e,["component","redirectTo"]),s=Object(c.c)(U.a.isAuthenticated),i=Object(c.c)(U.a.plan).trim()===W.a.partner.trim();return Object(C.jsx)(r.b,Object(J.a)(Object(J.a)({},a),{},{render:function(e){return s&&i?Object(C.jsx)(t,Object(J.a)({},e)):Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(r.a,{to:n})})}}))}var G=n(327),$=n.n(G),ee=n(48),te=n(6),ne=n(219),ae=n(246);var ce=function(){var e=Object(c.b)(),t=function(t){e(Object(ee.f)(t)),e(Object(ee.c)(1)),e(Object(te.A)(Date.now()))};return Object(C.jsxs)(s.a,{children:[Object(C.jsxs)("div",{className:$.a.controlsBlock,children:[Object(C.jsx)(i.a,{title:"Partner Area"}),Object(C.jsx)(H,{}),Object(C.jsx)(z,{})]}),Object(C.jsxs)(r.d,{children:[Object(C.jsx)(r.b,{path:V.a.partnerAreaExtensions,render:function(){return t(ae.a.partnerAreaExtensions),Object(C.jsx)(Y.a,{titles:ne.a.partnerAreaExtensions})}}),Object(C.jsx)(r.b,{path:V.a.partnerAreaLicenses,render:function(){return t(ae.a.partnerAreaLicenses),Object(C.jsx)(Y.a,{titles:ne.a.partnerAreaLicenses})}}),Object(C.jsx)(K,{redirectTo:V.a.partnerAreaExtensions,path:V.a.partnerAreaSubPartners,component:function(){return t(ae.a.partnerAreaSubPartners),Object(C.jsx)(Y.a,{titles:ne.a.partnerAreaSubPartners})}}),Object(C.jsx)(r.a,{to:V.a.partnerAreaExtensions})]})]})}}}]);
//# sourceMappingURL=partner-area-page-view.414fa163.chunk.js.map