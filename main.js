!function(t){var i={};function e(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var n in t)e.d(s,n,function(i){return t[i]}.bind(null,n));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=1)}([function(t,i,e){},function(t,i,e){"use strict";e.r(i);const s=(t,i)=>{for(let e=0,s=t.length;e<s;e++)if(i(t[e]))return e;return-1},n=Math.sqrt(50),a=Math.sqrt(10),o=Math.sqrt(2);const h=(t,i={})=>{const e=document.createElementNS(l,t);for(let t in i)i.hasOwnProperty(t)&&e.setAttribute(t,i[t]);return e},r=(t,i={})=>{const e=document.createElement(t);for(let t in i)i.hasOwnProperty(t)&&e.setAttribute(t,i[t]);return e},d=t=>t,l="http://www.w3.org/2000/svg",c=t=>t.reduce((t,i)=>i>t?i:t,-1/0),f=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],u=["Sun","Mon","Tue","Wen","Thu","Fri","Sat"];class m{constructor(){this.started=!1,this.animations=new Map}animationIterator(){if(this.animations.size){this.started=!0;for(let[t,i]of this.animations){const{start:e,duration:s,callback:n,style:a,from:o,to:h}=i,r=(Date.now()-e)/s,l=Math.min(d(r),1);i.current=o>h?o-l:o+l,t.style[a]=i.current,l>=1&&(this.animations.delete(t),n&&"function"==typeof n&&n(t))}requestAnimationFrame(()=>this.animationIterator())}else this.started=!1}animate(t,i,e,s,n=300,a){let o=this.animations.get(t);if(o){if(i===o.style&&e===o.from&&s===o.to)return;const t=Date.now();o.duration=Math.max(o.start-t+n,0),o.start=Date.now(),o.from=e,o.to=s,o.callback=a}else o={start:Date.now(),style:i,duration:n,callback:a,current:e,from:e,to:s},this.animations.set(t,o);this.started||requestAnimationFrame(()=>this.animationIterator())}fadeIn(t,i,e){return this.animate(t,"opacity",0,1,i,e)}fadeOut(t,i,e){return this.animate(t,"opacity",1,0,i,e)}}class p{constructor(t,i={columns:[],types:[],names:[],colors:[]},e={name:"Default chart"}){this.chartContainer=r("div"),this.chartContainer.classList.add("chart"),t.appendChild(this.chartContainer),this.title=r("p"),this.title.classList.add("title"),this.title.innerText=e.title,this.chartContainer.appendChild(this.title),this.animations=new m,this.width=e.width||this.chartContainer.clientWidth,this.height=e.height||this.chartContainer.clientHeight,this.chartHeight=(e.height||this.chartContainer.clientHeight)-25,this.chartWidth=(e.width||this.chartContainer.clientWidth)-20,this.offsetHeight=38,this.createBigChart(),this.createDefsForInfoBox(),this.createMiniChart(),this.UpdateDimensions(),this.xContainer=null,this.yContainer=null,this.infoContainer=null,this.xCount=0,this.yCount=0,this.pointX=-1,this.offsetLeft=.7,this.offsetRight=1,this.maximum=0,this.minimum=0,this.zoomRatio=1,this.offsetMaximum=0,this.offsetMinimum=0,this.xAxisData=i.columns.find(t=>"x"===i.types[t[0]]).slice(1),this.chartLinesData=i.columns.filter(t=>"line"===i.types[t[0]]).map(t=>{const e=t[0];return{id:e,name:i.names[e],data:t.slice(1),color:i.colors[e],viewport:null,offsetViewport:null,visible:!0}});const s=()=>{document.body.classList.add("resize"),this.UpdateDimensions(),this.draw(),document.body.classList.remove("resize")};if("ResizeObserver"in window){new ResizeObserver(s).observe(document.body)}else window.addEventListener("resize",s);window.addEventListener("resize",()=>{}),this.getMinMax(),this.getMinMaxOffset(),this.createLinesContainer(),this.createX(),this.createY(),this.createToggleButtons(),this.createInfoBox(),this.draw()}createBigChart(){this.bigChart=h("svg",{preserveAspectRatio:"xMidYMid meet"}),this.bigChart.classList.add("bigChart"),this.chartContainer.appendChild(this.bigChart),this.bigChart.addEventListener("mousemove",t=>{t.stopPropagation();const i=Math.floor((this.offsetLeft+t.clientX/this.width*(this.offsetRight-this.offsetLeft))*this.xAxisData.length);i!==this.pointX&&(this.pointX=i,this.drawInfoBox())}),document.addEventListener("mousemove",()=>{this.pointX=-1,this.infoContainer&&(this.infoContainer.style.opacity=0)})}createDefsForInfoBox(){const t=h("defs"),i=h("filter",{id:"info-filter"}),e=h("feDropShadow",{in:"SourceGraphic","flood-color":"#000000","flood-opacity":"0.25",stdDeviation:"1",dx:"0",dy:"0.5",result:"dropShadow"}),s=h("clipPath",{id:"lines-clip"}),n=h("rect",{x:"0",y:"0",width:this.width,height:this.chartHeight});s.appendChild(n),i.appendChild(e),t.appendChild(s),t.appendChild(i),this.bigChart.appendChild(t)}createLinesContainer(){this.linesContainer=h("g",{fill:"none","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}),this.linesContainer.classList.add("linesContainer"),this.bigChart.appendChild(this.linesContainer)}createMiniChart(){this.miniChartContainer=r("div"),this.miniChartContainer.classList.add("miniChartContainer"),this.miniChartContainer.style.padding="0 10px",this.chartContainer.appendChild(this.miniChartContainer),this.miniChart=h("svg"),this.miniChart.classList.add("miniChart"),this.miniChartContainer.appendChild(this.miniChart);const t=h("rect",{fill:"transparent"});t.classList.add("selector"),this.miniChart.appendChild(t);const i=h("rect");i.classList.add("drag"),i.classList.add("drag-left"),this.miniChart.appendChild(i);const e=h("rect");e.classList.add("drag"),e.classList.add("drag-right"),this.miniChart.appendChild(e),this.miniChartLinesContainer=h("g",{fill:"none","stroke-width":"1","stroke-linecap":"round","stroke-linejoin":"round"}),this.miniChart.appendChild(this.miniChartLinesContainer);const s=h("rect",{x:"0"});s.classList.add("after"),s.classList.add("after-left"),this.miniChart.appendChild(s);const n=h("rect");n.classList.add("after"),n.classList.add("after-right"),this.miniChart.appendChild(n),this.handleDrag()}handleDrag(){let t=!1,i=!1,e=0,s=0;const n=n=>{const a=n.touches&&n.touches.length?n.touches[0].clientX:n.clientX;a>=this.offsetLeft*this.width-10&&a<this.offsetRight*this.width-10&&(n.stopPropagation(),t=!0,e=a-this.offsetLeft*this.width),a>this.offsetLeft*this.width+10&&a<=this.offsetRight*this.width+10&&(n.stopPropagation(),i=!0,s=a-this.offsetRight*this.width)},a=function(){t=!1,i=!1,e=0,s=0},o=n=>{const a=n.changedTouches&&n.changedTouches.length?n.changedTouches[0].clientX:n.clientX;if(t||i){if(t){let t=a-e;this.offsetLeft=t/this.width}if(i){let t=a-s;this.offsetRight=t/this.width}this.offsetRight-this.offsetLeft<.07&&(t?this.offsetRight=this.offsetLeft+.07:i&&(this.offsetLeft=this.offsetRight-.07)),this.offsetRight<.07&&(this.offsetRight=.07),this.offsetRight>1&&(this.offsetRight=1),this.offsetLeft<0&&(this.offsetLeft=0),this.offsetLeft>1-.07&&(this.offsetLeft=1-.07),this.draw()}};"ontouchstart"in window?(this.miniChart.addEventListener("touchstart",function(t){n(t)}),this.miniChart.addEventListener("touchmove",function(t){o(t)}),document.addEventListener("touchend",function(){a()})):(this.miniChart.addEventListener("mousedown",function(t){n(t)}),this.miniChart.addEventListener("mousemove",function(t){o(t)}),document.addEventListener("mouseup",function(){a()}))}createToggleButtons(){const t=r("div");t.classList.add("toggleContainer"),this.miniChartContainer.appendChild(t),this.chartLinesData.forEach(i=>{const e=r("label"),s=r("input",{type:"checkbox",checked:i.visible}),n=r("span"),a=r("div");e.classList.add("toggle"),n.innerText=i.name,a.style.backgroundColor=i.color,a.classList.add("toggle-icon"),i.visible||e.classList.add("toggle-disabled"),s.addEventListener("change",()=>this.toggleLine(e,i)),e.appendChild(s),e.appendChild(a),e.appendChild(n),t.appendChild(e)})}createX(){this.xContainer=h("g",{transform:`translate(0, ${this.chartHeight+15})`}),this.xContainer.classList.add("xContainer"),this.bigChart.appendChild(this.xContainer)}createY(){this.yContainer=h("g"),this.yContainer.classList.add("yContainer"),this.bigChart.appendChild(this.yContainer)}createInfoBox(){if(this.infoContainer)return;this.infoContainer=h("g");const t=h("line",{y1:"3px",y2:this.chartHeight+"px",x1:"0",x2:"0","stroke-width":"1px"});t.classList.add("xLine"),this.infoContainer.appendChild(t);const i=h("g");i.classList.add("info-wrapper"),this.chartLinesData.forEach(t=>{const i=h("circle",{r:"4px",cx:"0",stroke:t.color,"stroke-width":"2px"});i.classList.add("indicator"),i.dataset.id=t.id,this.infoContainer.appendChild(i)}),this.infoContainer.appendChild(i);const e=h("rect",{"stroke-width":"1px",rx:"5",ry:"5",y:"1px",x:"-25px"});e.classList.add("infoBox"),i.appendChild(e);const s=h("text",{fill:"black",y:"19px",x:"-17px"});s.classList.add("day"),i.appendChild(s);const n=h("g");n.classList.add("valueContainer"),i.appendChild(n),this.bigChart.appendChild(this.infoContainer)}drawSelector(){const t=this.miniChart.querySelector(".selector"),i=this.miniChart.querySelector(".drag-left"),e=this.miniChart.querySelector(".drag-right"),s=this.miniChart.querySelector(".after-left"),n=this.miniChart.querySelector(".after-right");if(!(t||i||e||s||n))return;const a=this.width*this.offsetLeft,o=this.width*this.offsetRight,h=o-a;i.setAttribute("x",a),t.setAttribute("x",a),t.setAttribute("width",h),e.setAttribute("x",o-3),s.setAttribute("width",a),n.setAttribute("x",o),n.setAttribute("width",this.width-h)}getMinMax(){let t=[];const i=this.xAxisData.length;for(let e=0,s=this.chartLinesData.length;e<s;e++)this.chartLinesData[e].visible&&t.push(this.chartLinesData[e].data.slice(Math.floor(this.offsetLeft*i),Math.ceil(this.offsetRight*i)));this.maximum=c(t.map(t=>c(t))),this.zoomRatio=1/(this.offsetRight-this.offsetLeft)}getMinMaxOffset(){let t=[];for(let i=0,e=this.chartLinesData.length;i<e;i++)this.chartLinesData[i].visible&&t.push(this.chartLinesData[i].data);this.offsetMaximum=c(t.map(t=>c(t)))}UpdateDimensions(){if(this.width=this.chartContainer.clientWidth,this.chartWidth=this.width-20,this.bigChart.setAttribute("viewBox",`0 0 ${this.width} ${this.height}`),!this.miniChart)return;if(this.miniChart.setAttribute("viewBox",`0 0 ${this.width} ${this.offsetHeight}`),!this.yContainer)return;this.yContainer.querySelectorAll("line").forEach(t=>{t.setAttribute("x2",this.chartWidth+10)})}drawX(){this.renderXTicks();const t=this.xContainer.querySelectorAll("text");for(let i=0,e=t.length;i<e;i++){let e=(t[i].dataset.index/(this.xAxisData.length-1)-this.offsetLeft)*this.width*this.zoomRatio;e=0===e?25:e,t[i].setAttribute("transform",`translate(${e}, 0)`)}}renderXTicks(){let t=this.xContainer.querySelectorAll("text"),i=!1;const e=Math.floor(this.xAxisData.length/5),n=Math.ceil(Math.log2(e/this.zoomRatio)),a=Math.ceil(this.xAxisData.length/2**n*this.zoomRatio);if(this.xCount&&this.xCount!==a){i=!0;for(let i=0,e=t.length;i<e;i++)Number(t[i].dataset.index)%2**n!=0&&this.animations.fadeOut(t[i],300,function(t){t&&t.remove()})}this.xCount=a;const o=this.xAxisData.length;for(let e=0;e<a;e++){const a=e*2**n,h=(a/(o-1)-this.offsetLeft)*this.width*this.zoomRatio;if(!this.xAxisData[a])continue;let r=t[s(t,t=>Number(t.dataset.index)===a)];h>=0&&h<=this.width?r||(r=this.createXTick(a),i&&this.animations.fadeIn(r),this.xContainer.appendChild(r)):r&&this.xContainer.removeChild(r)}}createXTick(t){const i=h("text");return i.textContent=this.getDateLabel(this.xAxisData[t]),i.dataset.index=t,i}drawY(){this.renderYTicks();const t=this.yContainer.querySelectorAll("g");if(this.maximum!==-1/0)for(let i=0,e=t.length;i<e;i++){const e=Number(t[i].dataset.id),s=(this.maximum-e)/(this.maximum-this.minimum)*this.chartHeight;t[i].setAttribute("transform",`translate(0, ${s})`)}}renderYTicks(){const t=function(t,i,e){const s=(i-t)/Math.max(0,e),h=Math.floor(Math.log(s)/Math.LN10),r=s/Math.pow(10,h),d=r>=n?10:r>=a?5:r>=o?2:1;return h>=0?Math.pow(10,h)*d:-Math.pow(10,-h)/d}(this.minimum,this.maximum,6),i=Math.ceil((this.maximum-this.minimum)/t);if(this.yCount&&t*i===this.yCount)return;this.yCount=t*i;let e=this.yContainer.querySelectorAll("g");const h=0!==e.length;for(let i=0,s=e.length;i<s;i++)(e&&Number(e[i].dataset.id)%t!=0||this.maximum===-1/0)&&this.animations.fadeOut(e[i],300,t=>t&&t.remove());if(this.maximum!==-1/0)for(let n=0;n<i;n++){const i=this.minimum+n*t;let a=e[s(e,t=>Number(t.dataset.id)===i)];a||(a=this.createYTick(i),h&&this.animations.fadeIn(a,300),this.yContainer.appendChild(a))}}createYTick(t){const i=h("g"),e=h("line",{x1:10,y1:"0",x2:10+this.chartWidth,y2:"0"}),s=h("text",{x:10,y:"-5px"});return t===this.minimum&&i.classList.add(".yLine"),i.dataset.id=t,s.textContent=t,i.appendChild(e),i.appendChild(s),i}getDateLabel(t){const i=new Date(t);return f[i.getMonth()]+" "+i.getDate()}drawLines(){this.getMinMax(),this.chartLinesData.forEach(t=>this.renderLine(t)),this.linesContainer.setAttribute("transform",`translate(${10+-this.offsetLeft*this.chartWidth*this.zoomRatio}, 0) scale(${this.zoomRatio}, 1)`)}renderLine(t,i=this.maximum,e=this.minimum){if(t.visible?t.viewport&&(t.viewport.style.opacity=1):t.viewport&&(t.viewport.style.opacity=0),t.viewport||(t.viewport=h("path",{stroke:t.color,"vector-effect":"non-scaling-stroke"}),this.linesContainer.appendChild(t.viewport)),this.maximum!==-1/0&&this.minimum!==1/0){const s=this.convertLine(t.data,this.chartWidth,this.chartHeight,i,e);t.viewport.setAttribute("d",s)}t.viewport.setAttribute("transform","")}drawMiniChartLines(){for(let t=0,i=this.chartLinesData.length;t<i;t++)this.drawMiniChartLine(this.chartLinesData[t])}drawMiniChartLine(t){if(t.visible)t.offsetViewport&&(t.offsetViewport.style.opacity=1);else if(t.offsetViewport)return void(t.offsetViewport.style.opacity=0);if(t.offsetViewport||(t.offsetViewport=h("path",{stroke:t.color}),this.miniChartLinesContainer.appendChild(t.offsetViewport)),this.offsetMaximum!==-1/0&&this.offsetMinimum!==1/0){const i=this.convertLine(t.data,this.width,this.offsetHeight,this.offsetMaximum,this.offsetMinimum);t.offsetViewport.setAttribute("d",i)}}convertLine(t,i,e,s,n){let a=[];for(let o=0,h=t.length;o<h;o++){const r=(i/(h-1)*o).toFixed(3),d=e/(s-n),l=((s-t[o])*d).toFixed(3);0===o&&a.push(`M${r},${l}`),a.push(`L${r},${l}`)}return a.join()}toggleLine(t,i){i.visible=!i.visible,t.classList.toggle("toggle-disabled"),this.getMinMaxOffset(),this.draw()}drawInfoBox(){if(this.pointX<0||this.pointX>=this.xAxisData.length||this.maximum===-1/0)return void(this.infoContainer&&(this.infoContainer.style.opacity=0));this.infoContainer.style.opacity=1;const t=this.infoContainer.querySelector(".day"),i=this.infoContainer.querySelector(".valueContainer"),e=this.infoContainer.querySelector(".infoBox"),n=this.infoContainer.querySelector(".info-wrapper"),a=this.xAxisData[this.pointX],o=new Date(a),r=`${u[o.getDay()]}, ${f[o.getMonth()]} ${o.getDate()}`,d=10+(this.pointX/(this.xAxisData.length-1)-this.offsetLeft)*this.chartWidth*this.zoomRatio,l=i.querySelectorAll("text");let c=0,m=0;this.infoContainer.setAttribute("transform",`translate(${d}, 0)`);let p=0;this.chartLinesData.forEach((t,e)=>{const n=s(l,i=>i.dataset.id===t.id);let a=l[n];if(!a){(a=h("text",{fill:t.color})).dataset.id=t.id;const e=h("tspan");e.classList.add("infoLabel"),e.textContent=t.name;const s=h("tspan");s.classList.add("infoValue"),a.appendChild(s),a.appendChild(e),i.appendChild(a)}const o=this.infoContainer.querySelectorAll(".indicator"),r=s(o,i=>i.dataset.id===t.id);if(r>=0){const i=o[r];if(t.visible?i.style.opacity=1:i.style.opacity=0,this.maximum===-1/0)return;const e=(this.maximum-t.data[this.pointX])/(this.maximum-this.minimum)*this.chartHeight;i.setAttribute("cy",e+"px")}if(!t.visible)return a.remove(),void p--;const d=e+p,f=a.querySelector(".infoValue"),u=a.querySelector(".infoLabel");if(!f||!u)return t.data[this.pointX];const C=2%(d+1)-1,g=-17+Math.max(c,d%2*30);if(a.setAttribute("x",g+"px"),a.setAttribute("y",65+18*C+"px"),u.setAttribute("x",g+"px"),u.setAttribute("y",80+18*C+"px"),f.textContent!==String(t.data[this.pointX])&&(f.textContent=t.data[this.pointX]),(d+1)%2==0)c=0;else{const t=a.getBBox().width+10;t>m&&(m=t),c+=Math.max(t,m)}return t.data[this.pointX]}),t.textContent!==r&&(t.textContent=r);const C=t.getBBox(),g=i.getBBox(),x=Math.round(Math.max(C.width,g.width)+20),w=Math.round(C.height+g.height+25);d+x>this.chartWidth+30+5?n.setAttribute("transform",`translate(${-d+this.chartWidth-x+30+5}, 0)`):d-30-5<0?n.setAttribute("transform",`translate(${30-d+5}, 0)`):n.removeAttribute("transform"),e.setAttribute("width",x+"px"),e.setAttribute("height",w+"px")}draw(){this.drawLines(),this.drawX(),this.drawY(),this.drawSelector(),this.drawMiniChartLines(),this.drawInfoBox()}}e(0);let C="";const g=document.createElement("div");g.classList.add("main");const x=document.createElement("div");x.classList.add("chartContainer"),document.body.appendChild(g),g.appendChild(x);const w=document.createElement("button");function L(t){localStorage.setItem("chartTheme",t)}g.appendChild(w),function(){null==(C=localStorage.getItem("chartTheme"))?(C="light",L("light")):"dark"==C&&document.body.classList.toggle("dark");w.innerText="light"===C?"Switch to Night Mode":"Switch to Day Mode",w.classList.add("dark-button"),w.addEventListener("click",()=>{document.body.classList.toggle("dark"),document.body.classList.contains("dark")?(w.innerText="Switch to Day Mode",L("dark")):(w.innerText="Switch to Night Mode",L("light"))})}(),window.onload=async function(){!async function(t){for(let i=0,e=t.length;i<e;i++)new p(x,t[i],{height:500,title:"Followers "+(i+1)})}(await async function(){let t=await fetch("./src/data/data.json");return await t.json()}())}}]);