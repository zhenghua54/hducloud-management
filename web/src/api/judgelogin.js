import myapi from '@/api/myapi.js'
import {getCookie,delCookie,setCookie} from '@/api/Cookie.js'
export default {
  install (Vue, opt) {
    Vue.prototype.judgeLogin = function () {
      var _this = this
      var flag = false;
    //   console.log(_this.$userInfo)
    //   console.log(_this.$type)
    //   console.log(getCookie('userInfo'))
      if((this.$route.path != '/login' && this.$route.path != '/resume') && getCookie('userInfo') == "") {
        _this.$router.push({ path:'/login' });
        this.$message({ message: '用户信息已过期，请重新登录！', type: 'warning' });
      }else {
        flag = true;
      }
      return flag;
    }
  }
}
