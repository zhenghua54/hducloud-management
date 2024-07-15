import Vue from 'vue';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import axios from 'axios';
import qs from 'qs';
import $ from 'jquery';
import 'element-ui/lib/theme-chalk/index.css';
import animate from 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
// import 'lib-flexible'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'
import Harvest from '@/api/harvest.js';
import Common from '@/api/common.js';
import JudgeLogin from '@/api/judgelogin.js';
import {getCookie,delCookie,setCookie} from './api/Cookie.js';
Vue.use(ElementUI);
import App from '@/App';
import router from '@/router';

Vue.use(animate);
Vue.use(Harvest);
Vue.use(Common);
Vue.use(JudgeLogin);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts ;
Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;

let bus = new Vue();
Vue.prototype.bus = bus;

axios.interceptors.request.use(
  config =>{
    let tk = sessionStorage.getItem("token")
    config.headers.common={'token':tk};
    return config;
  }
)

axios.interceptors.response.use(
  res =>{
    if (res.data.errCode == 16)
    {
      sessionStorage.clear();
      router.push({path:"/"});
      ElementUI.Message({message:"登录过期，请重新登录"});
    }
    else if (res.data.errCode == 17 || res.data.errCode == 18)
    {
      sessionStorage.clear();
      router.push({path:"/"});
      ElementUI.Message({message:"校验失败，请登录"});
    }
    return res;
  }

)

router.beforeEach((to, from, next) => {

  if(!Vue.prototype.$userInfo){

    var user = getCookie('userInfo');
    var type = getCookie('type');
    if(user&&user!="") Vue.prototype.$userInfo = JSON.parse(user);
    if(type&&type!=-1) Vue.prototype.$type = type;

    // 不可见
/*    console.log('before route:');
    console.log("userInfo: " + Vue.prototype.$userInfo);
    console.log("type: " + Vue.prototype.$type);*/
  }

  //用cookie生存时间到期清除cookie 代替 到主页就清除cookie的操作
  //只有“切换账户”的时候才主动清除
  if(to.path == '/login' || to.path == '/Register'){
    delete Vue.prototype.$userInfo;
    delete Vue.prototype.$type;
    delCookie('userInfo');
    delCookie('type');
  }

  // console.log(to.path);
  // url: /resume?username=18501
  // console.log(to.path.substring(0,7) === "/system");

  // if(to.path === "/login" || to.path.substring(0,7) === "/resume" || to.path.substring(0,7) === "/system")
  //   next({ path: '/' });
  if(to.path.substring(0,7) === "/system" && getCookie('userInfo') == "")
    next({ path: '/login' });
  else
    next();
})

router.afterEach(transition => {
// NProgress.done();
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
