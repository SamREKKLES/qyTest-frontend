
<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__welcome">欢迎进行注册</h2>
          <p class="brand-info__intro">请按照您的真实信息进行注册。</p>
        </div>

        <div class="login-main">
          <h3 class="login-title">请填写注册信息</h3>
          </br>
          <el-form :model="formData" :rules="ruleValidate" ref="formData" @keyup.enter.native="handleSubmit()" status-icon>

            <el-form-item prop="username">
              <el-input @blur="handleUserName()" v-model="formData.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="realname">
              <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
            </el-form-item>

              <el-form-item prop="gender">
                <el-radio-group v-model="formData.gender">
                  <el-radio label="0">男</el-radio>
                  <el-radio label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>

            <el-form-item prop="hospital">
              <el-input v-model="formData.hospital" placeholder="请输入所属医院"></el-input>
            </el-form-item>
            <el-form-item prop="department">
              <el-input v-model="formData.department" placeholder="请输入所属科室"></el-input>
            </el-form-item>
            <el-form-item prop="title">
              <el-input v-model="formData.title" placeholder="请输入职位"></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="password2">
              <el-input v-model="formData.password2" type="password" placeholder="请确认密码"></el-input>
            </el-form-item>

            <el-row>
                <el-col :span="20"><el-button class="login-btn-submit" type="success" @click="handleSubmit()">创建用户</el-button></el-col>
                <el-col :span="20"><el-button class="login-btn-submit" type="primary" @click="goPage('login')">返回登录界面</el-button></el-col>
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
</style>

<script>
    export default {
        name: "Register",
        data () {
            const pwdCheckValidate = (rule,value,callback)=>{
                if(value != this.formData.password){
                    this.formData.password2 = ''
                    return callback(new Error('两次密码不一致'));
                }else{
                    callback();
                }
            };
            return {
                formData: {
                    username: '',
                    password: '',
                    password2: '',
                    realname: '',
                    gender: '',
                    hospital: '',
                    department: '',
                    title: '',
                    userType: ''
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    realname: [
                        { required: true, message: '真实姓名不能为空', trigger: 'blur' }
                    ],
                    hospital: [
                        { required: true, message: '所属医院不能为空', trigger: 'blur' }
                    ],
                    department: [
                        { required: true, message: '所属科室不能为空', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '职位不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ],
                    password2: [
                        { required: true, trigger: 'blur', validator:pwdCheckValidate },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleUserName(){
                this.loading = true
                // const path2 = 'http://localhost:5000/api/usernameCheck'
                this.$api.user.usernameCheck(formData.username).then((response) => {
                    if (response.data.status === 'repeat') {
                        this.$message.error('用户名已存在')
                        this.formData.username = ''
                    }

                })
            },
            handleSubmit () {
                // const path = 'http://localhost:5000/api/register'
                if(this.formData.username ===''){
                    this.$message.error('用户名为空，请输入用户名!')
                }else if(this.formData.realname ===''){
                    this.$message.error('真实姓名为空，请输入真实姓名!')
                }else if(this.formData.hospital ===''){
                    this.$message.error('所属医院为空，请输入所属医院!')
                }else if(this.formData.department ===''){
                    this.$message.error('科室为空，请输入科室!')
                }else if(this.formData.title ===''){
                    this.$message.error('职位为空，请输入职位!')
                }else if(this.formData.password ===''){
                    this.$message.error('密码为空，请输入密码!')
                }
                else if(this.formData.password2 === ''){
                    this.$message.error('请输入确认密码!')
                }
                else{
                    this.$api.login.register({
                        username: this.formData.username,
                        password: this.formData.password,
                        realname: this.formData.realname,
                        gender: this.formData.gender,
                        hospital: this.formData.hospital,
                        department: this.formData.department,
                        title: this.formData.title,
                        userType: 2
                    }).then((response) => {
                        if (response.status === 'success') {
                            this.$alert('用户注册成功', '欢迎', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/login');
                                }
                            })
                        }
                        else {
                            this.$alert(response.data, '请重试', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push('/register');
                                }
                            })
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                }

            },
            goPage (pageName) {
                this.$router.push('/' + pageName)
            }

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
