<template>
  <div class="register">
    <div class="wrapper">
      <div class="logo"></div>
      <h2 class="title">注册小米账号</h2>
      <div class="register-box">
        <div class="register-item">
          <label>用户名</label>
          <input
            type="text"
            placeholder="请输入用户名"
            v-model="registerForm.username"
          />
        </div>
        <div class="register-item">
          <label>密码</label>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="registerForm.password"
          />
        </div>
        <div class="register-item">
          <label>邮箱</label>
          <input
            type="email"
            placeholder="请输入邮箱"
            v-model="registerForm.email"
            @keyup.enter="register"
          />
        </div>
        <button class="btn btn-huge" @click="register">立即注册</button>
      </div>
      <div class="info">
        已阅读并同意：小米 <strong>用户协议</strong>和 <strong>隐私政策</strong>
      </div>
    </div>
    <div class="register-footer">
      <p>
        简体| 繁体| English |常见问题
      </p>
      <p>
        小米公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    async register() {
      const res = await this.$http.post('/user/register', this.registerForm)
      console.log(res)
      if (res) {
        this.$message.success(res.msg)
        this.$router.push('/login')
      } else {
        this.$message.error('注册失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.register {
  background-color: #e0e0e0;
  height: 100vh;
  text-align: center;
  .wrapper {
    width: 854px;
    margin: auto;
    text-align: center;
    background-color: #ffffff;
    .logo {
      margin-top: 10px;
      @include bgImg(50px, 50px, '/imgs/mi-logo.png');
      background-color: $colorA;
    }
    .title {
      font-size: 30px;
      font-weight: normal;
    }
    .register-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      .register-item {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 15px 0;
        label {
          color: #333;
          font-size: 14px;
          margin-bottom: 5px;
        }
        input {
          width: 300px;
          height: 45px;
          padding-left: 10px;
          outline: none;
          border: 1px solid $colorE;
        }
      }
      .btn {
        margin: 20px 0;
      }
    }
    .info {
      padding: 30px 0;
    }
  }
  .register-footer {
    margin-top: 20px;
    p {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>
