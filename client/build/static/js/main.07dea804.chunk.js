(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],[,,,,,,,,function(e,n,t){e.exports=t(18)},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(7),s=t.n(c),r=(t(13),t(14),t(2));t(15);var i=function(e){var n=e.author,t=e.message;return o.a.createElement("div",{className:"MessageItem"},o.a.createElement("div",{className:"MessageItem__author"},"".concat(n,":")||!1),o.a.createElement("div",{className:"MessageItem__message"},t||""))};t(16);var u=function(e){var n=e.list;return console.log("LIST",n),console.log(JSON.stringify(n)),o.a.createElement("div",{className:"MessageList"},Object.values(n).map((function(e){return console.log("ttt",e),o.a.createElement(i,{key:e._id,author:e.author,message:e.message})})))};var l=function(e){e.isOpenConnection;var n=e.send,t=Object(a.useState)(""),c=Object(r.a)(t,2),s=c[0],i=c[1];return o.a.createElement("div",null,o.a.createElement("input",{value:s,onChange:function(e){return i(e.target.value)},placeholder:"print message"}),o.a.createElement("button",{onClick:function(){n(s),i("")}},"Send"))},f=t(5),m=t(1),O="Disconnected",g="Connecting...",v="Connection error! Reconnecting is in progress...",b="Connected!",h="Connection broken! Reconnecting is in progress...";var p=function(e){var n=Object(a.useState)(),t=Object(r.a)(n,2),o=t[0],c=t[1],s=Object(a.useState)({open:function(){},send:function(e){},close:function(){},setAuthor:function(e){}}),i=Object(r.a)(s,2),u=i[0],l=i[1],p=Object(a.useState)({isOpenConnection:!1,author:"",status:O,messages:new Array}),d=Object(r.a)(p,2),j=d[0],E=d[1];Object(a.useEffect)((function(){l({setAuthor:function(e){return E(Object(m.a)(Object(m.a)({},j),{},{author:e}))},open:function(){E(Object(m.a)(Object(m.a)({},j),{},{isOpenConnection:!0,author:j.author})),C(j.author)},send:function(e){o.send(JSON.stringify({oper:"new_message",message:e}))},close:function(){E(Object(m.a)(Object(m.a)({},j),{},{isOpenConnection:!1})),o.close()}})}),[j]);var C=function(n){E(Object(m.a)(Object(m.a)({},j),{},{status:b,isOpenConnection:!0}));var t=new WebSocket(e);t.onopen=function(){return t.send(JSON.stringify({oper:"set_name",value:j.author}))},c(t)};Object(a.useEffect)((function(){o&&(o.onmessage=function(e){var n=JSON.parse(e.data);if(Array.isArray(n.value)){E(Object(m.a)(Object(m.a)({},j),{},{messages:function(e){var n={};return e.forEach((function(e){return n[e._id]=e})),Object.values(n)}([].concat(Object(f.a)(j.messages),Object(f.a)(n.value))).sort((function(e,n){return new Date(e.time).getTime()-new Date(n.time).getTime()}))}))}else E(Object(m.a)(Object(m.a)({},j),{},{messages:[].concat(Object(f.a)(j.messages),[n.value])}));o.onopen=function(){w(b),o.send(JSON.stringify({oper:"set_name",value:j.author}))},o.onclose=function(){return w(h)},o.onerror=function(){return w(v)}})}),[o,j.messages]);var w=function(e){return E(Object(m.a)(Object(m.a)({},j),{},{status:e}))};Object(a.useEffect)((function(){if(j.isOpenConnection&&j.status!==b&&j.status!==g){var e=0;switch(v){case h:case v:e=window.setTimeout((function(){C(j.author)}),1e3)}return function(){return clearTimeout(e)}}}),[j.status]);var N=Object(a.useCallback)((function(){return o.close}),[o]);return Object(a.useEffect)((function(){return function(){return N()}}),[]),[j,u]};t(17);var d=function(){var e=p("ws://127.0.0.1:9090"),n=Object(r.a)(e,2),t=n[0],a=n[1];return console.log("2",t),t.isOpenConnection?o.a.createElement("div",{className:"Chat"},o.a.createElement(u,{list:t.messages}),o.a.createElement(l,{isOpenConnection:t.isOpenConnection,send:a.send}),t.status):o.a.createElement("div",{className:"Chat"},o.a.createElement("input",{value:t.author,placeholder:"Enter Name",onChange:function(e){return a.setAuthor(e.target.value)}}),o.a.createElement("button",{onClick:function(){return t.author?a.open():null}},"Connect"))};var j=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(d,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.07dea804.chunk.js.map