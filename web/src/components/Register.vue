<template>
  <div id="login" class="wrap">
    <div class="container">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" >
        <h1 class="title">REGISTER</h1>
        <el-form-item style="width:100%;">
          <el-select v-model="userIdentity" placeholder="学生/教师" style="width: 45%;">
            <el-option value="学生"></el-option>
            <el-option value="教师"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
        <el-col :span="12">
        <el-form-item prop="account">
          <el-input style="width:90%;"
            type="username"
            v-model="ruleForm2.account"
            auto-complete="off"
            placeholder="请输入您的工号"
            @change="changeAccount"
            @keyup.enter.native='handleReg'
            clearable>
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item prop="fullName">
          <el-input style="width:90%;"
            v-model="ruleForm2.fullName"
            auto-complete="off"
            placeholder="请输入您的姓名"
            @change="changeAccount"
            @keyup.enter.native='handleReg'
            clearable>
          </el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item prop="checkPass">
          <el-input style="width:90%;"
            type="password"
            v-model="ruleForm2.checkPass"
            :maxlength='16'
            auto-complete="off"
            placeholder="请输入您的密码"
            @keyup.enter.native='handleReg'
            ref = "password"
            show-password>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item prop="checkPass2">
          <el-input style="width:90%;"
            type="password"
            v-model="ruleForm2.checkPass2"
            :maxlength='16'
            auto-complete="off"
            placeholder="请重复您的密码"
            @keyup.enter.native='handleReg'
            show-password>
          </el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="userIdentity!='教师'" style="width:100%;">
          <el-radio v-model="ruleForm2.degree" label="0"  style="margin-right: 295px">学硕</el-radio>
          <el-radio v-model="ruleForm2.degree" label="1">专硕</el-radio>
        </el-form-item>
        <el-row>
        <el-col :span="12">
        <el-form-item v-if="userIdentity!='教师'" key="k1" prop="tutor">
          <el-select v-model="ruleForm2.first" filterable placeholder="第一导师" style="width: 90%;margin-right: 30px">
            <el-option
              v-for="item in teachers"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item v-if="userIdentity!='教师'" key="k2" prop="tutor_2">
          <el-select v-model="ruleForm2.second" filterable placeholder="指导老师" style="width: 90%;">
            <el-option
              v-for="item in teachers_second"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item prop="email" key="k3" >
          <el-input style="width:90%;"
            v-model="ruleForm2.email"
            auto-complete="off"
            placeholder="请输入您的邮箱"
            @change="changeAccount"
            @keyup.enter.native='handleReg'
            clearable>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item prop="tel" key="k4">
          <el-input style="width:90%;"
            v-model="ruleForm2.tel"
            auto-complete="off"
            placeholder="请输入您的联系方式"
            @change="changeAccount"
            @keyup.enter.native='handleReg'
            clearable>
          </el-input>
        </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="direction" key="k5" >
              <el-input style="width:90%;"
                        v-model="ruleForm2.direction"
                        auto-complete="off"
                        placeholder="请输入您的研究方向"
                        @change="changeAccount"
                        @keyup.enter.native='handleReg'
                        clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="team" key="k6">
              <el-input style="width:90%;"
                        v-model="ruleForm2.team"
                        auto-complete="off"
                        placeholder="请输入您的工作组"
                        @change="changeAccount"
                        @keyup.enter.native='handleReg'
                        clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="title" v-if="userIdentity=='教师'" key="k7" >
              <el-select v-model="ruleForm2.title" placeholder="请选择您的职称" style="width:90%;">
                <el-option
                  v-for="item in titles"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="link" v-if="userIdentity=='教师'" key="k8">
              <el-input style="width:90%;"
                        v-model="ruleForm2.link"
                        auto-complete="off"
                        placeholder="请输入您的个人链接"
                        @change="changeAccount"
                        @keyup.enter.native='handleReg'
                        clearable>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="width:100%;">
          <el-button
            type="submit"
            style="width:20%;float: right;margin-right: 35px"
            @click.native.prevent="handleReg"
            :loading="logining">
            Register
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <p>cloud.hdu.edu.cn</p>
      <p>@云技术研究中心成果管理系统</p>
      <!-- <a href="cloud.hdu.edu.cn">cloud.hdu.edu.cn</a> -->
    </div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
  import {getCookie,delCookie,setCookie} from '../api/Cookie.js'
  import myapi from '../api/myapi.js'
  export default {
    inject:["reload"],
    name: 'reg',
    data () {
      var validateAccount = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入您的学号'));
        }else {
          var targ = /^[0-9]*$/;
          if(!targ.test(value)){
            callback(new Error('学号只支持数字'));
          }
          callback();
        }
      }
      var validateTutor = (rule,value, callback) =>{
          if (!this.ruleForm2.first){
            callback(new Error("请选择第一导师"));
          }
          else
            callback();
      }
      var validateTutor_2 = (rule,value, callback) =>{
        if (!this.ruleForm2.second){
          callback(new Error("请选择指导老师"));
        }
        else
          callback();
      }
      var repeatPasswor = (rule,value, callback) =>{
        if (!value) {
          callback(new Error('请再次输入您的密码'));
        }else {
            if (this.$refs.password.value != value)
              callback(new Error('两次输入密码不一致'));
            else
              callback();
          }
        }
      return {
        logining: false,//加载动画
        userIdentity:'',
        ruleForm2: {
          account: '',//用户名
          fullName:'', //姓名
          checkPass: '',//密码
          checkPass2: '', //重复密码
          email: '',
          first:'', //第一导师
          second:'', //第二导师
          degree:'0', //0为学硕，1为专硕
          team:'',
          tel:'',
          direction:'',
          title:'',
          link:''
        },
        teachers:[{
          value:'杨荣生',
          lable:'杨荣生'
        },{
          value:'孙李',
          lable:'孙李'
        }],
        teachers_second:[{
          value: -1,
          label: '无'
        }],
        titles:[{
          value:'教授',
          lable:'教授'
        },
          {
            value:'副教授',
            lable:'副教授'
          },
          {
            value:'讲师',
            lable:'讲师'
          }],
        teams:[{
          value:'数据组',
          lable:'数据组'
        },
          {
            value:'军工组',
            lable:'军工组'
          },
          {
            value:'并行组',
            lable:'并行组'
          }],
        rules2: {
          account: [{ validator: validateAccount, trigger: 'blur' }],
          fullName:[{required:true, message: '请输入姓名', trigger: 'blur'}],
          checkPass: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 16, required: true, message: '密码长度于6-16位之间', trigger: 'blur' },
          ],
          checkPass2: [
            {validator: repeatPasswor, trigger:'blur'}
          ],
          //email:[{required:true, message: '请输入邮箱', trigger: 'blur'}],
          //team:[{required:true, message: '请选择工作组', trigger: 'change'}],
          tutor:[{validator:validateTutor,trigger:'change'}],
          tutor_2:[{validator:validateTutor_2,trigger:'change'}],
          //tel:[{required:true, message: '请输入联系方式', trigger: 'blur'}],
          //direction:[{required:true, message: '请输入研究方向', trigger: 'blur'}],
          //title:[{required:true, message: '请输入职称', trigger: 'blur'}],
          //link:[{required:true, message: '请输入个人链接', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      let _this = this
      this.$ajax.get('/api/getTeacherName').then( res =>{
          // _this.teachers = []
          // _this.teachers.push({value:'1', label: '1'})
          _this.teachers = res.data
          //_this.teachers_second = _this.teachers_second.concat(_this.teachers)
          _this.teachers_second = _this.teachers
        }).catch( error => {
        _this.logining = false;
        // console.log(error)
        alert("获取导师姓名出错!")
      });
    },
    methods: {
      changeAccount () {
        // this.ruleForm2.checkPass = "";
      },
      //点击注册
      handleReg() {
        var _this = this;
        var user = "";
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            _this.logining = true;
            var loginParams = {username: this.ruleForm2.account, password: this.ruleForm2.checkPass,
                                name:this.ruleForm2.fullName,email:this.ruleForm2.email,
                                first:this.ruleForm2.first,second:this.ruleForm2.second,
                                degree:this.ruleForm2.degree,team:this.ruleForm2.team,
                                tel:this.ruleForm2.tel, title:this.ruleForm2.title,
                                direction:this.ruleForm2.direction,link:this.ruleForm2.link};
/*            console.log("------------------------");
            console.log(_this);
            console.log("------------------------");
            console.log(this);*/
            this.$ajax.post('/api/reg', loginParams).then( res => {
              //console.log(res);
              _this.logining = false;
              var type = res.data.type;
              if(res.data.errCode == 14){
                var userModel = {}
                var model ={}
                if(type == 0){
                  model = res.data.managerModel
                }else if(type == 1){
                  model = res.data.teacherModel
                  userModel.imgurl = model.imgurl
                  userModel.email = model.email
                  userModel.direction = model.direction
                  userModel.link = model.link
                  userModel.team = model.team
                  userModel.tel = model.tel
                  userModel.title = model.title
                }else if(type == 2){
                  model = res.data.studentModel
                  userModel.imgurl = model.imgurl
                  userModel.first = model.first
                  userModel.second = model.second
                  userModel.tel = model.tel
                  userModel.email = model.email
                  userModel.direction = model.direction
                  userModel.degree = model.degree
                  userModel.team = model.team
                }
                userModel.id = model.id
                userModel.name = model.name
                userModel.username = model.username
                userModel.password = model.password
                user = JSON.stringify(userModel);
                //console.log(user)
                setCookie('userInfo', user);
                setCookie('type', type);
                // console.log("document.cookie:" + document.cookie);
                sessionStorage.setItem("token",res.data.token);
                _this.$router.push({ path:'/system/index' });
              }else{
                _this.$message.error("学号已注册或不规范");
              }
            }).catch( error => {
              _this.logining = false;
              // console.log(error)
              alert("出错！请联系管理员")
            });
          }else {
            _this.logining = false;
            return false;
          }
        });
        // myapi.$emit("userInfo", user);
      }
    }
  }
