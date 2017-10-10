window.onload = function() {

	var squares = {
	    //二维数组
	 	structure: [
	 		[0,0,0],
	 		[0,0,0],
	 		[0,0,0]
	 	],
	 	container: document.querySelector('.squares'),
	 	startBtn: document.getElementById('on'),
	 	stopBtn: document.getElementById('off'),
	 	timer: null,
	 	init: function() {
	 		//  初始化九宫格
	 		var html = '';
	 		for(var row =0; row < this.structure.length; row++) {
	 			for(var col =0, len = this.structure[row].length; col < len; col++){
	 				var gridClassName= 'grid grid' + row + col;
	 				html += '<div class="'+ gridClassName +'"></div>';
	 			}
	 		}
	 		this.container.innerHTML = html;
	 	},
	 	getRandIndex: function() {
	 		// 获取任意单元格
	 		var randRow = Math.floor( Math.random() * 3 ) ;
	 		var randCol = Math.floor( Math.random() * 3 ) ;
	 		return '' + randRow + randCol;
	 	},
	 	getRandColor: function () {
	 		// 获取随机颜色
	 		var r = Math.floor( Math.random() * 256 ) ;
	 		var g = Math.floor( Math.random() * 256 ) ;
	 		var b = Math.floor( Math.random() * 256 ) ;

	 		return 'rgb('+ r + ',' + g + ',' + b + ')';
	 	},
	 	switchOn: function() {
	 		// 开始闪逻辑
	 		var twinkleIds = [];// 随机三个号
	 		var randColors = [];// 随机三个颜色

	 		for(var i = 0; i < 3; i++){
	 			var ranColor = this.getRandColor();
	 			randColors.push(ranColor);

	 			var randIndex = this.getRandIndex();

	 			function isExist(ele, index, arr) {
		 			return ele === randIndex;
		 		}

	 			while(twinkleIds.find(isExist)){
	 				randIndex = this.getRandIndex();
	 			}
	 			twinkleIds.push(randIndex);
	 		}

	 		this.switchOff();
	 		twinkleIds.forEach(function(ele, index, arr) {
	 			var dom = document.querySelector('.grid' + ele);
	 			dom.style.background = randColors[index];
	 		});
	 	},
	 	switchOff: function() {
	 		// 关闭闪逻辑
	 		this.init();
	 	},
	 	toggleClassName: function (dom) {
	 		// 开始、结束切换按钮样式
	 		if(dom.className.indexOf(' active') !== -1) {
	 			return;
	 		}
	 		dom.className += ' active';
	 		if(dom === this.startBtn) {
	 			this.stopBtn.className = this.stopBtn.className.split(' active')[0];
	 		}else{
	 			this.startBtn.className = this.startBtn.className.split(' active')[0];
	 		}
	 	},
	 	addEvent: function() {
	 		var that = this;
	 		this.startBtn.onclick = function() {
	 			if(that.timer) {
	 				return;
	 			}
	 			that.toggleClassName(this);
	 			that.timer = setInterval(function(){
	 				that.switchOn();
	 			}, 1000);
	 		};

	 		this.stopBtn.onclick = function() {
	 			that.toggleClassName(this);
		 		clearInterval(that.timer);
		 		that.timer = null;
		 		that.switchOff();
	 		}
	 	}
	};
	squares.init();
	squares.addEvent();

};