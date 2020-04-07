<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__welcome">欢迎使用</h2>
          <h2 class="brand-info__text">缺血性卒中CTP影像辅助系统T4端</h2>
          <p class="brand-info__intro">本系统旨在为用户提供人工智能算法分析缺血性卒中CTP影像分析，提供一套辅助诊疗方案。</p>
        </div>

        <div class="login-main">
          <h3 class="login-title">用户登录</h3>
          </br>
          <el-form :model="formInline" :rules="ruleInline" ref="formInline" status-icon>

            <el-form-item prop="user">
              <el-input v-model="formInline.user" placeholder="帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="formInline.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item >
              <el-col :span="12">
                <el-form-item prop="captcha">
                  <el-input type="test" v-model="formInline.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新"
                    style="width: 100%;">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1">&nbsp;</el-col>
              <el-col :span="11">
                <el-form-item prop="src">
                    <img style="width: 100%;" class="pointer" :src="formInline.src" @click="refreshCaptcha">
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="12"><el-button class="login-btn-submit" type="success" @click="login()">登录</el-button></el-col>
                <el-col :span="12"><el-button class="login-btn-submit" type="primary" @click="goPage('register')">注册</el-button></el-col>
            </el-row>

          </el-form>


          <div class="layout-copy">
                2019-2020 &copy; ZJULAB205
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // const api = axios.create({
  //   headers: {
  //     // 'Content-Type': 'application/json',
  //     // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  //   }
  // })
  // import axios from 'axios'
  import Cookies from "js-cookie"
  export default {
        name: 'Login',
        data () {
            return {
                formInline: {
                    user: '',
                    password: '',
                    captcha: '',
                    src: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ],
                    captcha: [
                        {required: true, message: '请填写验证码', trigger: 'blur'},
                    ]
                },
                checked: true
            }
        },
        methods: {
            // handleSubmit () {
            //     this.$refs['formInline'].validate((valid) => {
            //         if (valid) {
            //             this.login()
            //         } else {
            //             this.$Message.error('表单验证失败!')
            //         }
            //     })
            // },
            login () {
              this.$refs.formInline.validate((valid) => {
                if (valid) {
                let userInfo = {username:this.formInline.user, 
                                password:this.formInline.password, 
                                captcha:this.formInline.captcha}
                  // const path = 'http://localhost:5000/api/login';
                this.$api.login.login(userInfo).then((response) => {
                    if (response.status === 'success') {
                      Cookies.set('token', response.data.token) // 放置token到Cookie
                      sessionStorage.setItem('user', userInfo.username) // 保存用户到本地会话
                      this.$router.push('/') // 登陆成功，跳转到主页
                    }
                    else if (response.status === 'fail') {
                      alert(response.data)
                      this.$router.go(0)
                    }
                    })
                  .catch(function (error) {
                    console.log(error)
                  })
                } else {
                  this.resetForm('formInline')
                }
                })
                },
            goPage (pageName) {
                this.$router.push('/' + pageName)
            },
            refreshCaptcha: function(){
              this.formInline.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
            },
            resetForm (formData) {
                this.$refs[formData].resetFields();
            }
        },
        mounted() {
          this.refreshCaptcha()
        }
    }
</script>

<style lang="scss">
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(38, 50, 56, .6);
    background-image: url(~@/assets/imgs/grass.jpg);
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(~@/assets/imgs/grass.jpg);
      background-size: cover;
    }
    .site-content__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: transparent;
    }
    .site-content {
      min-height: 100%;
      padding: 30px 500px 30px 30px;
    }
    .brand-info {
      margin: 100px 100px 0 90px;
      color: #303133;
    }
    .brand-info__welcome {
      margin:  0 0 22px 0;
      font-size: 50px;
      font-weight: 400;
      text-transform : uppercase;
    }
    .brand-info__text {
      margin:  0 0 22px 0;
      font-size: 30px;
      font-weight: 400;
      text-transform : uppercase;
    }
    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
    .login-main {
      position: absolute;
      top: 0;
      right: 0;
      padding: 200px 60px 180px;
      width: 470px;
      min-height: 100%;
      background-color: #fff;
    }
    .login-title {
      font-size: 16px;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 50%;
      margin-top: 10px;
    }
    .layout-copy{
        margin: 400px 0px 0px;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
  }
</style>
