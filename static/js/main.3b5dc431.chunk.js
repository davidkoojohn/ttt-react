(this["webpackJsonpbmi-react"]=this["webpackJsonpbmi-react"]||[]).push([[0],{13:function(e,t,s){},14:function(e,t,s){},15:function(e,t,s){},17:function(e,t,s){"use strict";s.r(t);var n=s(1),c=s.n(n),r=s(3),i=s.n(r),a=(s(13),s(14),s(4)),l=s(5),o=s(8),u=s(6),j=(s(15),s(0));function h(e){return Object(j.jsx)("button",{className:(e.bgRed?"red":"")+" square",onClick:e.onClick,children:e.value})}function b(e){return Object(j.jsx)("div",{className:"board",children:e.squares.map((function(t,s){return Object(j.jsx)(h,{value:e.squares[s],onClick:function(){return e.onClick(s)},bgRed:e.line&&e.line.includes(s)},s)}))})}function d(e){var t=e.index,s=e.pos,n=e.stepNumber,c=e.onClick,r=t?"Go to move #"+t:"Go to start";return Object(j.jsxs)("li",{className:t===n?"active":"",children:[Object(j.jsx)("div",{children:t>0&&Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("i",{className:"index",children:[t,". "]}),Object(j.jsxs)("span",{className:"pos",children:["POS\uff1a(",s[0],", ",s[1],")"]})]})}),Object(j.jsx)("button",{onClick:function(){return c(t)},children:r})]})}var x=s(7);function m(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],s=0;s<t.length;s++){var n=Object(x.a)(t[s],3),c=n[0],r=n[1],i=n[2];if(e[c]&&e[c]===e[r]&&e[c]===e[i])return{value:e[c],line:t[s]}}return null}var O=s.p+"static/media/logo.6ce24c58.svg",p=function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(e){var n;return Object(a.a)(this,s),(n=t.call(this,e)).state={history:[{squares:Array(9).fill(null),pos:[]}],xIsNext:!0,stepNumber:0},n}return Object(l.a)(s,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),s=t[t.length-1].squares.slice();m(s)||s[e]||(s[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:s,pos:[parseInt(e/3)+1,e%3+1]}]),xIsNext:!this.state.xIsNext,stepNumber:t.length}))}},{key:"jumpTo",value:function(e){this.setState((function(t){return{stepNumber:e,xIsNext:e%2===0,history:t.history.slice(0,e+1)}}))}},{key:"render",value:function(){var e,t=this,s=this.state.history,n=s[this.state.stepNumber],c=m(n.squares);e=c?"Winner: "+c.value:n.squares.every((function(e){return!0===!!e}))?"No Winner!":"Next player: ".concat(this.state.xIsNext?"X":"O");var r=s.map((function(e,s){return Object(j.jsx)(d,{pos:e.pos,index:s,stepNumber:t.state.stepNumber,onClick:function(e){return t.jumpTo(e)}},s)}));return Object(j.jsxs)("div",{className:"game-container",children:[Object(j.jsxs)("header",{className:"game-header",children:[Object(j.jsx)("img",{src:O,className:"logo",alt:"logo"}),Object(j.jsx)("span",{children:"Tic-Tac-Toe (\u4e09\u8fde\u68cb)\u6e38\u620f"})]}),Object(j.jsxs)("div",{className:"game",children:[Object(j.jsx)("h3",{className:"status",children:e}),Object(j.jsx)("div",{className:"game-board",children:Object(j.jsx)(b,{squares:n.squares,line:c&&c.line,onClick:function(e){return t.handleClick(e)}})}),Object(j.jsx)("div",{className:"game-info",children:Object(j.jsx)("ol",{children:r})})]})]})}}]),s}(n.Component);var v=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsx)(p,{})})},f=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,18)).then((function(t){var s=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;s(e),n(e),c(e),r(e),i(e)}))};i.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(v,{})}),document.getElementById("root")),f()}},[[17,1,2]]]);
//# sourceMappingURL=main.3b5dc431.chunk.js.map