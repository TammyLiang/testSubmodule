export default {
	checkValidate: function (type, text) {
          switch (type) {
            case 'pswd': return this.checkFormat(/^(\w){6,16}$/.test(text), '密码格式不正确');
            case 'code': return this.checkFormat(/^[A-Za-z0-9]{6}$/.test(text), '验证码不正确');
            case 'phone': return this.checkFormat(/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(text), '手机号码格式不正确');
            case 'name': {
              var len = 0;
              for(var i in text) {
                if(/[^\x00-\xff]/.test(text[i])) len += 2;
                else len++;
              }
              if(len < 4 || len > 16) {
                return "昵称长度为4-16个字符";
              }
              return this.checkFormat(/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/.test(text), '昵称格式不正确');
            }
          }
      },
      checkFormat : function(judge, info) {
          if(!judge) {
            console.log('12')
              return info;
          } else {
              return false
          }
      }
}
