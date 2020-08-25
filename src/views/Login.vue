<template>
  <div class="login">
    <div class="w">
      <div class="login-header">
        <a href="javascript:;" @click="$router.push('/index')">
          <img src="/imgs/login-logo.png" alt="" />
        </a>
      </div>
    </div>
    <div class="banner">
      <div class="login-wrap w">
        <div class="login-box">
          <div class="form-change">
            <a
              href="javascript:;"
              :class="{ active: loginShow }"
              @click="loginShow = !loginShow"
              >账号登录</a
            >
            <span>|</span>
            <a
              href="javascript:;"
              :class="{ active: !loginShow }"
              @click="loginShow = !loginShow"
              >扫码登录</a
            >
          </div>
          <div class="login-form" v-show="loginShow">
            <input
              type="text"
              placeholder="邮箱/手机号码/小米ID"
              v-model="username"
            />
            <input
              type="password"
              placeholder="密码"
              v-model="password"
              @keyup.enter="login"
            />
            <button class="btn btn-huge" @click="login">登录</button>
            <div class="another">
              <span @click="register">手机或短信登录/注册</span>
              <span>
                <a href="javascript:;">立即注册</a> |
                <a href="javascript:;">忘记密码?</a></span
              >
            </div>
          </div>
          <div class="saomao" v-show="!loginShow">
            <img src="/imgs/download.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '@/components/NavFooter'
export default {
  name: 'login',
  components: {
    NavFooter
  },
  data() {
    return {
      loginShow: true,
      username: '',
      password: '',
      userId: ''
    }
  },
  methods: {
    async login() {
      const { username, password } = this
      const res = await this.$http.post('/user/login', {
        username,
        password
      })
      this.$message.success(res.msg)
      this.userId = res.data.id
      this.$cookie.set('userId', res.data.id, { expires: '1M' })
      this.$router.push('/index')
    },
    async register() {
      const { username, password } = this
      const res = await this.$http.post('/user/register', {
        username,
        password,
        email: '2415826929@qq.com'
      })
      this.$message.success(res.msg)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.login {
  .login-header {
    width: 100%;
    height: 113px;
  }
  .banner {
    width: 100%;
    height: 450px;
    background: url('/imgs/slider/slide-2.jpg') no-repeat center;
    background-size: 100%;
    .login-wrap {
      position: relative;
      .login-box {
        position: absolute;
        width: 350px;
        height: 380px;
        right: 0;
        top: 35px;
        background-color: $colorG;
        .form-change {
          @include flex(space-evenly);
          padding: 20px 0;
          font-size: 20px;
          a {
            color: $colorB;
          }
          .active {
            color: $colorA;
          }
        }
        .login-form {
          @include flex();
          flex-direction: column;
          input {
            outline: none;
            width: 300px;
            height: 48px;
            margin: 10px 0;
            padding-left: 10px;
            border: 1px solid $colorE;
          }
        }
        .another {
          @include flex();
          flex-direction: column;
          span:first-of-type {
            color: $colorA;
            margin: 10px 0 20px;
            font-size: 14px;
            cursor: pointer;
          }
          span:last-of-type {
            a {
              color: $colorL;
              &:hover {
                color: $colorA;
              }
            }
          }
        }
        .saomao {
          text-align: center;
          margin-top: 20px;
        }
      }
    }
  }
  .login-footer {
    text-align: center;
  }
}
</style>