</script>

<style>
  .el-radio__input.is-checked + .el-radio__label {
    color: #fd7624 !important;
  }
  .el-radio__input.is-checked .el-radio__inner {
    background: #fd7624 !important;
    border-color: #fd7624 !important;
  }
</style>

<style scoped>

body {
  font: 16px/20px microsft yahei;
}
.wrap {
  width: 100%;
  height: 100%;
  /*400px*/
  padding: 40px 0;
  position: fixed;
  /* top: 50%;
  margin-top: -337px; */
  opacity: 0.8;
  background: linear-gradient(to bottom right,#33ccff,#409eff);
  background: -webkit-linear-gradient(to bottom right,#33ccff,#0099ff);
}
.container {
  width: 700px;
  height: 100%;
  margin: 30px auto;
}
.container h1 {
  color: #FFFFFF;
  font-weight: 500;
  margin-bottom: 30px;
  /*font-weight: bold;*/
}
.container input {
  width: 100%;
  display: block;
  height: 36px;
  border: 0;
  outline: 0;
  padding: 6px 10px;
  line-height: 24px;
  margin: 10px auto;
  -webkit-transition: all 0s ease-in 0.1ms;
  -moz-transition: all 0s ease-in 0.1ms;
  transition: all 0s ease-in 0.1ms;
}
.container input[type="username"], .container input[type="password"]  {
  background-color: #FFFFFF;
  font-size: 16px;
  color: #50a3a2;
}
.container input[type='submit'] {
  font-size: 16px;
  letter-spacing: 2px;
  color: #666666;
  background-color: #FFFFFF;
}
.container input:focus {
  width: 320px;
}
.container input[type='submit']:hover {
  cursor: pointer;
  width: 325px;
}
.footer {
  width: 100%;
  color: #FFFFFF;
  font-size: 12px;
  position: fixed;
  bottom: 10px;
  text-align: center;
}
.footer p {
  margin: 0px 0px;
}
/*背景效果渲染部分*/
.wrap ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}
.wrap ul li {
  list-style-type: none;
  display: block;
  position: absolute;
  bottom: -120px;
  width: 15px;
  height: 15px;
  z-index: -8;
  background-color:rgba(255, 255, 255, 0.15);
  animotion: square 25s infinite;
  -webkit-animation: square 25s infinite;
}
.wrap ul li:nth-child(1) {
  left: 0;
  animation-duration: 10s;
  -moz-animation-duration: 10s;
  -o-animation-duration: 10s;
  -webkit-animation-duration: 10s;
}
.wrap ul li:nth-child(2) {
  width: 40px;
  height: 40px;
  left: 10%;
  animation-duration: 15s;
  -moz-animation-duration: 15s;
  -o-animation-duration: 15s;
  -webkit-animation-duration: 15s;
}
.wrap ul li:nth-child(3) {
  left: 20%;
  width: 25px;
  height: 25px;
  animation-duration: 12s;
  -moz-animation-duration: 12s;
  -o-animation-duration: 12s;
  -webkit-animation-duration: 12s;
}
.wrap ul li:nth-child(4) {
  width: 50px;
  height: 50px;
  left: 30%;
  -webkit-animation-delay: 3s;
  -moz-animation-delay: 3s;
  -o-animation-delay: 3s;
  animation-delay: 3s;
  animation-duration: 12s;
  -moz-animation-duration: 12s;
  -o-animation-duration: 12s;
  -webkit-animation-duration: 12s;
}
.wrap ul li:nth-child(5) {
  width: 60px;
  height: 60px;
  left: 40%;
  animation-duration: 10s;
  -moz-animation-duration: 10s;
  -o-animation-duration: 10s;
  -webkit-animation-duration: 10s;
}
.wrap ul li:nth-child(6) {
  width: 75px;
  height: 75px;
  left: 50%;
  -webkit-animation-delay: 7s;
  -moz-animation-delay: 7s;
  -o-animation-delay: 7s;
  animation-delay: 7s;
}
.wrap ul li:nth-child(7) {
  left: 60%;
  animation-duration: 8s;
  -moz-animation-duration: 8s;
  -o-animation-duration: 8s;
  -webkit-animation-duration: 8s;
}
.wrap ul li:nth-child(8) {
  width: 90px;
  height: 90px;
  left: 70%;
  -webkit-animation-delay: 4s;
  -moz-animation-delay: 4s;
  -o-animation-delay: 4s;
  animation-delay: 4s;
}
.wrap ul li:nth-child(9) {
  width: 100px;
  height: 100px;
  left: 80%;
  animation-duration: 20s;
  -moz-animation-duration: 20s;
  -o-animation-duration: 20s;
  -webkit-animation-duration: 20s;
}
.wrap ul li:nth-child(10) {
  width: 120px;
  height: 120px;
  left: 90%;
  -webkit-animation-delay: 6s;
  -moz-animation-delay: 6s;
  -o-animation-delay: 6s;
  animation-delay: 6s;
  animation-duration: 30s;
  -moz-animation-duration: 30s;
  -o-animation-duration: 30s;
  -webkit-animation-duration: 30s;
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }
  100% {
    bottom: 400px;
    transform: rotate(600deg);
    -webit-transform: rotate(600deg);
    -webkit-transform: translateY(-500);
    transform: translateY(-500)
  }
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }
  100% {
    bottom: 400px;
    transform: rotate(600deg);
    -webit-transform: rotate(600deg);
    -webkit-transform: translateY(-500);
    transform: translateY(-500)
  }
}
.el-radio__input.is-checked + .el-radio__label {
  color: #fd7624 !important;
}
.el-radio__input.is-checked .el-radio__inner {
  background: #fd7624 !important;
  border-color: #fd7624 !important;
}

</style>
