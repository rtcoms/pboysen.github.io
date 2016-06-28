!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function saturation(temp){return 10*.611*Math.exp(17.27*temp/(temp+273.16-35.86))}function icesaturation(temp){return 10*.611*Math.exp(21.87*temp/(temp+273.16-7.66))}function humidity(temp,vapor){return 100*vapor/saturation(temp)}function dewpoint(temp,vapor){return temp-(100-humidity(temp,vapor))/5}function getCol(val){var v=val.toFixed(1),td=document.createElement("td");return td.appendChild(document.createTextNode(v)),td}function getDelete(row){var td=document.createElement("td"),img=document.createElement("img");return img.setAttribute("src","assets/delete.jpg"),img.setAttribute("class","delete_img"),img.setAttribute("alt","Delete row"),img.setAttribute("title","Delete row"),img.addEventListener("click",function(event){if(confirm("Delete row?")){var node=event.target.parentNode.parentNode;mtnsim.mtn.deleteTrial(Array.prototype.indexOf.call(node.parentNode.childNodes,node))}}),td.appendChild(img),td}function getRow(json,row){var tr=document.createElement("tr");return tr.appendChild(getCol(json.start.temp)),tr.appendChild(getCol(json.start.vapor)),tr.appendChild(getCol(json.start.dewpoint)),tr.appendChild(getCol(json.temp)),tr.appendChild(getCol(json.vapor)),tr.appendChild(getCol(json.dewpoint)),json.cloudbase>0?tr.appendChild(getCol(json.cloudbase)):tr.appendChild(document.createElement("td").appendChild(document.createTextNode("Clear"))),tr.appendChild(getDelete(row)),tr}var _get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_utils=require("../utils"),mtnsim_results="mtnsim_results",store=(0,_utils.getStore)();createjs.MotionGuidePlugin.install(),createjs.Sound.registerPlugins([createjs.WebAudioPlugin,createjs.HTMLAudioPlugin,createjs.FlashAudioPlugin]),createjs.Ticker.frameRate=20;var Trial=function(){function Trial(){_classCallCheck(this,Trial),this.start=null,this.cloudbase=0,this.temp=0,this.altitude=0,this.vapor=0,this.humidity=0,this.dewpoint=0}return _createClass(Trial,[{key:"toJSON",value:function(){return{start:this.start,cloudbase:this.cloudbase,temp:this.temp,altitude:this.altitude,vapor:this.vapor,humidity:this.humidity,dewpoint:this.dewpoint}}},{key:"init",value:function(start){this.start=start,this.cloudbase=0,this.temp=start.temp,this.altitude=0,this.vapor=start.vapor,this.humidity=start.humidity,this.dewpoint=start.dewpoint}}]),Trial}(),Settings=function(){function Settings(){function slidef(e,input,out,f){e.stopPropagation(),out.value=input.valueAsNumber,f&&f(input)}var _this=this;_classCallCheck(this,Settings),this.temp=document.getElementById("temp"),this.vapor=document.getElementById("vapor"),this.tempout=document.getElementById("tempout"),this.vaporout=document.getElementById("vaporout"),this.mute=document.getElementById("mute"),this.listener=null;var event=/msie|trident/g.test(window.navigator.userAgent.toLowerCase())?"change":"input";this.temp.addEventListener(event,function(e){return slidef(e,temp,tempout,_this.listener)}),this.vapor.addEventListener(event,function(e){return slidef(e,vapor,vaporout,_this.listener)})}return _createClass(Settings,[{key:"getTemp",value:function(){return this.temp.valueAsNumber}},{key:"getVapor",value:function(){return this.vapor.valueAsNumber}},{key:"setTemp",value:function(value){this.temp.value=value,this.tempout.value=value.toFixed(1)}},{key:"setVapor",value:function(value){this.vapor.value=value,this.vaporout.value=value.toFixed(1)}},{key:"addListener",value:function(listener){this.listener=listener}}]),Settings}(),Buttons=function(){function Buttons(){_classCallCheck(this,Buttons),this.run=document.getElementById("run"),this.pause=document.getElementById("pause"),this.restart=document.getElementById("restart"),this.mute=document.getElementById("mute")}return _createClass(Buttons,[{key:"addListener",value:function(listener){this.run.addEventListener("click",function(e){return listener(e)}),this.pause.addEventListener("click",function(e){return listener(e)}),this.restart.addEventListener("click",function(e){return listener(e)})}},{key:"mute",value:function(){return this.mute.checked}}]),Buttons}(),ETGraph=function(_Graph){function ETGraph(stage,settings){_classCallCheck(this,ETGraph);var _this2=_possibleConstructorReturn(this,Object.getPrototypeOf(ETGraph).call(this,{stage:stage,w:200,h:200,xlabel:"Temperature(C)",ylabel:"Vapor Pressure(mb)",xscale:"linear",yscale:"linear",minX:-20,maxX:30,minY:0,maxY:50,majorX:10,minorX:5,majorY:10,minorY:5}));return _this2.settings=settings,_this2.lasth=0,_this2.leaf=new createjs.Bitmap("assets/leaf.gif"),_this2.marker=new createjs.Shape,_this2.marker.graphics.beginFill("#000").drawRect(_this2.xaxis.getLoc(_this2.temp)-2,_this2.yaxis.getLoc(_this2.vapor)-2,4,4),stage.addChild(_this2.leaf),stage.addChild(_this2.marker),_this2.settings.addListener(function(slider){"temp"==slider.id?_this2.temp=slider.valueAsNumber:"vapor"==slider.id&&(_this2.vapor=slider.valueAsNumber),_this2.moveMarker(!0)}),_this2.icegraph=new IceGraph(stage),_this2}return _inherits(ETGraph,_Graph),_createClass(ETGraph,[{key:"render",value:function(){this.temp=this.settings.getTemp(),this.vapor=this.settings.getVapor(),_get(Object.getPrototypeOf(ETGraph.prototype),"render",this).call(this),this.plotSaturation(),this.icegraph.render(),this.moveMarker(!0)}},{key:"plotSaturation",value:function(){for(var t=this.xaxis.min;0>t;t++)this.plot(t,icesaturation(t));for(var t=0;t<this.xaxis.max;t++)this.plot(t,saturation(t));this.endPlot()}},{key:"clear",value:function(){_get(Object.getPrototypeOf(ETGraph.prototype),"clear",this).call(this),this.stage.addChild(this.leaf)}},{key:"moveLeaf",value:function(x,y){this.leaf.x=x-10,this.leaf.y=y-10}},{key:"showLeaf",value:function(){var x=this.xaxis.getLoc(this.temp),y=this.yaxis.getLoc(this.vapor);this.moveLeaf(x,y)}},{key:"moveMarker",value:function(updateSettings){var sat=saturation(this.temp);this.vapor>sat&&(this.vapor=sat,updateSettings===!0&&(this.settings.setTemp(this.temp),this.settings.setVapor(sat)));var x=this.xaxis.getLoc(this.temp),y=this.yaxis.getLoc(this.vapor);this.marker.x=x-2,this.marker.y=y-2,updateSettings===!0&&this.moveLeaf(x,y)}},{key:"update",value:function(trial){this.temp=trial.temp,this.vapor=trial.vapor,this.plot(trial.temp,trial.vapor),this.moveMarker(!1),this.showLeaf()}}]),ETGraph}(_utils.Graph),ATGraph=function(_Graph2){function ATGraph(stage){_classCallCheck(this,ATGraph);var _this3=_possibleConstructorReturn(this,Object.getPrototypeOf(ATGraph).call(this,{stage:stage,w:200,h:200,xlabel:"Temperature(C)",ylabel:"Altitude(km)",xscale:"linear",yscale:"linear",minX:-20,maxX:30,minY:0,maxY:5,majorX:10,minorX:5,majorY:1,minorY:.5}));return _this3.temp=20,_this3.altitude=0,_this3.cloudbase=0,_this3}return _inherits(ATGraph,_Graph2),_createClass(ATGraph,[{key:"update",value:function(trial){this.plot(trial.temp,trial.altitude)}}]),ATGraph}(_utils.Graph),IceGraph=function(_Graph3){function IceGraph(stage){_classCallCheck(this,IceGraph);var _this4=_possibleConstructorReturn(this,Object.getPrototypeOf(IceGraph).call(this,{stage:stage,x:60,y:110,w:75,h:100,xlabel:"C",xscale:"linear",yscale:"linear",minX:-15,maxX:1,minY:1,maxY:5,majorX:5,majorY:1,background:"#EEE"})),liquid=new createjs.Text("Liquid","10px Arial","#000");liquid.x=65,liquid.y=40,stage.addChild(liquid);var ice=new createjs.Text("Ice","10px Arial","#000");return ice.x=90,ice.y=70,stage.addChild(ice),_this4}return _inherits(IceGraph,_Graph3),_createClass(IceGraph,[{key:"render",value:function(){_get(Object.getPrototypeOf(IceGraph.prototype),"render",this).call(this),console.log("ice");for(var t=this.xaxis.min;t<=this.xaxis.max;t++)this.plot(t,saturation(t));this.endPlot();for(var t=this.xaxis.min;t<=this.xaxis.max;t++)this.plot(t,icesaturation(t));this.endPlot()}}]),IceGraph}(_utils.Graph),Mtn=function(){function Mtn(stage,settings,finish){var _this5=this;_classCallCheck(this,Mtn),this.stage=stage,this.settings=settings,this.finish=finish,createjs.Sound.registerSound({id:"thunder",src:"assets/thunder.mp3"}),createjs.Sound.registerSound({id:"wind",src:"assets/wind.mp3"}),this.wind=null,this.thunder=null,this.mtn=new createjs.Bitmap("assets/mountain.png"),this.leaf=new createjs.Bitmap("assets/leaf.gif"),this.cloud=new createjs.Bitmap("assets/thundercloud.png"),this.bolt=new createjs.Bitmap("assets/lightning.png"),this.leaftween=null,this.mtn.x=0,this.mtn.y=0,this.mtn.scaleX=.5,this.mtn.scaleY=.5,this.bolt.x=-100,this.bolt.scaleX=.015,this.bolt.scaleY=.015,this.running=!1,this.lightning=!1,this.lighttick=0,this.path=[50,164,60,155,74,152,80,140,90,131,100,125,112,122,120,110,137,92,140,75,151,64,150,60,173,56,185,60,204,70,210,80,221,92,221,95,224,105,230,110,246,121,250,130,268,141,280,150,290,164],this.results=document.getElementById("results_table"),document.getElementById("delete_all").addEventListener("click",function(event){confirm("Delete all data?")&&_this5.deleteResults()}),this.trial=new Trial,this.showResults()}return _createClass(Mtn,[{key:"render",value:function(){this.stage.addChild(this.mtn),this.stage.addChild(this.leaf),this.stage.addChild(this.cloud),this.stage.addChild(this.bolt),this.leaf.x=50,this.leaf.y=165,this.cloud.x=-1e3,this.cloud.y=0,this.lastalt=0,this.cloud.scaleX=.1,this.cloud.scaleY=.05}},{key:"clear",value:function(){this.stage.removeAllChildren(),this.render()}},{key:"play",value:function(){var _this6=this;this.temp=this.settings.getTemp(),this.vapor=this.settings.getVapor(),this.trial.init({temp:this.temp,vapor:this.vapor,humidity:humidity(this.temp,this.vapor),dewpoint:dewpoint(this.temp,this.vapor)}),this.factor=10,this.lastalt=0,this.leaftween=createjs.Tween.get(this.leaf).to({guide:{path:this.path}},12e3),this.leaftween.call(function(){_this6.wind&&_this6.wind.stop(),_this6.running=!1,_this6.addTrial(),_this6.finish&&_this6.finish()}),this.running=!0,this.leaftween.play(),this.playSound("wind")}},{key:"showResults",value:function(){for(var _this7=this,i=this.results.children.length-1;i>1;i--)this.results.removeChild(this.results.children[i]);var trials=store.get(mtnsim_results);trials?trials.forEach(function(json){return _this7.results.appendChild(getRow(json))}):store.set(mtnsim_results,[])}},{key:"addTrial",value:function(){var trials=store.get(mtnsim_results),json=this.trial.toJSON();store.set(mtnsim_results,trials.concat(json)),this.results.appendChild(getRow(json))}},{key:"deleteTrial",value:function(row){var trials=store.get(mtnsim_results);trials=trials.splice(row,1),store.set(mtnsim_results,trials),this.showResults()}},{key:"deleteResults",value:function(){store.set(mtnsim_results,[]),this.showResults()}},{key:"pause",value:function(_pause){this.leaftween.setPaused(_pause),this.wind&&(this.wind.paused=_pause),this.thunder&&(this.thunder.paused=_pause),this.running=!_pause}},{key:"playSound",value:function(sound){if(!this.settings.mute.checked)switch(sound){case"wind":this.wind=createjs.Sound.play(sound,{loop:2});break;case"thunder":this.thunder=createjs.Sound.play(sound)}}},{key:"update",value:function(trial){var oldA=trial.altitude,oldT=trial.temp;trial.altitude=(165-this.leaf.y)/165*5,trial.altitude<0&&(trial.altitude=0),trial.temp=Number(oldT-this.factor*(trial.altitude-oldA)),trial.humidity=humidity(trial.temp,trial.vapor),trial.dewpoint=dewpoint(trial.temp,trial.vapor);var sat=saturation(trial.temp);trial.vapor>sat&&(this.animateClouds(),trial.vapor=sat,trial.humidity=100,this.factor=6),trial.temp>oldT&&(this.factor=10)}},{key:"animateClouds",value:function(){0==this.trial.cloudbase&&(this.trial.cloudbase=this.trial.altitude,this.cloud.x=this.leaf.x-2,this.cloud.y=this.leaf.y,this.bolt.y=this.cloud.y+20,this.lasty=this.leaf.y),this.trial.altitude-this.lastalt>.1&&(this.lastalt=this.trial.altitude,this.cloud.scaleX+=.021,this.cloud.scaleY+=.02,this.cloud.y=this.leaf.y),!this.lightning&&this.leaf.x<140&&this.trial.temp<=-5&&this.trial.altitude-this.trial.cloudbase>.5&&(this.lighttick=0,this.lightning=!0)}},{key:"newTrial",value:function(){this.trial=new Trial}},{key:"tick",value:function(etgraph,atgraph){if(this.running===!0&&(this.update(this.trial),etgraph.update(this.trial),atgraph.update(this.trial),this.lightning===!0)){switch(this.lighttick){case 0:this.bolt.x=this.cloud.x+10;break;case 5:this.bolt.x+=10;break;case 7:this.bolt.x+=10;break;case 10:this.bolt.x=-100;break;case 60:this.playSound("thunder"),this.lightning=!1}this.lighttick++}}}]),Mtn}(),MtnSim=function(){function MtnSim(){var _this8=this;_classCallCheck(this,MtnSim),this.mainstage=new createjs.Stage("maincanvas"),this.etstage=new createjs.Stage("etgraph"),this.atstage=new createjs.Stage("atgraph"),this.buttons=new Buttons,this.settings=new Settings,this.etgraph=new ETGraph(this.etstage,this.settings),this.atgraph=new ATGraph(this.atstage),this.mtn=new Mtn(this.mainstage,this.settings,function(){_this8.buttons.restart.disabled=!1,_this8.buttons.pause.disabled=!0}),this.pause=!1,this.buttons.addListener(function(e){switch(e.target.id){case"run":_this8.enablePlay(!1),_this8.buttons.pause.value="Pause",_this8.pause=!1,_this8.mtn.play();break;case"pause":_this8.pause=!_this8.pause,_this8.mtn.pause(_this8.pause),e.target.value=_this8.pause?"Resume":"Pause";break;case"restart":_this8.reset(),_this8.mtn.clear(),_this8.etgraph.clear(),_this8.atgraph.clear(),_this8.etgraph.render(),_this8.atgraph.render(),_this8.mtn.newTrial()}})}return _createClass(MtnSim,[{key:"reset",value:function(){this.enablePlay(!0),this.settings.setTemp(20),this.settings.setVapor(7)}},{key:"enablePlay",value:function(play){this.buttons.run.disabled=!play,this.buttons.pause.disabled=play,this.buttons.restart.disabled=!play}},{key:"render",value:function(){var _this9=this;this.buttons.run.disabled=!1,this.buttons.mute.checked=!1,this.buttons.pause.disabled=!0,this.buttons.restart.disabled=!0,this.reset(),this.etgraph.render(),this.atgraph.render(),this.mtn.render(),createjs.Ticker.addEventListener("tick",function(e){_this9.mtn.tick(_this9.etgraph,_this9.atgraph),_this9.etstage.update(),_this9.atstage.update(),_this9.mainstage.update()})}}]),MtnSim}(),mtnsim=new MtnSim;mtnsim.render()},{"../utils":4}],2:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0});var marginX=40,marginY=30,endMargin=5;exports.Axis=function(){function Axis(spec){_classCallCheck(this,Axis),this.spec=spec,this.stage=spec.stage,this.w=spec.dim.w||100,this.h=spec.dim.h||100,this.min=spec.dim.min||0,this.max=spec.dim.max||100,this.font=spec.font||"11px Arial",this.color=spec.color||"#000",this.label=spec.label,this.major=spec.major||10,this.minor=spec.minor||spec.major,this.precision=spec.precision||0,this.vertical=spec.orient&&"vertical"==spec.orient||!1,this.linear=spec.scale&&"linear"==spec.scale||!1,spec.dim.x?(this.originX=spec.dim.x,this.endX=this.originX+this.w):(this.originX=marginX,this.endX=this.w-endMargin),spec.dim.y?(this.originY=spec.dim.y,this.endY=this.originY-this.h+endMargin):(this.originY=this.h-marginY,this.endY=endMargin),this.scale=this.vertical?Math.abs(this.endY-this.originY)/(this.max-this.min):Math.abs(this.endX-this.originX)/(this.max-this.min)}return _createClass(Axis,[{key:"drawLine",value:function(x1,y1,x2,y2){var line=new createjs.Shape;line.graphics.setStrokeStyle(1),line.graphics.beginStroke(this.color),line.graphics.moveTo(x1,y1),line.graphics.lineTo(x2,y2),line.graphics.endStroke(),this.stage.addChild(line)}},{key:"drawText",value:function(text,x,y){return text.x=x,text.y=y,this.vertical&&text.text==this.label&&(text.rotation=270),this.stage.addChild(text),text}},{key:"getText",value:function(s){return new createjs.Text(s,this.font,this.color)}},{key:"render",value:function(){var label=this.getText(this.label),label_bnds=label.getBounds();if(this.vertical){if(this.drawLine(this.originX,this.originY,this.originX,this.endY),this.spec.label){var y=this.originY-(this.originY-label_bnds.width)/2;this.drawText(label,4,y)}for(var val=this.min;val<=this.max;val+=this.major){var v=this.getLoc(val);this.drawLine(this.originX-4,v,this.originX+4,v);var text=this.getText(val.toFixed(this.precision)),bnds=text.getBounds();this.drawText(text,this.originX-5-bnds.width,v+bnds.height/2-10)}for(var val=this.min;val<=this.max;val+=this.minor){var v=this.getLoc(val);this.drawLine(this.originX-2,v,this.originX+2,v)}}else{if(this.drawLine(this.originX,this.originY,this.endX,this.originY),this.spec.label){var x=(this.w-endMargin-label_bnds.width)/2;this.drawText(label,this.originX+x,this.originY+15)}for(var val=this.min;val<=this.max;val+=this.major){var v=this.getLoc(val);this.drawLine(v,this.originY-4,v,this.originY+4);var text=this.getText(val.toFixed(this.precision)),bnds=text.getBounds();this.drawText(text,v-bnds.width/2,this.originY+4)}for(var val=this.min;val<=this.max;val+=this.minor){var v=this.getLoc(val);this.drawLine(v,this.originY-2,v,this.originY+2)}}}},{key:"getLoc",value:function(val){var ival=this.linear?Math.round(this.scale*(val-this.min)):Math.round(Math.log(this.scale*(val-this.min)));return this.vertical?this.originY-ival:this.originX+ival}},{key:"getValue",value:function(v){var factor=this.vertical?(this.originY-v)/this.originY:(v-this.originX)/(this.w-this.originX);return this.min+(this.max-this.min)*factor}},{key:"isInside",value:function(v){return this.vertical?v>=this.originY&&v<=this.originY+this.h:v>=this.originX&&v<=this.originY+this.w}}]),Axis}()},{}],3:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.Graph=void 0;var _axis=require("./axis");exports.Graph=function(){function Graph(spec){if(_classCallCheck(this,Graph),this.stage=spec.stage,this.xaxis=new _axis.Axis({stage:this.stage,label:spec.xlabel,dim:{x:spec.x,y:spec.y,w:spec.w,h:spec.h,min:spec.minX,max:spec.maxX},orient:"horizontal",scale:spec.xscale,major:spec.majorX,minor:spec.minorX,precision:spec.precisionX}),this.yaxis=new _axis.Axis({stage:this.stage,label:spec.ylabel,dim:{x:spec.x,y:spec.y,w:spec.w,h:spec.h,min:spec.minY,max:spec.maxY},orient:"vertical",scale:spec.yscale,major:spec.majorY,minor:spec.minorY,precision:spec.precisionY}),this.last=null,this.marker=null,this.color="#000",this.dotted=!1,spec.background){var b=new createjs.Shape;b.graphics.beginStroke("#AAA").beginFill(spec.background).drawRect(spec.x,spec.y-spec.h,spec.w,spec.h).endStroke(),b.alpha=.3,spec.stage.addChild(b)}}return _createClass(Graph,[{key:"setDotted",value:function(dotted){this.dotted=dotted}},{key:"setColor",value:function(color){this.color=color,this.endPlot(),this.marker=new createjs.Shape,this.marker.graphics.beginStroke(color).beginFill(color).drawRect(0,0,4,4),this.marker.x=-10,this.stage.addChild(this.marker)}},{key:"render",value:function(){this.xaxis.render(),this.yaxis.render()}},{key:"clear",value:function(){this.stage.removeAllChildren(),this.endPlot()}},{key:"moveMarker",value:function(x,y){this.marker&&(this.marker.x=x-2,this.marker.y=y-2)}},{key:"drawLine",value:function(x1,y1,x2,y2){var line=new createjs.Shape;this.dotted===!0?line.graphics.setStrokeDash([1,4]).setStrokeStyle(1).beginStroke(this.color).moveTo(x1,y1).lineTo(x2,y2).endStroke():line.graphics.setStrokeStyle(1).beginStroke(this.color).moveTo(x1,y1).lineTo(x2,y2).endStroke(),this.stage.addChild(line)}},{key:"plot",value:function(xv,yv){if(xv>=this.xaxis.min&&xv<=this.xaxis.max&&yv>=this.yaxis.min&&yv<=this.yaxis.max){var x=this.xaxis.getLoc(xv),y=this.yaxis.getLoc(yv);this.last&&(this.moveMarker(this.last.x,this.last.y),this.drawLine(this.last.x,this.last.y,x,y)),this.last=new createjs.Point(x,y),this.moveMarker(x,y)}}},{key:"endPlot",value:function(){this.last=null}}]),Graph}()},{"./axis":2}],4:[function(require,module,exports){"use strict";function getParams(){var params={};return location.search&&location.search.slice(1).split("&").forEach(function(part){var pair=part.split("=");pair[0]=decodeURIComponent(pair[0]),pair[1]=decodeURIComponent(pair[1]),params[pair[0]]="undefined"!==pair[1]?pair[1]:!0}),params}function getStore(){return store.enabled?store:void alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')}Object.defineProperty(exports,"__esModule",{value:!0});var _graph=require("./graph");Object.defineProperty(exports,"Graph",{enumerable:!0,get:function(){return _graph.Graph}}),exports.getParams=getParams,exports.getStore=getStore;var store=(require("./json2"),require("./store"))},{"./graph":3,"./json2":5,"./store":6}],5:[function(require,module,exports){"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol?"symbol":typeof obj};"object"!==("undefined"==typeof JSON?"undefined":_typeof(JSON))&&(JSON={}),function(){function f(n){return 10>n?"0"+n:n}function this_value(){return this.valueOf()}function quote(string){return rx_escapable.lastIndex=0,rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return"string"==typeof c?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,partial,mind=gap,value=holder[key];switch(value&&"object"===("undefined"==typeof value?"undefined":_typeof(value))&&"function"==typeof value.toJSON&&(value=value.toJSON(key)),"function"==typeof rep&&(value=rep.call(holder,key,value)),"undefined"==typeof value?"undefined":_typeof(value)){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value)return"null";if(gap+=indent,partial=[],"[object Array]"===Object.prototype.toString.apply(value)){for(length=value.length,i=0;length>i;i+=1)partial[i]=str(i,value)||"null";return v=0===partial.length?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]",gap=mind,v}if(rep&&"object"===("undefined"==typeof rep?"undefined":_typeof(rep)))for(length=rep.length,i=0;length>i;i+=1)"string"==typeof rep[i]&&(k=rep[i],v=str(k,value),v&&partial.push(quote(k)+(gap?": ":":")+v));else for(k in value)Object.prototype.hasOwnProperty.call(value,k)&&(v=str(k,value),v&&partial.push(quote(k)+(gap?": ":":")+v));return v=0===partial.length?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}",gap=mind,v}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(value,replacer,space){var i;if(gap="",indent="","number"==typeof space)for(i=0;space>i;i+=1)indent+=" ";else"string"==typeof space&&(indent=space);if(rep=replacer,replacer&&"function"!=typeof replacer&&("object"!==("undefined"==typeof replacer?"undefined":_typeof(replacer))||"number"!=typeof replacer.length))throw new Error("JSON.stringify");return str("",{"":value})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(holder,key){var k,v,value=holder[key];if(value&&"object"===("undefined"==typeof value?"undefined":_typeof(value)))for(k in value)Object.prototype.hasOwnProperty.call(value,k)&&(v=walk(value,k),void 0!==v?value[k]=v:delete value[k]);return reviver.call(holder,key,value)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()},{}],6:[function(require,module,exports){(function(global){"use strict";module.exports=function(){function isLocalStorageNameSupported(){try{return localStorageName in win&&win[localStorageName]}catch(err){return!1}}var storage,store={},win="undefined"!=typeof window?window:global,doc=win.document,localStorageName="localStorage",scriptTag="script";if(store.disabled=!1,store.version="1.3.20",store.set=function(key,value){},store.get=function(key,defaultVal){},store.has=function(key){return void 0!==store.get(key)},store.remove=function(key){},store.clear=function(){},store.transact=function(key,defaultVal,transactionFn){null==transactionFn&&(transactionFn=defaultVal,defaultVal=null),null==defaultVal&&(defaultVal={});var val=store.get(key,defaultVal);transactionFn(val),store.set(key,val)},store.getAll=function(){var ret={};return store.forEach(function(key,val){ret[key]=val}),ret},store.forEach=function(){},store.serialize=function(value){return JSON.stringify(value)},store.deserialize=function(value){if("string"==typeof value)try{return JSON.parse(value)}catch(e){return value||void 0}},isLocalStorageNameSupported())storage=win[localStorageName],store.set=function(key,val){return void 0===val?store.remove(key):(storage.setItem(key,store.serialize(val)),val)},store.get=function(key,defaultVal){var val=store.deserialize(storage.getItem(key));return void 0===val?defaultVal:val},store.remove=function(key){storage.removeItem(key)},store.clear=function(){storage.clear()},store.forEach=function(callback){for(var i=0;i<storage.length;i++){var key=storage.key(i);callback(key,store.get(key))}};else if(doc&&doc.documentElement.addBehavior){var storageOwner,storageContainer;try{storageContainer=new ActiveXObject("htmlfile"),storageContainer.open(),storageContainer.write("<"+scriptTag+">document.w=window</"+scriptTag+'><iframe src="/favicon.ico"></iframe>'),storageContainer.close(),storageOwner=storageContainer.w.frames[0].document,storage=storageOwner.createElement("div")}catch(e){storage=doc.createElement("div"),storageOwner=doc.body}var withIEStorage=function(storeFunction){return function(){var args=Array.prototype.slice.call(arguments,0);args.unshift(storage),storageOwner.appendChild(storage),storage.addBehavior("#default#userData"),storage.load(localStorageName);var result=storeFunction.apply(store,args);return storageOwner.removeChild(storage),result}},forbiddenCharsRegex=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),ieKeyFix=function(key){return key.replace(/^d/,"___$&").replace(forbiddenCharsRegex,"___")};store.set=withIEStorage(function(storage,key,val){return key=ieKeyFix(key),void 0===val?store.remove(key):(storage.setAttribute(key,store.serialize(val)),storage.save(localStorageName),val)}),store.get=withIEStorage(function(storage,key,defaultVal){key=ieKeyFix(key);var val=store.deserialize(storage.getAttribute(key));return void 0===val?defaultVal:val}),store.remove=withIEStorage(function(storage,key){key=ieKeyFix(key),storage.removeAttribute(key),storage.save(localStorageName)}),store.clear=withIEStorage(function(storage){var attributes=storage.XMLDocument.documentElement.attributes;storage.load(localStorageName);for(var i=attributes.length-1;i>=0;i--)storage.removeAttribute(attributes[i].name);storage.save(localStorageName)}),store.forEach=withIEStorage(function(storage,callback){for(var attr,attributes=storage.XMLDocument.documentElement.attributes,i=0;attr=attributes[i];++i)callback(attr.name,store.deserialize(storage.getAttribute(attr.name)))})}try{var testKey="__storejs__";store.set(testKey,testKey),store.get(testKey)!=testKey&&(store.disabled=!0),store.remove(testKey)}catch(e){store.disabled=!0}return store.enabled=!store.disabled,store}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);