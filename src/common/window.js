import axios from 'axios';
import API from '../api';


window.GLOBALS = {
	get accessToken() {
		let _token = localStorage.getItem('ACCESS_TOKEN');
		return _token ? _token:'';
	},
	set accessToken(token) {
		token = token ? token:'';
		localStorage.setItem('ACCESS_TOKEN', token);
	},
	get txPic() {
		let _src = localStorage.getItem('txSrc');
		return _src ? _src:'';
	},
	//盈利榜里的头像
	set txPic(src) {
		src = src ? src:'';
		localStorage.setItem('txSrc', src);
	},
	version: '3.0.0.0',
	tabNumber: 0,
	//保存本站
	get saveStationUrl() {
		return this.curDomain + 'channel/newokooo/home/save_station.html';
	},
	// curDomain: 'http://10.33.85.160/',
	curDomain: '//wap.beeplay123.com/',
	// curDomain: 'https://www.jddfun.com/',
	// curDomain: 'https://www.jddfun.com/channel/newokooo/home',
	//登录跳转地址
	get loginUrl() {
		// return 'http://192.168.101.27:3003/#/login';
		return this.curDomain + 'payment/#/login';
	},
	get shopUrl() {
		// let url = 'http://192.168.101.241/wap/payment/';
		let url =  '../../../../payment/#/shopping';
		return url;
	},
	get channel() {
		 let _channel = this.getUrlParam('channel');
		//  this._channel = localStorage.getItem('aoke_CHANNEL');
		 if(!_channel) {
			 _channel = '100006'
		 }
		 localStorage.setItem('APP_CHANNEL', _channel);
		 // localStorage.setItem('aoke_CHANNEL', _channel);
		return _channel;
	},
	//获取地址栏问号后面的参数值
	getUrlParam: function(ename) {
		var url = window.location.href;
		var Request = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.split('?')[1];
			var strs = str.split("&");
			for(var i = 0;i<strs.length;i++) {
				Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}else {
			return '';
		}
		return Request[ename];
	},
	remainingTime(_this,millisecond,obj,fn) {
		var that = this;
		timer();
		var t = setInterval(timer, 1000);
		function timer() {
			if(millisecond <= 1) {
				_this.$set(obj, 'time', '');
				clearInterval(t);
				if(fn) {
					fn();
				}
				return;
			}
			var day=Math.floor(millisecond / (1000 * 60 * 60 * 24));
			var hour=Math.floor((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minute=that.Appendzero(Math.floor((millisecond % (1000 * 60 * 60)) / (1000 * 60)));
			var second=that.Appendzero(Math.floor((millisecond % (1000 * 60)) / 1000));
			var hours = that.Appendzero(day* 24 + hour);
			_this.$set(obj, 'time', hours+':'+minute+':'+second);
   			millisecond = millisecond - 1000;
		}
	},
	loopTime(_this,obj) {

		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		// var fixTime = 0;
		var fixTime = 24 * 60 * 60 * 1000;
		var fixMornTime = 13 * 60 * 60 * 1000;

		var nowTime = hours*60*60*1000 + minutes*60*1000 + seconds* 1000;

		var lastTime = 0;


		// if(hours < 21 && hours >= 13) {
		// 	fixTime = fixAfternoonTime;
		// }else {
		// 	fixTime = fixMornTime;
		// }

		if(fixTime > nowTime) {
			lastTime = fixTime - nowTime;
		}else {
			lastTime = fixTime - nowTime + 24 * 60 * 60 * 1000;
		}
		var that = this;
		timer();
		var t = setInterval(timer, 1000);
		function timer() {
			if(lastTime <= 1) {
				_this.$set(obj, 'time', '');
				clearInterval(t);
				that.loopTime(_this,obj);
			}
			var hour=that.Appendzero(Math.floor((lastTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
			var minute=that.Appendzero(Math.floor((lastTime % (1000 * 60 * 60)) / (1000 * 60)));
			var second=that.Appendzero(Math.floor((lastTime % (1000 * 60)) / 1000));
			_this.$set(obj, 'time', hour+':'+minute+':'+second);
   			lastTime = lastTime - 1000;

		}
	},
	Appendzero(obj) {
		if(obj<10) return "0" +""+ obj;
	    else return obj;
	},
	buryingPoint(id) {
		axios.post(API.behaviorRecord,{
			behaviorEventId: id
		})
	}
}


// 与游戏对接方法
window.WapCall = {
	openGame(id) {
      var game = this.getGameType(id);
      game && (location.href = '../../' + game+'?channel=100006&token='+GLOBALS.accessToken);
    },
    getGameType(id) {
      var game = '';
      if(typeof(id) == 'string') id = parseInt(id);
      switch (id) {
        case 1: game = 'dart'; break;
        case 2: game = 'billiards'; break;
        case 3: game = 'ring'; break;
        case 4: game = 'legion'; break;
        case 5: game = 'samguk'; break;
        case 7: game = 'football'; break;
        case 8: game = 'moto'; break;
        case 9: game = 'kingdom'; break;
        case 10: game = 'fish'; break;
      }
      return game;
    }
}
