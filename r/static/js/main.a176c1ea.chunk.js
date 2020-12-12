(this.webpackJsonptank_game=this.webpackJsonptank_game||[]).push([[0],{13:function(t,e,n){t.exports=n(24)},24:function(t,e,n){"use strict";n.r(e);var i=n(0),s=n(1),a=n(2),o=new(function(){function t(){Object(s.a)(this,t),this.listenerMap=new Map}return Object(a.a)(t,[{key:"listen",value:function(t,e){var n=this.listenerMap.get(t);n||(n=[],this.listenerMap.set(t,n)),n.push(e)}},{key:"unListen",value:function(t,e){var n=this.listenerMap.get(t);if(n){var i=n.indexOf(e);i<0||(n[i]=null)}}},{key:"send",value:function(t,e){var n=this.listenerMap.get(t)||[];for(var i in n)n[i]&&n[i](e)}}]),t}()),r=new(function(){function t(){Object(s.a)(this,t)}return Object(a.a)(t,[{key:"init",value:function(){document.body.addEventListener("keydown",(function(t){37===t.keyCode?o.send("user.key_left"):38===t.keyCode?o.send("user.key_up"):39===t.keyCode?o.send("user.key_right"):40===t.keyCode?o.send("user.key_down"):32===t.keyCode&&o.send("user.key_space")}))}}]),t}());r.init();var h={UNINIT:0,INIT:1,LOADED:2,PLAYING:3,GAME_OVER:4},u=function(){function t(){Object(s.a)(this,t),this.status=h.UNINIT}return Object(a.a)(t,[{key:"updateStatus",value:function(t){if(t===h.INIT){if(this.status!==h.UNINIT)throw new Error("Game status wrong, do not init again.");this.status=h.INIT}else if(t===h.LOADED){if(this.status!==h.INIT)throw new Error("Game status wrong, do not load again.")}else if(t===h.PLAYING){if(this.status!==h.LOADED&&this.status!==h.GAME_OVER)throw new Error("Game status wrong, do not start when init or playing.");this.playContainer.visible=!0}else{if(t!==h.GAME_OVER)throw new Error("Wrong game status");if(this.status!==h.PLAYING)throw new Error("Game status wrong, should from playing.");this.playContainer.visible=!1}var e=this.status;this.status=t,o.send("game.statusChange",{old:e,new:t}),t===h.LOADED&&o.send("game.statusChange.loaded")}},{key:"init",value:function(t){var e=this;this.pixiApp=t,this.loaderTmp&&this.loaderTmp.forEach((function(e){return t.loader.add(e)})),this.playContainer=new i.Container,this.playContainer.visible=!1,t.stage.addChild(this.playContainer),this.updateStatus(h.INIT),this.pixiApp.loader.load((function(){setTimeout((function(){return e.onResLoaded()}),1e3),window.__DEBUG&&(window.g=l,window.msgBus=o,window.PIXI=i)})),o.listen("start_screen.start",(function(){return e.updateStatus(h.PLAYING)})),o.listen("tank.gameover",(function(){return e.updateStatus(h.GAME_OVER)})),o.listen("gameover_screen.restart",(function(){return e.updateStatus(h.PLAYING)})),this.pixiApp.ticker.start()}},{key:"onResLoaded",value:function(){this.updateStatus(h.LOADED)}},{key:"addToLoader",value:function(t){if(this.status!==h.UNINIT)throw new Error("Cannot add to loader after init");this.pixiApp?this.pixiApp.loader.add(t):(this.loaderTmp||(this.loaderTmp=[]),this.loaderTmp.push(t))}},{key:"getStage",value:function(){return this.pixiApp.stage}},{key:"getPlayContainer",value:function(){return this.playContainer}},{key:"getTicker",value:function(){return this.pixiApp.ticker}},{key:"getWidth",value:function(){return window.innerWidth}},{key:"getHeight",value:function(){return window.innerHeight}}]),t}();u.STATUS=h,u.CAMP={WE:0,ENEMY:1};var l=new u;u.getInstance=function(){return l};var d=u,c=d.getInstance(),p="Loading/\u52a0\u8f7d\u4e2d",f=new i.Text(p,{fontFamily:"Arial",fontSize:64,fill:16715792,align:"center"}),g=-1;o.listen("game.statusChange",(function t(e){e.new===d.STATUS.INIT?function(t){t.addChild(f),f.anchor.set(.5),f.x=Math.floor(c.getWidth()/2),f.y=Math.floor(c.getHeight()/2);var e=0;g=setInterval((function(){e=++e>3?0:e;for(var t="",n=0;n<e;n++)t+=".";f.text=p+t}),200)}(c.getStage()):e.new===d.STATUS.LOADED&&(c.getStage().removeChild(f),clearInterval(g),o.unListen("game.statusChange",t))}));var v=d.getInstance(),y=new i.Text("Start Game/\u5f00\u59cb\u6e38\u620f",{fontFamily:"Arial",fontSize:64,fill:207,align:"center"});function w(){v.status===d.STATUS.LOADED&&o.send("start_screen.start")}var T=!0;o.listen("game.statusChange",(function(t){var e;t.new===d.STATUS.LOADED?(e=v.getStage(),T&&(e.addChild(y),y.anchor.set(.5),y.x=Math.floor(v.getWidth()/2),y.y=Math.floor(v.getHeight()/2),y.interactive=!0,y.buttonMode=!0,T=!1),y.visible=!0,y.on("click",w),o.listen("user.key_space",w)):t.new===d.STATUS.PLAYING&&(y.visible=!1)}));var k=d.getInstance(),A=new i.Text("GAME OVER!/\u6e38\u620f\u7ed3\u675f\uff01",{fontFamily:"Arial",fontSize:64,fill:16715792,align:"center"}),x=new i.Text("Restart/\u91cd\u65b0\u5f00\u59cb\uff1f",{fontFamily:"Arial",fontSize:48,fill:207,align:"center"});function m(){k.status===d.STATUS.GAME_OVER&&(A.visible=!1,x.visible=!1,o.send("gameover_screen.restart"))}var S=!0;o.listen("game.statusChange",(function(t){var e;t.new===d.STATUS.GAME_OVER&&(e=k.getStage(),S&&(e.addChild(A),A.anchor.set(.5),A.x=Math.floor(k.getWidth()/2),A.y=Math.floor(k.getHeight()/4),e.addChild(x),x.anchor.set(.5),x.x=Math.floor(k.getWidth()/2),x.y=Math.floor(k.getHeight()/4*3),x.interactive=!0,x.buttonMode=!0,S=!1),A.visible=!0,x.visible=!0,x.on("click",m),o.listen("user.key_space",m))}));var C=n(8),I=d.getInstance(),M=function(){function t(e){var n=this;Object(s.a)(this,t),this.owner=e,e.camp===d.CAMP.ENEMY?this.sp=new i.Sprite(i.utils.TextureCache["assets/bullet2.png"]):this.sp=new i.Sprite(i.utils.TextureCache["assets/bullet.png"]),this.sp.anchor.set(.5),I.getPlayContainer().addChild(this.sp),I.getTicker().add((function(){return n.onTick()}))}return Object(a.a)(t,[{key:"reactive",value:function(t,e,n){if(this.sp.x=t.sp.x,this.sp.y=t.sp.y,this.sp.rotation=e,this.speed=n,this.sp.visible=!0,t.camp===d.CAMP.ENEMY?G.add(this):b.add(this),t.camp!==this.owner.camp)throw new Error("bullet can not change camp!");this.owner=t}},{key:"onTick",value:function(){if(this.sp.visible){var t=this.sp.rotation-Math.PI/2;this.sp.x+=this.speed*Math.cos(t),this.sp.y+=this.speed*Math.sin(t),(this.sp.x>I.getWidth()||this.sp.x<0)&&this.hide(),(this.sp.y>I.getHeight()||this.sp.y<0)&&this.hide()}}},{key:"hide",value:function(){this.sp.visible=!1,this.owner.camp===d.CAMP.ENEMY?(P.push(this),G.delete(this)):(E.push(this),b.delete(this))}}]),t}(),E=[],b=new Set;M.getMineOne=function(t,e,n){var i;return(i=E.length?E.pop():new M(t)).reactive(t,e,n),i};var P=[],G=new Set;M.getEnemyOne=function(t,e,n){var i;return(i=P.length?P.pop():new M(t)).reactive(t,e,n),i},M.getAllMine=function(){return Object(C.a)(b.values())},M.getAllEnemy=function(){return Object(C.a)(G.values())},I.addToLoader("assets/bullet.png"),I.addToLoader("assets/bullet2.png");var L=M;function O(t){var e=t.anchor.x*t.width,n=t.anchor.y*t.height;return{x1:-e,x2:t.width-e,y1:-n,y2:t.height-n}}function N(t){if(void 0===t.maxRadius){var e=O(t),n=Math.sqrt(e.x1*e.x1+e.y1*e.y1),i=Math.sqrt(e.x2*e.x2+e.y1*e.y1),s=Math.sqrt(e.x1*e.x1+e.y2*e.y2),a=Math.sqrt(e.x2*e.x2+e.y2*e.y2);t.maxRadius=Math.max(n,i,s,a)}return t.maxRadius}function _(t,e){var n=N(t)+N(e),i=n*n,s=t.x-e.x,a=t.y-e.y;return s*s+a*a<=i}function D(t,e){var n=O(e),i=e.toLocal(t);return i.x<=n.x2&&i.x>=n.x1&&i.y<=n.y2&&i.y>=n.y1}function U(t,e){for(var n in e){var s=e[n];if(_(t,s)&&D(new i.Point(s.x,s.y),t))return n}return-1}var R=function(t,e){if(e===t)return t;var n=1+(e>t?e-t:t-e);return Math.floor(Math.random()*n)+t},Y=d.getInstance(),W=function(){function t(){var e=this;Object(s.a)(this,t),this.camp=d.CAMP.ENEMY,this.sp=new i.Sprite(i.utils.TextureCache["assets/tank2.png"]),this.sp.anchor.set(.5),this.sp.rotation=Math.PI,Y.getPlayContainer().addChild(this.sp),Y.getTicker().add((function(){return e.onTick()})),this.tickCount=0,this.randomInt=R(1,60)}return Object(a.a)(t,[{key:"reactive",value:function(){this.sp.x=Math.floor(Math.random()*Y.getWidth()),this.sp.y=0,this.sp.rotation=Math.random()*Math.PI/2+Math.PI/4*3,this.sp.visible=!0,j.push(this)}},{key:"moveToIdleTankPool",value:function(){this.sp.visible=!1,H.add(this);var t=j.indexOf(this);j.splice(t,1)}},{key:"onTick",value:function(){this.sp.visible&&(this.sp.y-=Math.cos(this.sp.rotation)*t.speed,this.sp.x+=Math.sin(this.sp.rotation)*t.speed,(this.sp.y>Y.getHeight()||this.sp.x<0||this.sp.x>Y.getWidth())&&this.moveToIdleTankPool(),this.tickCount++,this.tickCount>1e6&&(this.tickCount=0),this.tickCount%240===this.randomInt&&this.fire())}},{key:"fire",value:function(){Y.status===d.STATUS.PLAYING&&L.getEnemyOne(this,this.sp.rotation,t.bulletSpeed)}},{key:"crash",value:function(){this.moveToIdleTankPool()}}]),t}();W.speed=1,W.bulletSpeed=2;var H=new Set,j=[];function V(){var t;H.size?(t=H.values().next().value,H.delete(t)):t=new W,t.reactive(),function(t){var e=Math.floor(1500*Math.random())+2500;Y.status===d.STATUS.PLAYING&&setTimeout(t,e)}(V)}o.listen("game.statusChange",(function(t){t.new===d.STATUS.PLAYING&&V()})),W.getActiveTanks=function(){return j},Y.addToLoader("assets/tank2.png");var z,F=W,B=d.getInstance();function q(){z&&(z.visible=!1)}function J(t){console.log(t),z&&(z.x=t.x,z.y=t.y,z.visible=!0,setTimeout(q,200))}B.addToLoader("assets/explode.png"),o.listen("game.statusChange.loaded",(function(){(z=new i.Sprite(i.utils.TextureCache["assets/explode.png"])).visible=!1,B.getStage().addChild(z)}));var X=d.getInstance(),$={LOADING:0,READY:1},K=function(){function t(){var e=this;Object(s.a)(this,t),this.camp=d.CAMP.WE,o.listen("user.key_left",(function(){return e.onLeft()})),o.listen("user.key_up",(function(){return e.onUp()})),o.listen("user.key_down",(function(){return e.onDown()})),o.listen("user.key_right",(function(){return e.onRight()})),o.listen("user.key_space",(function(){return e.fire()})),this.loadStatus=$.READY;var n=this;this.loadReady=function(){n.loadStatus=$.READY}}return Object(a.a)(t,[{key:"onGameStart",value:function(){var t=this;this.sp||(this.sp=new i.Sprite(i.utils.TextureCache["assets/tank1.png"]),this.sp.anchor.set(.5),X.getPlayContainer().addChild(this.sp),X.getTicker().add((function(){return t.onTick()}))),this.sp.x=Math.floor(X.getWidth()/2),this.sp.y=Math.floor(X.getHeight()-100),this.sp.rotation=0,this.hp=3,this.sp.visible=!0,o.send("tank.hpChange",this.hp)}},{key:"changeHp",value:function(t){return this.hp-=t,o.send("tank.hpChange",this.hp),this.hp<=0&&(J(this.sp),o.send("tank.gameover"),!0)}},{key:"onTick",value:function(){if(X.status===d.STATUS.PLAYING){var t=F.getActiveTanks(),e=t.map((function(t){return t.sp})),n=function(t,e){var n=O(t),s=t.toGlobal(new i.Point(n.x1,n.y1)),a=t.toGlobal(new i.Point(n.x2,n.y1)),o=t.toGlobal(new i.Point(n.x1,n.y2)),r=t.toGlobal(new i.Point(n.x2,n.y2));for(var h in e){var u=e[h];if(_(t,u)){if(D(s,u))return h;if(D(a,u))return h;if(D(o,u))return h;if(D(r,u))return h}}return-1}(this.sp,e);if(n>=0&&(J(e[n]),t[n].crash(),this.changeHp(3)))return;var s=L.getAllEnemy(),a=s.map((function(t){return t.sp})),r=U(this.sp,a);if(r>=0&&(s[r].hide(),this.changeHp(1)))return;var h=L.getAllMine(),u=h.map((function(t){return t.sp}));t.forEach((function(t){var e=U(t.sp,u);e>=0&&(h[e].hide(),J(t.sp),t.crash(),o.send("score.add",1))}))}}},{key:"onLeft",value:function(){this.sp.x-=t.speed,this.sp.rotation=-Math.PI/2,this.sp.x<0&&(this.sp.x=0)}},{key:"onRight",value:function(){this.sp.x+=t.speed,this.sp.rotation=Math.PI/2;var e=X.getWidth();this.sp.x>e&&(this.sp.x=e)}},{key:"onUp",value:function(){this.sp.y-=t.speed,this.sp.rotation=0,this.sp.y<0&&(this.sp.y=0)}},{key:"onDown",value:function(){this.sp.y+=t.speed,this.sp.rotation=Math.PI;var e=X.getHeight();this.sp.y>e&&(this.sp.y=e)}},{key:"fire",value:function(){X.status===d.STATUS.PLAYING&&this.loadStatus===$.READY&&(L.getMineOne(this,this.sp.rotation,t.bulletSpeed),this.loadStatus=$.LOADING,setTimeout(this.loadReady,t.loadColdDown))}}]),t}();K.speed=10,K.bulletSpeed=20,K.loadColdDown=500;var Q=null;K.getInstance=function(){return Q||(Q=new K,window.__DEBUG&&(window.mt=Q)),Q},o.listen("game.statusChange",(function(t){t.new===d.STATUS.PLAYING&&K.getInstance().onGameStart()})),X.addToLoader("assets/tank1.png");var Z=d.getInstance(),tt=new i.Text("HP/\u88c5\u7532: ",{fontFamily:"Arial",fontSize:28,fill:36608,align:"left"}),et=new i.Container,nt=new i.Container;nt.addChild(tt),nt.addChild(et);var it=!0;var st=[];o.listen("game.statusChange",(function(t){t.new===d.STATUS.GAME_OVER?nt.visible=!1:t.new===d.STATUS.PLAYING&&(it&&(Z.getStage().addChild(nt),nt.y=Z.getHeight()-80,et.x=120,it=!1),nt.visible=!0)})),o.listen("tank.hpChange",(function(t){if(t>st.length)for(var e=st.length;e<t;e++){var n=new i.Sprite(i.utils.TextureCache["assets/tank1.png"]);n.scale.set(.5),n.alpha=.5,n.x=30*e,st.push(n),et.addChild(n)}for(var s=0;s<st.length;s++)st[s].visible=s<t}));var at=d.getInstance(),ot="Score/\u5f97\u5206: ",rt=new i.Text(ot,{fontFamily:"Arial",fontSize:28,fill:2237183,align:"center"}),ht=new i.Container;ht.addChild(rt);var ut=!0,lt=0;o.listen("game.statusChange",(function(t){t.new===d.STATUS.GAME_OVER||t.new===d.STATUS.PLAYING&&(ut&&(at.getStage().addChild(ht),ht.y=10,ht.x=100,ut=!1),lt=0,rt.text=ot+lt,ht.visible=!0)})),o.listen("score.add",(function(t){lt+=t,rt.text=ot+lt}));var dt=new i.Application({resizeTo:window});d.getInstance().init(dt);var ct=dt;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));window.__DEBUG=!0,document.body.appendChild(ct.view),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[13,1,2]]]);
//# sourceMappingURL=main.a176c1ea.chunk.js.map