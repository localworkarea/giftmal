!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):(t=t||self).Rolldate=i()}(this,(function(){"use strict";"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var t=function(t,i){return t(i={exports:{}},i.exports),i.exports}((function(t,i){
/*!
   * better-normal-scroll v1.14.1
   * (c) 2016-2019 ustbhuangyi
   * Released under the MIT License.
   */
t.exports=function(){function t(t,i){for(;i+1<t.length;i++)t[i]=t[i+1];t.pop()}var i=function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,i){var e=[],s=!0,o=!1,n=void 0;try{for(var r,a=t[Symbol.iterator]();!(s=(r=a.next()).done)&&(e.push(r.value),!i||e.length!==i);s=!0);}catch(t){o=!0,n=t}finally{try{!s&&a.return&&a.return()}finally{if(o)throw n}}return e}(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")},e="undefined"!=typeof window,s=e&&navigator.userAgent.toLowerCase(),o=s&&/wechatdevtools/.test(s),n=s&&0<s.indexOf("android");function r(){return window.performance&&window.performance.now?window.performance.now()+window.performance.timing.navigationStart:+new Date}function a(t){for(var i=arguments.length,e=Array(1<i?i-1:0),s=1;s<i;s++)e[s-1]=arguments[s];for(var o=0;o<e.length;o++){var n=e[o];for(var r in n)t[r]=n[r]}return t}function l(t){return null==t}var h=e&&document.createElement("div").style,c=function(){if(!e)return!1;var t={webkit:"webkitTransform",Moz:"MozTransform",O:"OTransform",ms:"msTransform",standard:"transform"};for(var i in t)if(void 0!==h[t[i]])return i;return!1}();function p(t){return!1!==c&&("standard"===c?"transitionEnd"===t?"transitionend":t:c+t.charAt(0).toUpperCase()+t.substr(1))}function d(t,i,e,s){t.addEventListener(i,e,{passive:!1,capture:!!s})}function u(t,i,e,s){t.removeEventListener(i,e,{passive:!1,capture:!!s})}function m(t){for(var i=0,e=0;t;)i-=t.offsetLeft,e-=t.offsetTop,t=t.offsetParent;return{left:i,top:e}}c&&"standard"!==c&&c.toLowerCase();var f=p("transform"),v=p("transition"),g=e&&p("perspective")in h,y=e&&("ontouchstart"in window||o),w=!1!==f,T=e&&v in h,b={transform:f,transition:v,transitionTimingFunction:p("transitionTimingFunction"),transitionDuration:p("transitionDuration"),transitionDelay:p("transitionDelay"),transformOrigin:p("transformOrigin"),transitionEnd:p("transitionEnd")},x={touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2};function S(t){if(t instanceof window.SVGElement){var i=t.getBoundingClientRect();return{top:i.top,left:i.left,width:i.width,height:i.height}}return{top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight}}function Y(t,i){for(var e in i)if(i[e].test(t[e]))return!0;return!1}function D(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"click",e=void 0;"mouseup"===t.type||"mousecancel"===t.type?e=t:"touchend"!==t.type&&"touchcancel"!==t.type||(e=t.changedTouches[0]);var s={};e&&(s.screenX=e.screenX||0,s.screenY=e.screenY||0,s.clientX=e.clientX||0,s.clientY=e.clientY||0);var o=void 0,n=!0,r=!0;if("undefined"!=typeof MouseEvent)try{o=new MouseEvent(i,a({bubbles:n,cancelable:r},s))}catch(t){l()}else l();function l(){(o=document.createEvent("Event")).initEvent(i,n,r),a(o,s)}o.forwardedTouchEvent=!0,o._constructed=!0,t.target.dispatchEvent(o)}var M={startX:0,startY:0,scrollX:!1,scrollY:!0,freeScroll:!1,directionLockThreshold:5,eventPassthrough:"",click:!1,tap:!1,bounce:!0,bounceTime:800,momentum:!0,momentumLimitTime:300,momentumLimitDistance:15,swipeTime:2500,swipeBounceTime:500,deceleration:.0015,flickLimitTime:200,flickLimitDistance:100,resizePolling:60,probeType:0,preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/},HWCompositing:!0,useTransition:!0,useTransform:!0,bindToWrapper:!1,disableMouse:y,disableTouch:!y,observeDOM:!0,autoBlur:!0,wheel:!1,snap:!1,scrollbar:!1,pullDownRefresh:!1,pullUpLoad:!1,mouseWheel:!1,stopPropagation:!1,zoom:!1,infinity:!1,dblclick:!1},X={swipe:{style:"cubic-bezier(0.23, 1, 0.32, 1)",fn:function(t){return 1+--t*t*t*t*t}},swipeBounce:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(t){return t*(2-t)}},bounce:{style:"cubic-bezier(0.165, 0.84, 0.44, 1)",fn:function(t){return 1- --t*t*t*t}}};function _(t,i,e,s,o,n,r){var a=t-i,l=Math.abs(a)/e,h=r.deceleration,c=r.itemHeight,p=r.swipeBounceTime,d=r.wheel,u=r.swipeTime,m=d?4:15,f=t+l/h*(a<0?-1:1);return d&&c&&(f=Math.round(f/c)*c),f<s?(f=n?Math.max(s-n/4,s-n/m*l):s,u=p):o<f&&(f=n?Math.min(o+n/4,o+n/m*l):o,u=p),{destination:Math.round(f),duration:u}}function E(){}var k,L,O,P,I,H=e?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(t){return window.setTimeout(t,(t.interval||100/60)/2)}:E,W=e?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||function(t){window.clearTimeout(t)}:E;function A(t){console.error("[BScroll warn]: "+t)}function C(t,i){this.wrapper="string"==typeof t?document.querySelector(t):t,this.wrapper||A("Can not resolve the wrapper DOM."),this.scroller=this.wrapper.children[0],this.scroller||A("The wrapper need at least one child element to be scroller."),this.scrollerStyle=this.scroller.style,this._init(i)}return(k=C).prototype._init=function(t){this._handleOptions(t),this._events={},this.x=0,this.y=0,this.directionX=0,this.directionY=0,this.setScale(1),this._addDOMEvents(),this._initExtFeatures(),this._watchTransition(),this.options.observeDOM&&this._initDOMObserver(),this.options.autoBlur&&this._handleAutoBlur(),this.refresh(),this.options.snap||this.scrollTo(this.options.startX,this.options.startY),this.enable()},k.prototype.setScale=function(t){this.lastScale=l(this.scale)?t:this.scale,this.scale=t},k.prototype._handleOptions=function(t){this.options=a({},M,t),this.translateZ=this.options.HWCompositing&&g?" translateZ(0)":"",this.options.useTransition=this.options.useTransition&&T,this.options.useTransform=this.options.useTransform&&w,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollX="horizontal"!==this.options.eventPassthrough&&this.options.scrollX,this.options.scrollY="vertical"!==this.options.eventPassthrough&&this.options.scrollY,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,!0===this.options.tap&&(this.options.tap="tap")},k.prototype._addDOMEvents=function(){var t=d;this._handleDOMEvents(t)},k.prototype._removeDOMEvents=function(){var t=u;this._handleDOMEvents(t)},k.prototype._handleDOMEvents=function(t){var i=this.options.bindToWrapper?this.wrapper:window;t(window,"orientationchange",this),t(window,"resize",this),this.options.click&&t(this.wrapper,"click",this,!0),this.options.disableMouse||(t(this.wrapper,"mousedown",this),t(i,"mousemove",this),t(i,"mousecancel",this),t(i,"mouseup",this)),y&&!this.options.disableTouch&&(t(this.wrapper,"touchstart",this),t(i,"touchmove",this),t(i,"touchcancel",this),t(i,"touchend",this)),t(this.scroller,b.transitionEnd,this)},k.prototype._initExtFeatures=function(){this.options.snap&&this._initSnap(),this.options.scrollbar&&this._initScrollbar(),this.options.pullUpLoad&&this._initPullUp(),this.options.pullDownRefresh&&this._initPullDown(),this.options.wheel&&this._initWheel(),this.options.mouseWheel&&this._initMouseWheel(),this.options.zoom&&this._initZoom(),this.options.infinity&&this._initInfinite()},k.prototype._watchTransition=function(){if("function"==typeof Object.defineProperty){var t=this,i=!1,e=this.options.useTransition?"isInTransition":"isAnimating";Object.defineProperty(this,e,{get:function(){return i},set:function(e){i=e;for(var s=t.scroller.children.length?t.scroller.children:[t.scroller],o=i&&!t.pulling?"none":"auto",n=0;n<s.length;n++)s[n].style.pointerEvents=o}})}},k.prototype._handleAutoBlur=function(){this.on("scrollStart",(function(){var t=document.activeElement;!t||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName||t.blur()}))},k.prototype._initDOMObserver=function(){var t=this;if("undefined"!=typeof MutationObserver){var i=void 0,e=new MutationObserver((function(e){if(!t._shouldNotRefresh()){for(var s=!1,o=!1,n=0;n<e.length;n++){var r=e[n];if("attributes"!==r.type){s=!0;break}if(r.target!==t.scroller){o=!0;break}}s?t.refresh():o&&(clearTimeout(i),i=setTimeout((function(){t._shouldNotRefresh()||t.refresh()}),60))}}));e.observe(this.scroller,{attributes:!0,childList:!0,subtree:!0}),this.on("destroy",(function(){e.disconnect()}))}else this._checkDOMUpdate()},k.prototype._shouldNotRefresh=function(){var t=this.x>this.minScrollX||this.x<this.maxScrollX||this.y>this.minScrollY||this.y<this.maxScrollY;return this.isInTransition||this.stopFromTransition||t},k.prototype._checkDOMUpdate=function(){var t=S(this.scroller),i=t.width,e=t.height;function s(){var o=this;setTimeout((function(){(function(){if(!this.destroyed){var o=(t=S(this.scroller)).width,n=t.height;i===o&&e===n||this.refresh(),i=o,e=n,s.call(this)}}).call(o)}),1e3)}s.call(this)},k.prototype.handleEvent=function(t){switch(t.type){case"touchstart":case"mousedown":this._start(t),this.options.zoom&&t.touches&&1<t.touches.length&&this._zoomStart(t);break;case"touchmove":case"mousemove":this.options.zoom&&t.touches&&1<t.touches.length?this._zoom(t):this._move(t);break;case"touchend":case"mouseup":case"touchcancel":case"mousecancel":this.scaled?this._zoomEnd(t):this._end(t);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(t);break;case"click":this.enabled&&!t._constructed&&(Y(t.target,this.options.preventDefaultException)||(t.preventDefault(),t.stopPropagation()));break;case"wheel":case"DOMMouseScroll":case"mousewheel":this._onMouseWheel(t)}},k.prototype.refresh=function(){var t="static"===window.getComputedStyle(this.wrapper,null).position,i=S(this.wrapper);this.wrapperWidth=i.width,this.wrapperHeight=i.height;var e=S(this.scroller);this.scrollerWidth=Math.round(e.width*this.scale),this.scrollerHeight=Math.round(e.height*this.scale),this.relativeX=e.left,this.relativeY=e.top,t&&(this.relativeX-=i.left,this.relativeY-=i.top),this.minScrollX=0,this.minScrollY=0;var s=this.options.wheel;s?(this.items=this.scroller.children,this.options.itemHeight=this.itemHeight=this.items.length?this.scrollerHeight/this.items.length:0,void 0===this.selectedIndex&&(this.selectedIndex=s.selectedIndex||0),this.options.startY=-this.selectedIndex*this.itemHeight,this.maxScrollX=0,this.maxScrollY=-this.itemHeight*(this.items.length-1)):(this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.options.infinity||(this.maxScrollY=this.wrapperHeight-this.scrollerHeight),this.maxScrollX<0?(this.maxScrollX-=this.relativeX,this.minScrollX=-this.relativeX):1<this.scale&&(this.maxScrollX=this.maxScrollX/2-this.relativeX,this.minScrollX=this.maxScrollX),this.maxScrollY<0?(this.maxScrollY-=this.relativeY,this.minScrollY=-this.relativeY):1<this.scale&&(this.maxScrollY=this.maxScrollY/2-this.relativeY,this.minScrollY=this.maxScrollY)),this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<this.minScrollX,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<this.minScrollY,this.hasHorizontalScroll||(this.maxScrollX=this.minScrollX,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=this.minScrollY,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=m(this.wrapper),this.trigger("refresh"),!this.scaled&&this.resetPosition()},k.prototype.enable=function(){this.enabled=!0},k.prototype.disable=function(){this.enabled=!1},(L=C).prototype._start=function(t){var i=x[t.type];if((1===i||0===t.button)&&!(!this.enabled||this.destroyed||this.initiated&&this.initiated!==i)){this.initiated=i,this.options.preventDefault&&!Y(t.target,this.options.preventDefaultException)&&t.preventDefault(),this.options.stopPropagation&&t.stopPropagation(),this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.movingDirectionX=0,this.movingDirectionY=0,this.directionLocked=0,this._transitionTime(),this.startTime=r(),this.options.wheel&&(this.target=t.target),this.stop();var e=t.touches?t.touches[0]:t;this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=e.pageX,this.pointY=e.pageY,this.trigger("beforeScrollStart")}},L.prototype._move=function(t){if(this.enabled&&!this.destroyed&&x[t.type]===this.initiated){this.options.preventDefault&&t.preventDefault(),this.options.stopPropagation&&t.stopPropagation();var i=t.touches?t.touches[0]:t,e=i.pageX-this.pointX,s=i.pageY-this.pointY;this.pointX=i.pageX,this.pointY=i.pageY,this.distX+=e,this.distY+=s;var o=Math.abs(this.distX),n=Math.abs(this.distY),a=r();if(!(a-this.endTime>this.options.momentumLimitTime&&n<this.options.momentumLimitDistance&&o<this.options.momentumLimitDistance)){if(this.directionLocked||this.options.freeScroll||(o>n+this.options.directionLockThreshold?this.directionLocked="h":n>=o+this.options.directionLockThreshold?this.directionLocked="v":this.directionLocked="n"),"h"===this.directionLocked){if("vertical"===this.options.eventPassthrough)t.preventDefault();else if("horizontal"===this.options.eventPassthrough)return void(this.initiated=!1);s=0}else if("v"===this.directionLocked){if("horizontal"===this.options.eventPassthrough)t.preventDefault();else if("vertical"===this.options.eventPassthrough)return void(this.initiated=!1);e=0}e=this.hasHorizontalScroll?e:0,s=this.hasVerticalScroll?s:0,this.movingDirectionX=0<e?-1:e<0?1:0,this.movingDirectionY=0<s?-1:s<0?1:0;var l=this.x+e,h=this.y+s,c=!1,p=!1,d=!1,u=!1,m=this.options.bounce;!1!==m&&(c=void 0===m.top||m.top,p=void 0===m.bottom||m.bottom,d=void 0===m.left||m.left,u=void 0===m.right||m.right),(l>this.minScrollX||l<this.maxScrollX)&&(l=l>this.minScrollX&&d||l<this.maxScrollX&&u?this.x+e/3:l>this.minScrollX?this.minScrollX:this.maxScrollX),(h>this.minScrollY||h<this.maxScrollY)&&(h=h>this.minScrollY&&c||h<this.maxScrollY&&p?this.y+s/3:h>this.minScrollY?this.minScrollY:this.maxScrollY),this.moved||(this.moved=!0,this.trigger("scrollStart")),this._translate(l,h),a-this.startTime>this.options.momentumLimitTime&&(this.startTime=a,this.startX=this.x,this.startY=this.y,1===this.options.probeType&&this.trigger("scroll",{x:this.x,y:this.y})),1<this.options.probeType&&this.trigger("scroll",{x:this.x,y:this.y});var f=document.documentElement.scrollLeft||window.pageXOffset||document.body.scrollLeft,v=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,g=this.pointX-f,y=this.pointY-v;(g>document.documentElement.clientWidth-this.options.momentumLimitDistance||g<this.options.momentumLimitDistance||y<this.options.momentumLimitDistance||y>document.documentElement.clientHeight-this.options.momentumLimitDistance)&&this._end(t)}}},L.prototype._end=function(t){if(this.enabled&&!this.destroyed&&x[t.type]===this.initiated){this.initiated=!1,this.options.preventDefault&&!Y(t.target,this.options.preventDefaultException)&&t.preventDefault(),this.options.stopPropagation&&t.stopPropagation(),this.trigger("touchEnd",{x:this.x,y:this.y}),this.isInTransition=!1;var i=Math.round(this.x),e=Math.round(this.y),s=i-this.absStartX,o=e-this.absStartY;if(this.directionX=0<s?-1:s<0?1:0,this.directionY=0<o?-1:o<0?1:0,!this.options.pullDownRefresh||!this._checkPullDown())if(this._checkClick(t))this.trigger("scrollCancel");else if(!this.resetPosition(this.options.bounceTime,X.bounce)){this._translate(i,e),this.endTime=r();var n=this.endTime-this.startTime,a=Math.abs(i-this.startX),l=Math.abs(e-this.startY);if(this._events.flick&&n<this.options.flickLimitTime&&a<this.options.flickLimitDistance&&l<this.options.flickLimitDistance)this.trigger("flick");else{var h=0;if(this.options.momentum&&n<this.options.momentumLimitTime&&(l>this.options.momentumLimitDistance||a>this.options.momentumLimitDistance)){var c=!1,p=!1,d=!1,u=!1,m=this.options.bounce;!1!==m&&(c=void 0===m.top||m.top,p=void 0===m.bottom||m.bottom,d=void 0===m.left||m.left,u=void 0===m.right||m.right);var f=-1===this.directionX&&d||1===this.directionX&&u?this.wrapperWidth:0,v=-1===this.directionY&&c||1===this.directionY&&p?this.wrapperHeight:0,g=this.hasHorizontalScroll?_(this.x,this.startX,n,this.maxScrollX,this.minScrollX,f,this.options):{destination:i,duration:0},y=this.hasVerticalScroll?_(this.y,this.startY,n,this.maxScrollY,this.minScrollY,v,this.options):{destination:e,duration:0};i=g.destination,e=y.destination,h=Math.max(g.duration,y.duration),this.isInTransition=!0}else this.options.wheel&&(e=Math.round(e/this.itemHeight)*this.itemHeight,h=this.options.wheel.adjustTime||400);var w=X.swipe;if(this.options.snap){var T=this._nearestSnap(i,e);this.currentPage=T,h=this.options.snapSpeed||Math.max(Math.max(Math.min(Math.abs(i-T.x),1e3),Math.min(Math.abs(e-T.y),1e3)),300),i=T.x,e=T.y,this.directionX=0,this.directionY=0,w=this.options.snap.easing||X.bounce}if(i!==this.x||e!==this.y)return(i>this.minScrollX||i<this.maxScrollX||e>this.minScrollY||e<this.maxScrollY)&&(w=X.swipeBounce),void this.scrollTo(i,e,h,w);this.options.wheel&&(this.selectedIndex=Math.round(Math.abs(this.y/this.itemHeight))),this.trigger("scrollEnd",{x:this.x,y:this.y})}}}},L.prototype._checkClick=function(t){var i,e,s,o,n,a=this.stopFromTransition&&!this.pulling;if(this.stopFromTransition=!1,this.moved)return!1;if(this.options.wheel){if(this.target&&this.target.classList.contains(this.options.wheel.wheelWrapperClass)){var l=Math.abs(Math.round(this.y/this.itemHeight)),h=Math.round((this.pointY+(o=this.wrapper,n=o.getBoundingClientRect(),{left:-(n.left+window.pageXOffset),top:-(n.top+window.pageYOffset)}).top-this.wrapperHeight/2)/this.itemHeight);this.target=this.items[l+h]}return this.scrollToElement(this.target,this.options.wheel.adjustTime||400,!0,!0,X.swipe),!0}if(a)return!1;var c=this.options.dblclick,p=!1;if(c&&this.lastClickTime){var d=c.delay,u=void 0===d?300:d;r()-this.lastClickTime<u&&(p=!0,D(t,"dblclick"))}return this.options.tap&&(i=t,e=this.options.tap,(s=document.createEvent("Event")).initEvent(e,!0,!0),s.pageX=i.pageX,s.pageY=i.pageY,i.target.dispatchEvent(s)),this.options.click&&!Y(t.target,this.options.preventDefaultException)&&D(t),this.lastClickTime=p?null:r(),!0},L.prototype._resize=function(){var t=this;this.enabled&&(n&&(this.wrapper.scrollTop=0),clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout((function(){t.refresh()}),this.options.resizePolling))},L.prototype._startProbe=function(){W(this.probeTimer),this.probeTimer=H((function i(){var e=t.getComputedPosition();t.trigger("scroll",e),t.isInTransition?t.probeTimer=H(i):t.trigger("scrollEnd",e)}));var t=this},L.prototype._transitionTime=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;if(this.scrollerStyle[b.transitionDuration]=t+"ms",this.options.wheel)for(var i=0;i<this.items.length;i++)this.items[i].style[b.transitionDuration]=t+"ms";if(this.indicators)for(var e=0;e<this.indicators.length;e++)this.indicators[e].transitionTime(t)},L.prototype._transitionTimingFunction=function(t){if(this.scrollerStyle[b.transitionTimingFunction]=t,this.options.wheel)for(var i=0;i<this.items.length;i++)this.items[i].style[b.transitionTimingFunction]=t;if(this.indicators)for(var e=0;e<this.indicators.length;e++)this.indicators[e].transitionTimingFunction(t)},L.prototype._transitionEnd=function(t){t.target===this.scroller&&this.isInTransition&&(this._transitionTime(),(!this.pulling||1===this.movingDirectionY)&&!this.resetPosition(this.options.bounceTime,X.bounce)&&(this.isInTransition=!1,3!==this.options.probeType&&this.trigger("scrollEnd",{x:this.x,y:this.y})))},L.prototype._translate=function(t,i,e){if(function(t){if(!t)throw new Error("[BScroll] Translate x or y is null or undefined.")}(!l(t)&&!l(i)),l(e)&&(e=this.scale),this.options.useTransform?this.scrollerStyle[b.transform]="translate("+t+"px,"+i+"px) scale("+e+")"+this.translateZ:(t=Math.round(t),i=Math.round(i),this.scrollerStyle.left=t+"px",this.scrollerStyle.top=i+"px"),this.options.wheel)for(var s=this.options.wheel.rotate,o=void 0===s?25:s,n=0;n<this.items.length;n++){var r=o*(i/this.itemHeight+n);this.items[n].style[b.transform]="rotateX("+r+"deg)"}if(this.x=t,this.y=i,this.setScale(e),this.indicators)for(var a=0;a<this.indicators.length;a++)this.indicators[a].updatePosition()},L.prototype._animate=function(t,i,e,s){var o=this,n=this.x,a=this.y,l=this.lastScale,h=this.scale,c=r(),p=c+e;this.isAnimating=!0,W(this.animateTimer),function d(){var u=r();if(p<=u)return o.isAnimating=!1,o._translate(t,i,h),o.trigger("scroll",{x:o.x,y:o.y}),void(o.pulling||o.resetPosition(o.options.bounceTime)||o.trigger("scrollEnd",{x:o.x,y:o.y}));var m=s(u=(u-c)/e),f=(t-n)*m+n,v=(i-a)*m+a,g=(h-l)*m+l;o._translate(f,v,g),o.isAnimating&&(o.animateTimer=H(d)),3===o.options.probeType&&o.trigger("scroll",{x:o.x,y:o.y})}()},L.prototype.scrollBy=function(t,i){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,s=3<arguments.length&&void 0!==arguments[3]?arguments[3]:X.bounce;t=this.x+t,i=this.y+i,this.scrollTo(t,i,e,s)},L.prototype.scrollTo=function(t,i){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,s=3<arguments.length&&void 0!==arguments[3]?arguments[3]:X.bounce;(this.x!==t||this.y!==i)&&(this.isInTransition=this.options.useTransition&&0<e&&(t!==this.x||i!==this.y),!e||this.options.useTransition?(this._transitionTimingFunction(s.style),this._transitionTime(e),this._translate(t,i),e&&3===this.options.probeType&&this._startProbe(),e||(this.trigger("scroll",{x:t,y:i}),this._reflow=document.body.offsetHeight,this.resetPosition(this.options.bounceTime,X.bounce)||this.trigger("scrollEnd",{x:t,y:i})),this.options.wheel&&(i>this.minScrollY?this.selectedIndex=0:i<this.maxScrollY?this.selectedIndex=this.items.length-1:this.selectedIndex=Math.round(Math.abs(i/this.itemHeight)))):this._animate(t,i,e,s.fn))},L.prototype.scrollToElement=function(t,i,e,s,o){if(t&&(t=t.nodeType?t:this.scroller.querySelector(t),!this.options.wheel||t.classList.contains(this.options.wheel.wheelItemClass))){var n=m(t);n.left-=this.wrapperOffset.left,n.top-=this.wrapperOffset.top,!0===e&&(e=Math.round(t.offsetWidth/2-this.wrapper.offsetWidth/2)),!0===s&&(s=Math.round(t.offsetHeight/2-this.wrapper.offsetHeight/2)),n.left-=e||0,n.top-=s||0,n.left=n.left>this.minScrollX?this.minScrollX:n.left<this.maxScrollX?this.maxScrollX:n.left,n.top=n.top>this.minScrollY?this.minScrollY:n.top<this.maxScrollY?this.maxScrollY:n.top,this.options.wheel&&(n.top=Math.round(n.top/this.itemHeight)*this.itemHeight),this.scrollTo(n.left,n.top,i,o)}},L.prototype.resetPosition=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:X.bounce,e=this.x,s=Math.round(e);!this.hasHorizontalScroll||s>this.minScrollX?e=this.minScrollX:s<this.maxScrollX&&(e=this.maxScrollX);var o=this.y,n=Math.round(o);return!this.hasVerticalScroll||n>this.minScrollY?o=this.minScrollY:n<this.maxScrollY&&(o=this.maxScrollY),(e!==this.x||o!==this.y)&&(this.scrollTo(e,o,t,i),!0)},L.prototype.getComputedPosition=function(){var t=window.getComputedStyle(this.scroller,null),i=void 0,e=void 0;return e=this.options.useTransform?(i=+((t=t[b.transform].split(")")[0].split(", "))[12]||t[4]),+(t[13]||t[5])):(i=+t.left.replace(/[^-\d.]/g,""),+t.top.replace(/[^-\d.]/g,"")),{x:i,y:e}},L.prototype.stop=function(){if(this.options.useTransition&&this.isInTransition){this.isInTransition=!1,W(this.probeTimer);var t=this.getComputedPosition();this._translate(t.x,t.y),this.options.wheel?this.target=this.items[Math.round(-t.y/this.itemHeight)]:this.trigger("scrollEnd",{x:this.x,y:this.y}),this.stopFromTransition=!0}else!this.options.useTransition&&this.isAnimating&&(this.isAnimating=!1,W(this.animateTimer),this.trigger("scrollEnd",{x:this.x,y:this.y}),this.stopFromTransition=!0)},L.prototype.destroy=function(){this.destroyed=!0,this.trigger("destroy"),this.options.useTransition?W(this.probeTimer):W(this.animateTimer),this._removeDOMEvents(),this._events={}},(O=C).prototype.on=function(t,i){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:this;this._events[t]||(this._events[t]=[]),this._events[t].push([i,e])},O.prototype.once=function(t,i){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:this;function s(){this.off(t,s),i.apply(e,arguments)}s.fn=i,this.on(t,s)},O.prototype.off=function(i,e){var s=this._events[i];if(s)for(var o=s.length;o--;)(s[o][0]===e||s[o][0]&&s[o][0].fn===e)&&t(s,o)},O.prototype.trigger=function(t){var e=this._events[t];if(e)for(var s=e.length,o=[].concat(function(t){if(Array.isArray(t)){for(var i=0,e=Array(t.length);i<t.length;i++)e[i]=t[i];return e}return Array.from(t)}(e)),n=0;n<s;n++){var r=o[n],a=i(r,2),l=a[0],h=a[1];l&&l.apply(h,[].slice.call(arguments,1))}},(P=C).prototype.wheelTo=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;if(this.options.wheel){var i=-t*this.itemHeight;this.scrollTo(0,i)}},P.prototype.getSelectedIndex=function(){return this.options.wheel&&this.selectedIndex},P.prototype._initWheel=function(){var t=this.options.wheel;t.wheelWrapperClass||(t.wheelWrapperClass="wheel-scroll"),t.wheelItemClass||(t.wheelItemClass="wheel-item"),void 0===t.selectedIndex&&(t.selectedIndex=0,A("wheel option selectedIndex is required!"))},(I=C).prototype._initMouseWheel=function(){var t=this;this._handleMouseWheelEvent(d),this.on("destroy",(function(){clearTimeout(t.mouseWheelTimer),clearTimeout(t.mouseWheelEndTimer),t._handleMouseWheelEvent(u)})),this.firstWheelOpreation=!0},I.prototype._handleMouseWheelEvent=function(t){t(this.wrapper,"wheel",this),t(this.wrapper,"mousewheel",this),t(this.wrapper,"DOMMouseScroll",this)},I.prototype._onMouseWheel=function(t){var i=this;if(this.enabled){t.preventDefault(),this.options.stopPropagation&&t.stopPropagation(),this.firstWheelOpreation&&this.trigger("scrollStart"),this.firstWheelOpreation=!1;var e=this.options.mouseWheel,s=e.speed,o=void 0===s?20:s,n=e.invert,r=void 0!==n&&n,a=e.easeTime,l=void 0===a?300:a;clearTimeout(this.mouseWheelTimer),this.mouseWheelTimer=setTimeout((function(){i.options.snap||l||i.trigger("scrollEnd",{x:i.x,y:i.y}),i.firstWheelOpreation=!0}),400);var h=void 0,c=void 0;switch(!0){case"deltaX"in t:c=1===t.deltaMode?(h=-t.deltaX*o,-t.deltaY*o):(h=-t.deltaX,-t.deltaY);break;case"wheelDeltaX"in t:h=t.wheelDeltaX/120*o,c=t.wheelDeltaY/120*o;break;case"wheelDelta"in t:h=c=t.wheelDelta/120*o;break;case"detail"in t:h=c=-t.detail/3*o;break;default:return}var p=r?-1:1;h*=p,c*=p,this.hasVerticalScroll||(h=c,c=0);var d=void 0,u=void 0;if(this.options.snap)return d=this.currentPage.pageX,u=this.currentPage.pageY,0<h?d--:h<0&&d++,0<c?u--:c<0&&u++,void this._goToPage(d,u);d=this.x+Math.round(this.hasHorizontalScroll?h:0),u=this.y+Math.round(this.hasVerticalScroll?c:0),this.movingDirectionX=this.directionX=0<h?-1:h<0?1:0,this.movingDirectionY=this.directionY=0<c?-1:c<0?1:0,d>this.minScrollX?d=this.minScrollX:d<this.maxScrollX&&(d=this.maxScrollX),u>this.minScrollY?u=this.minScrollY:u<this.maxScrollY&&(u=this.maxScrollY);var m=this.y===u;this.scrollTo(d,u,l,X.swipe),this.trigger("scroll",{x:this.x,y:this.y}),clearTimeout(this.mouseWheelEndTimer),m&&(this.mouseWheelEndTimer=setTimeout((function(){i.trigger("scrollEnd",{x:i.x,y:i.y})}),l))}},C.Version="1.14.1",C}()}));function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=this,e=void 0;if(i.extend(t),t.el){if(!(e=i.$(t.el))||e.bindRolldate)return;e.bindRolldate=1,i.tap(e,(function(){i.show()}))}if(t.value){t.el&&("input"==e.nodeName.toLowerCase()?e.value=t.value:e.innerText=t.value);var s=t.value.replace(/-/g,"/").replace(/[^\d/:\s]/g,""),o=new Date(s);o&&"Invalid Date"!=o?t.el?e.bindDate=o:i.bindDate=o:console.error("Invalid Date："+s)}}return i.prototype={constructor:i,baseData:function(){return{domId:{YYYY:"rolldate-year",MM:"rolldate-month",DD:"rolldate-day",hh:"rolldate-hour",mm:"rolldate-min",ss:"rolldate-sec"},opts:{el:"",format:"YYYY-MM-DD",beginYear:2e3,endYear:2100,init:null,moveEnd:null,confirm:null,cancel:null,minStep:1,trigger:"tap",lang:{title:"Title",cancel:"Cancel",confirm:"Confirm",year:"year",month:"month",day:"day",hour:"hour",min:"min",sec:"sec"},typeMonth:"numeric",localeMonth:"January_February_March_April_May_June_July_August_September_October_November_December"}}},extend:function(t){var i=this.baseData().opts;for(var e in i)if(i[e]&&"[object Object]"==Object.prototype.toString.call(i[e]))for(var s in t[e])i[e][s]=null==t[e][s]?i[e][s]:t[e][s];else i[e]=t[e]||i[e];this.config=i},createUI:function(){for(var i=this,e=i.baseData(),s=i.config,o=e.domId,n=s.format.split(/-|\/|\s|:/g),r=n.length,a="",l=s.el?i.$(s.el).bindDate||new Date:i.bindDate||new Date,h="",c=s.lang,p=s.typeMonth,d="string"==typeof s.localeMonth?s.localeMonth.split("_"):s.localeMonth,u=0;u<r;u++){var m=n[u],f=0;if(a+='<div id="'+o[m]+'"><ul class="wheel-scroll">',"YYYY"==m)for(var v=s.beginYear;v<=s.endYear;v++)a+='<li class="wheel-item '+(h=v==l.getFullYear()?"active":"")+'" data-index="'+f+'">'+v+"</li>",f++;else if("MM"==m)for(var g=1;g<=12;g++)h=g==l.getMonth()+1?"active":"",a+="text"===p?'<li class="wheel-item '+h+'" data-index="'+f+'">'+d[f]+"</li>":'<li class="wheel-item '+h+'" data-index="'+f+'">'+(g<10?"0"+g:g)+"</li>",f++;else if("DD"==m)for(var y=i.bissextile(l.getFullYear(),l.getMonth()+1),w=1;w<=y;w++)a+='<li class="wheel-item '+(h=w==l.getDate()?"active":"")+'" data-index="'+f+'">'+(w<10?"0"+w:w)+"</li>",f++;else if("hh"==m)for(var T=0;T<=23;T++)a+='<li class="wheel-item '+(h=T==l.getHours()?"active":"")+'" data-index="'+f+'">'+(T<10?"0"+T:T)+c.hour+"</li>",f++;else if("mm"==m)for(var b=0;b<=59;b+=s.minStep)a+='<li class="wheel-item '+(h=b==l.getMinutes()?"active":"")+'" data-index="'+f+'">'+(b<10?"0"+b:b)+c.min+"</li>",f++;else if("ss"==m)for(var x=0;x<=59;x++)a+='<li class="wheel-item '+(h=x==l.getSeconds()?"active":"")+'" data-index="'+f+'">'+(x<10?"0"+x:x)+c.sec+"</li>",f++;a+="</ul></div>"}var S='<div class="rolldate-mask"></div>\n            <div class="rolldate-panel">\n                <header>\n                    <span class="rolldate-btn rolldate-cancel">'+c.cancel+"</span>\n                    "+c.title+'\n                    <span class="rolldate-btn rolldate-confirm">'+c.confirm+'</span>\n                </header>\n                <section class="rolldate-content">\n                    <div class="rolldate-dim mask-top"></div>\n                    <div class="rolldate-dim mask-bottom"></div>\n                    <div class="rolldate-wrapper">\n                        '+a+"\n                    </div>\n                </section>\n            </div>",Y=document.createElement("div");Y.className="rolldate-container"+(navigator.userAgent.match(/MicroMessenger/i)?" wx":""),Y.innerHTML=S,document.body.appendChild(Y),i.scroll={};for(var D=function(e){var r=o[n[e]];i.scroll[n[e]]=new t("#"+r,{wheel:{selectedIndex:0}});var a=i.scroll[n[e]],h=i.$("#"+r+" .active"),c=h?h.getAttribute("data-index"):Math.round(l.getMinutes()/s.minStep);a.wheelTo(c),a.on("scrollEnd",(function(){if(s.moveEnd&&s.moveEnd.call(i,a),-1!=[o.YYYY,o.MM].indexOf(a.wrapper.id)&&i.scroll.YYYY&&i.scroll.MM&&i.scroll.DD){i.getSelected(i.scroll.DD);var t=i.bissextile(i.getSelected(i.scroll.YYYY),i.getSelected(i.scroll.MM)),e="";if(t!=i.$("#"+o.DD+" li",1).length){for(var n=1;n<=t;n++)e+='<li class="wheel-item">'+(n<10?"0"+n:n)+"</li>";i.$("#"+o.DD+" ul").innerHTML=e,i.scroll.DD.refresh()}}}))},M=0;M<r;M++)D(M);i.$(".rolldate-panel").className="rolldate-panel fadeIn"},$:function(t,i){return"string"!=typeof t&&t.nodeType?t:i?document.querySelectorAll(t):document.querySelector(t)},tap:function(t,i){if("ontouchstart"in window&&"tap"==this.config.trigger){var e={};t.addEventListener("touchstart",(function(t){var i=t.touches[0];e.startX=i.pageX,e.startY=i.pageY,e.sTime=+new Date})),t.addEventListener("touchend",(function(t){var s=t.changedTouches[0];e.endX=s.pageX,e.endY=s.pageY,+new Date-e.sTime<300&&Math.abs(e.endX-e.startX)+Math.abs(e.endY-e.startY)<20&&(t.preventDefault(),i.call(this,t)),e={}}))}else t.addEventListener("click",(function(t){i.call(this,t)}))},show:function(){var t=this,i=t.config,e=void 0;if(i.el){if(!(e=t.$(i.el)).bindRolldate)return;"input"==e.nodeName.toLowerCase()&&e.blur()}t.$(".rolldate-container")||i.init&&!1===i.init.call(t)||(t.createUI(),t.event())},hide:function(t){var i=this.$(".rolldate-panel.fadeIn");i&&(i.className="rolldate-panel fadeOut",this.destroy(t))},event:function(){var t=this,i=t.$(".rolldate-mask"),e=t.$(".rolldate-cancel"),s=t.$(".rolldate-confirm");t.tap(i,(function(){t.hide(1)})),t.tap(e,(function(){t.hide(1)})),t.tap(s,(function(){var i=t.config,e=void 0,s=i.format,o=new Date;for(var n in t.scroll){var r=t.getSelected(t.scroll[n]);s=s.replace(n,r),"YYYY"==n?o.setFullYear(r):"MM"==n?o.setMonth(r-1):"DD"==n?o.setDate(r):"hh"==n?o.setHours(r):"mm"==n?o.setMinutes(r):"ss"==n&&o.setSeconds(r)}if(i.confirm){var a=i.confirm.call(t,s);if(!1===a)return!1;a&&(s=a)}i.el?("input"==(e=t.$(i.el)).nodeName.toLowerCase()?e.value=s:e.innerText=s,e.bindDate=o):t.bindDate=o,t.hide()}))},bissextile:function(t,i){var e=void 0;return 1==i||3==i||5==i||7==i||8==i||10==i||12==i?e=31:4==i||6==i||11==i||9==i?e=30:2==i&&(e=t%4!=0||t%100==0&&t%400!=0?28:29),e},destroy:function(t){var i=this,e=i.config;for(var s in i.scroll)i.scroll[s].destroy();t&&e.cancel&&e.cancel.call(i),setTimeout((function(){var t=i.$(".rolldate-container");t&&t.parentNode&&document.body.removeChild(t)}),300)},getSelected:function(t){var i=this.$("#"+t.wrapper.id+" li",1)[t.getSelectedIndex()],e=this.baseData();if("text"===this.config.typeMonth&&t.wrapper.id===e.domId.MM){var s=parseInt(i.getAttribute("data-index"))+1;return s<10?"0"+s.toString():s.toString()}return i.innerText.replace(/\D/g,"")}},i.version="3.2.0",i}));