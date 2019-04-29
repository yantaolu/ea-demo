<template>
  <div class="login-page">
    <div class="container">
      <div class="form-warp">
        <ea-row>
          <ea-col :span="8" :offset="16" class="form-content">
            <div class="title">登录</div>
            <ea-form :model="form" status-icon ref="loginForm" label-width="0px">
              <ea-form-item label=" " prop="username">
                <ea-input v-model.number="form.username" placeholder="请输入手机号码" auto-complete="off">
                  <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
                </ea-input>
              </ea-form-item>
              <ea-form-item label=" " prop="password">
                <ea-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码">
                  <i slot="prefix" class="el-input__icon el-icon-view"></i>
                </ea-input>
              </ea-form-item>
              <ea-form-item>
                <div class="text-right color-gray" style="text-align: right">忘记密码 ？</div>
              </ea-form-item>
              <ea-form-item>
                <ea-button type="primary" size="medium" @click="handleSubmit('form')" style="width:100%;" class="width-auto">登录</ea-button>
              </ea-form-item>
            </ea-form>
          </ea-col>
        </ea-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        client_id: 'webClient',
        client_secret: 'webSecret',
        grant_type: 'password',
        username: '18888888888',
        password: '123456'
      }
    }
  },
  methods: {
    handleSubmit () {
      sessionStorage.setItem('login', true)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.login-page {
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/login-bg.png');
  background-size: cover;
  background-position: center;
  position: absolute;

  .container {
    width: 1200px;
    margin: auto;
  }
}

.form-content {
  margin-top: 180px;
  margin-bottom: 40px;
  padding: 30px 30px 10px;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  .el-input__icon {
    font-size: 16px;
  }
}

.title {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}

.icon-close {
  display: inline-block;
  padding-top: 7px;
}

</style>
