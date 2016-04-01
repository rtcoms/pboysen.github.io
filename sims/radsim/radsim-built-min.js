!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function getData(){return{pressure:[1e3,990,980,970,960,950,940,930,920,910,900,890,880,870,860,850,840],altitude:[0,80.9705308,162.852307,245.694059,329.485335,414.246019,499.996631,586.758344,674.4897,763.115875,852.640464,942.952656,1034.00407,1125.84507,1218.44313,1311.81595,1405.99922],"sand-day":[285,284.2,283.4,282.5,281.7,280.9,280,279.2,278.3,277.4,276.5,275.5,274.8,274,273,272.2,271.3],"plowed-day":[283,282.2,281.4,280.5,279.7,278.9,278,277.2,277,276.8,276.5,275.5,274.8,274,273,272.2,271.3],"grass-day":[281,280.2,279.4,278.6,277.7,276.9,276.8,277.2,277,276.8,276.5,275.5,274.8,274,273,272.2,271.3],"snow-day":[273,273.2,273.4,273.7,274.6,275.9,276.8,277.2,277,276.8,276.5,275.5,274.8,274,273,272.2,271.3],"sand-night":[278.4,278.5,278.7,278.8,279.5,280.1,280,279.2,278.3,277.4,276.5,275.2,274.8,274,273,272.2,271.3],"plowed-night":[278.4,278.5,278.7,278.8,279.5,280.1,280,279.2,278.3,277.4,276.5,275.2,274.8274,273,272.2,271.3],"grass-night":[274.4,274.5,274.7,274.9,275.5,276.1,276.8,277.2,277,276.8,276.5,275.2,274.8,274,273,272.2,271.3],"snow-night":[268,270,271.8,273.2,274.6,275.9,276.8,277.2,277,276.8,276.5,275.5,274.8,274,273,272.2,271.3]}}function toFahrenheit(kelvin){return 9*(kelvin-273)/5+32}var _get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_utils=require("../utils");createjs.MotionGuidePlugin.install(),createjs.Sound.registerPlugins([createjs.WebAudioPlugin,createjs.HTMLAudioPlugin,createjs.FlashAudioPlugin]),createjs.Ticker.frameRate=30;var points=17,surface_times=["sand-day","plowed-day","grass-day","snow-day","sand-night","plowed-night","grass-night","snow-night"],Image=function(){function Image(src){_classCallCheck(this,Image),this.day=new createjs.Bitmap(src),this.day.x=-1e3,this.day.y=0,this.night=new createjs.Bitmap(src),this.night.x=-1e3,this.night.y=0,this.night.filters=[new createjs.ColorFilter(1,1,1,1,-60,-60,-60)],this.night.cache(0,0,300,200)}return _createClass(Image,[{key:"show",value:function(time){"day"==time?this.day.x=0:this.night.x=0}},{key:"hide",value:function(){this.day.x=this.night.x=-1e3}}]),Image}(),Settings=function(){function Settings(){var _this=this;_classCallCheck(this,Settings),this.setValue(document.querySelector('input[name="choice"]:checked').value),this.listener=null;for(var radios=document.querySelectorAll('input[name="choice"]'),i=0;i<radios.length;i++)radios[i].addEventListener("change",function(e){_this.setValue(e.target.value),_this.listener&&_this.listener(_this.surface,_this.time)})}return _createClass(Settings,[{key:"setValue",value:function(value){this.value=value;var v=value.split("-");this.surface=v[0],this.time=v[1]}},{key:"getValue",value:function(){return this.value}},{key:"getSurface",value:function(){return this.surface}},{key:"getTime",value:function(){return this.time}},{key:"addListener",value:function(listener){this.listener=listener}}]),Settings}(),Buttons=function(){function Buttons(){_classCallCheck(this,Buttons),this.plot=document.getElementById("plot"),this.clear=document.getElementById("clear"),this.plot.disabled=!1,this.clear.disabled=!1}return _createClass(Buttons,[{key:"addListener",value:function(listener){this.plot.addEventListener("click",function(e){return listener(e)}),this.clear.addEventListener("click",function(e){return listener(e)})}}]),Buttons}(),ATGraph=function(_Graph){function ATGraph(stage){return _classCallCheck(this,ATGraph),_possibleConstructorReturn(this,Object.getPrototypeOf(ATGraph).call(this,{stage:stage,w:200,h:200,xlabel:"Temperature(F)",ylabel:"Z(km)",xscale:"linear",yscale:"linear",minX:20,maxX:54,minY:0,maxY:1.5,majorX:4,minorX:1,majorY:.3,minorY:.1,precisionY:1}))}return _inherits(ATGraph,_Graph),_createClass(ATGraph,[{key:"render",value:function(){_get(Object.getPrototypeOf(ATGraph.prototype),"render",this).call(this),this.color="#EEE",this.dotted=!1;for(var t=20;54>t;t+=4){var x=this.xaxis.getLoc(t),y=this.yaxis.getLoc(0);this.drawLine(x,y,x,this.yaxis.getLoc(1.5))}}}]),ATGraph}(_utils.Graph),Rad=function(){function Rad(stage,settings,atgraph){var _this3=this;_classCallCheck(this,Rad),this.stage=stage,this.settings=settings,this.atgraph=atgraph,this.images=[new Image("assets/desert.jpg"),new Image("assets/plowedfield.jpg"),new Image("assets/grassfield.jpg"),new Image("assets/snow.jpg")],this.lastImage=this.images[0],this.surfaces=["sand","plowed","grass","snow"],this.colors={sand:"#8A4117",plowed:"#A52A2A",grass:"#667C26",snow:"#0000FF"},this.plotted={"sand-day":[],"sand-night":[],"plowed-day":[],"plowed-night":[],"grass-day":[],"grass-night":[],"snow-day":[],"snow-night":[]},surface_times.forEach(function(st){for(var i=0;points>i;i++)_this3.plotted[st].push(!1)}),this.balloon=new createjs.Bitmap("assets/balloon.png"),this.balloon.x=150,this.balloon.y=150,this.balloon.scaleX=.15,this.balloon.scaleY=.15,this.data=getData(),this.sun=(new createjs.Shape).set({x:320,y:20}),this.sun.graphics.beginFill("#FFFF00").drawCircle(0,0,10),this.moon=(new createjs.Shape).set({x:320,y:20}),this.moon.graphics.beginFill("#FFFFFF").drawCircle(0,0,10),this.settings.addListener(function(s,t){return _this3.changeSetting(s,t)}),this.balloon.on("pressmove",function(e){e.target.x=150,e.target.y=e.stageY})}return _createClass(Rad,[{key:"render",value:function(){this.addChildren(),this.changeSetting(this.settings.getSurface(),this.settings.getTime()),this.balloon.y=150}},{key:"addChildren",value:function(){var _this4=this;this.images.forEach(function(img){_this4.stage.addChild(img.day),_this4.stage.addChild(img.night)}),this.stage.addChild(this.balloon),this.stage.addChild(this.sun),this.stage.addChild(this.moon)}},{key:"changeSetting",value:function(surface,time){this.lastImage.hide(),this.lastImage=this.images[this.surfaces.indexOf(surface)],this.lastImage.show(time),this.showTime(),this.atgraph.setColor(this.colors[surface]),this.atgraph.setDotted("night"==time),this.balloon.y=150}},{key:"showTime",value:function(){var path=[320,20,300,20,280,20];"day"==this.settings.getTime()?(this.moon.x=320,createjs.Tween.get(this.sun).to({guide:{path:path}},500).play()):(this.sun.x=320,createjs.Tween.get(this.moon).to({guide:{path:path}},500).play())}},{key:"clear",value:function(){this.stage.removeAllChildren(),this.render()}},{key:"plot",value:function(){for(var _this5=this,alt=1500*(150-(this.balloon.y+10))/150,i=0;alt>this.data.altitude[i];)i++;this.plotted[this.settings.getValue()][i]=!0,this.atgraph.clear(),this.atgraph.render(),surface_times.forEach(function(st){var v=st.split("-");_this5.atgraph.setColor(_this5.colors[v[0]]),_this5.atgraph.setDotted("night"==v[1]);for(var alts=_this5.data.altitude,temps=_this5.data[st],_i=0;points>_i;_i++)_this5.plotted[st][_i]===!0&&_this5.atgraph.plot(toFahrenheit(temps[_i]),alts[_i]/1e3)})}}]),Rad}(),RadSim=function(){function RadSim(){var _this6=this;_classCallCheck(this,RadSim),this.mainstage=new createjs.Stage("maincanvas"),this.atstage=new createjs.Stage("atgraph"),this.buttons=new Buttons,this.settings=new Settings,this.atgraph=new ATGraph(this.atstage),this.rad=new Rad(this.mainstage,this.settings,this.atgraph),this.rad.render(),this.buttons.addListener(function(e){switch(e.target.id){case"plot":_this6.rad.plot();break;case"clear":_this6.atgraph.clear(),_this6.atgraph.render()}})}return _createClass(RadSim,[{key:"render",value:function(){var _this7=this;this.atgraph.render(),this.rad.render(),createjs.Ticker.addEventListener("tick",function(e){_this7.atstage.update(),_this7.mainstage.update()})}}]),RadSim}();(new RadSim).render()},{"../utils":4}],2:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0});var marginX=40,marginY=30;exports.Axis=function(){function Axis(spec){_classCallCheck(this,Axis),this.stage=spec.stage,this.w=spec.dim.w||100,this.h=spec.dim.h||100,this.min=spec.dim.min||0,this.max=spec.dim.max||100,this.font=spec.font||"12px Arial",this.color=spec.color||"#000",this.label=spec.label||"label",this.major=spec.major||10,this.minor=spec.minor||5,this.precision=spec.precision||0,this.vertical=spec.orient&&"vertical"==spec.orient||!1,this.linear=spec.scale&&"linear"==spec.scale||!1,this.originX=marginX,this.originY=this.h-marginY,this.scale=this.vertical?this.originY/(this.max-this.min):(this.w-this.originX)/(this.max-this.min)}return _createClass(Axis,[{key:"drawLine",value:function(x1,y1,x2,y2){var line=new createjs.Shape;line.graphics.setStrokeStyle(1),line.graphics.beginStroke(this.color),line.graphics.moveTo(x1,y1),line.graphics.lineTo(x2,y2),line.graphics.endStroke(),this.stage.addChild(line)}},{key:"drawText",value:function(text,x,y){return text.x=x,text.y=y,this.vertical&&text.text==this.label&&(text.rotation=270),this.stage.addChild(text),text}},{key:"getText",value:function(s){return new createjs.Text(s,this.font,this.color)}},{key:"render",value:function(){var label=this.getText(this.label),label_bnds=label.getBounds();if(this.vertical){this.drawLine(this.originX,this.originY,this.originX,0);var y=this.originY-(this.originY-label_bnds.width)/2;this.drawText(label,4,y);for(var val=this.min;val<=this.max;val+=this.major){var v=this.getLoc(val);this.drawLine(this.originX-3,v,this.originX+3,v);var text=this.getText(val.toFixed(this.precision)),bnds=text.getBounds();this.drawText(text,this.originX-5-bnds.width,v+bnds.height/2-10)}}else{this.drawLine(this.originX,this.originY,this.w,this.originY);var x=(this.w-label_bnds.width)/2;this.drawText(label,this.originX+x,this.originY+15);for(var val=this.min;val<=this.max;val+=this.major){var v=this.getLoc(val);this.drawLine(v,this.originY-3,v,this.originY+3);var text=this.getText(val.toFixed(this.precision)),bnds=text.getBounds();this.drawText(text,v-bnds.width/2,this.originY+4)}}}},{key:"getLoc",value:function(val){var ival=this.linear?Math.round(this.scale*(val-this.min)):Math.round(Math.log(this.scale*(val-this.min)));return this.vertical?this.originY-ival:this.originX+ival}},{key:"getValue",value:function(v){var factor=this.vertical?(this.h-(v-this.originY))/this.h:(v-this.originX)/this.w;return this.min+(this.max-this.min)*factor}},{key:"isInside",value:function(v){return this.vertical?v>=this.originY&&v<=this.originY+this.h:v>=this.originX&&v<=this.originY+this.w}}]),Axis}()},{}],3:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.Graph=void 0;var _axis=require("./axis");exports.Graph=function(){function Graph(spec){_classCallCheck(this,Graph),this.stage=spec.stage,this.xaxis=new _axis.Axis({stage:this.stage,label:spec.xlabel,dim:{w:spec.w,h:spec.h,min:spec.minX,max:spec.maxX},orient:"horizontal",scale:spec.xscale,major:spec.majorX,minor:spec.minorX,precision:spec.precisionX}),this.yaxis=new _axis.Axis({stage:this.stage,label:spec.ylabel,dim:{w:spec.w,h:spec.h,min:spec.minY,max:spec.maxY},orient:"vertical",scale:spec.yscale,major:spec.majorY,minor:spec.minorY,precision:spec.precisionY}),this.last=null,this.marker=null,this.color="#000000",this.dotted=!1}return _createClass(Graph,[{key:"setDotted",value:function(dotted){this.dotted=dotted}},{key:"setColor",value:function(color){this.color=color,this.endPlot(),this.marker=new createjs.Shape,this.marker.graphics.beginStroke(color).beginFill(color).drawRect(0,0,4,4),this.marker.x=-10,this.stage.addChild(this.marker)}},{key:"render",value:function(){this.xaxis.render(),this.yaxis.render()}},{key:"clear",value:function(){this.stage.removeAllChildren(),this.endPlot()}},{key:"moveMarker",value:function(x,y){this.marker&&(this.marker.x=x-2,this.marker.y=y-2)}},{key:"drawLine",value:function(x1,y1,x2,y2){var line=new createjs.Shape;this.dotted===!0?line.graphics.setStrokeDash([1,4]).setStrokeStyle(1).beginStroke(this.color).moveTo(x1,y1).lineTo(x2,y2).endStroke():line.graphics.setStrokeStyle(1).beginStroke(this.color).moveTo(x1,y1).lineTo(x2,y2).endStroke(),this.stage.addChild(line)}},{key:"plot",value:function(xv,yv){if(xv>=this.xaxis.min&&xv<=this.xaxis.max&&yv>=this.yaxis.min&&yv<=this.yaxis.max){var x=this.xaxis.getLoc(xv),y=this.yaxis.getLoc(yv);this.last&&(this.moveMarker(this.last.x,this.last.y),this.drawLine(this.last.x,this.last.y,x,y)),this.last=new createjs.Point(x,y),this.moveMarker(x,y)}}},{key:"endPlot",value:function(){this.last=null}}]),Graph}()},{"./axis":2}],4:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _graph=require("./graph");Object.defineProperty(exports,"Graph",{enumerable:!0,get:function(){return _graph.Graph}})},{"./graph":3}]},{},[1]);