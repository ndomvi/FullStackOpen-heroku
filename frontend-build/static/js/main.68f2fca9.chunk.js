(this["webpackJsonpthe-phonebook"]=this["webpackJsonpthe-phonebook"]||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(13),u=n.n(o),c=n(14),i=n(2),l=n(3),f=n.n(l),m="/api/persons",s=function(){return f.a.get(m).then((function(e){return e.data}))},h=function(e){return f.a.post(m,e).then((function(e){return e.data}))},d=function(e){return f.a.delete("".concat(m,"/").concat(e))},b=function(e){return f.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))};function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var v=function(e){var t=e.newName,n=e.newNumber,r=e.addPerson,o=e.handleNameInputChange,u=e.handleNumberInputChange;return a.a.createElement("form",{onSubmit:r},a.a.createElement("div",null,"name: ",a.a.createElement("input",{onChange:o,value:t})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{onChange:u,value:n})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit",disabled:!(t&&n)},"add")))},O=function(e){var t=e.filterQuery,n=e.handleFilterQueryChange;return a.a.createElement("div",null,"filter names starting with: ",a.a.createElement("input",{onChange:n,value:t}))},E=function(e){var t,n=e.phonebook,r=e.filterQuery,o=e.removePerson;return a.a.createElement("ul",null,(t=n,t.filter((function(e){return e.name.toLowerCase().startsWith(r.toLowerCase())}))).map((function(e){return a.a.createElement("li",{key:e.id,style:{margin:"5px"}},e.name," ",e.number,a.a.createElement("button",{onClick:function(){return o(e.id)}},"Remove"))})))},g=function(e){var t=e.notification;return t&&t.text?a.a.createElement("div",{className:t.error?"error":"success"},t.text):null},y=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],u=Object(r.useState)(""),l=Object(i.a)(u,2),f=l[0],m=l[1],y=Object(r.useState)(""),j=Object(i.a)(y,2),w=j[0],C=j[1],P=Object(r.useState)(""),k=Object(i.a)(P,2),N=k[0],S=k[1],Q=Object(r.useState)({}),x=Object(i.a)(Q,2),D=x[0],I=x[1];Object(r.useEffect)((function(){s().then((function(e){return o(e)}))}),[]);var F=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4500;I({text:e,error:t}),setTimeout((function(){I(null)}),n)},J=function(e){b(e).then((function(t){F("".concat(t.name," was updated!")),o(n.map((function(n){return n.id!==e.id?n:t})))})).catch((function(){F("".concat(e.name," has been removed from the server"),!0),o(n.filter((function(t){return t.id!==e.id})))}))};return a.a.createElement("div",null,a.a.createElement("h1",null,"Phonebook"),a.a.createElement(g,{notification:D}),a.a.createElement("h2",null,"Add a new person!"),a.a.createElement(v,{newName:f,newNumber:w,addPerson:function(e){e.preventDefault();var t=n.find((function(e){return e.name===f}));t?window.confirm("".concat(f," is already in the phonebook!\nUpdate the number?"))&&J(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t,{number:w})):h({name:f,number:w}).then((function(e){F("".concat(e.name," was added to the phonebook!")),o(n.concat(e)),m(""),C("")}))},handleNameInputChange:function(e){return m(e.target.value)},handleNumberInputChange:function(e){return C(e.target.value)}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(O,{filterQuery:N,handleFilterQueryChange:function(e){return S(e.target.value)}}),a.a.createElement(E,{phonebook:n,filterQuery:N,removePerson:function(e){d(e).then((function(){o(n.filter((function(t){return t.id!==e})))})).catch((function(){F("Could not remove the person!",!0)}))}}))};n(37);u.a.render(a.a.createElement(y,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.68f2fca9.chunk.js.map