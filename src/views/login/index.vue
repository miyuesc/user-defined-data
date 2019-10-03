<template>
  <div class="login-page">
    <form class="login-form" ref="loginForm">
      <label class="form-input__label">
        账号：
        <input class="form-input__content" type="text" v-model="username" />
      </label>
      <label class="form-input__label">
        密码：
        <input
          class="form-input__content"
          type="password"
          v-model="password"
          @keyup.enter.native="doLogin()"
        />
      </label>
      <button
        :class="isLoading ? 'do-login' : 'login-button'"
        @click="doLogin()"
      ></button>
    </form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  username: string = "";
  password: string = "";
  isLoading: boolean = false;

  doLogin() {
    if (this.username && this.password) {
      alert("登陆成功！");
    }
    this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 3000);
    // if (!this.username) {
    //   alert("账号不能为空！");
    //   return;
    // }
    // if (!this.password) {
    //   alert("密码不能为空！");
    //   return;
    // }
  }
}
</script>

<style scoped lang="less">
.login-page {
  width: 480px;
  height: 320px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .form-input__label {
      color: #ffffff;
      font-family: "PingFang SC0", "Microsoft YaHei UI", sans-serif;
      line-height: 38px;
      font-size: 24px;
      padding: 12px 0;
      height: 38px;
      #text {
        height: 38px;
      }
      .form-input__content {
        border: none;
        width: calc(100% - 100px);
        height: 36px;
        border-radius: 4px;
        font-size: 20px;
        padding: 0 6px;
      }
    }
    .login-button {
      width: 100px;
      height: 60px;
      padding: 12px;
      margin-left: calc(50% - 50px);
      margin-top: 24px;
      /*transform: translateX(-50%);*/
      background: cornflowerblue;
      border-radius: 4px;
      border: none;
      color: #ffffff;
      font-size: 24px;
      box-shadow: 0 0 8px #5364ed;
      transition: ease-in-out 0.36s;
      &::before {
        content: "Sign in";
      }
    }
    .do-login {
      width: 60px;
      height: 60px;
      padding: 12px;
      margin-top: 24px;
      margin-left: calc(50% - 30px);
      border-radius: 50%;
      border: none;
      color: #ffffff;
      font-size: 24px;
      background: cornflowerblue;
      transition: ease-in-out 0.36s;
      animation: rotate 0.5s infinite linear;
      position: relative;
      &:before {
        content: "";
        width: 12px;
        height: 12px;
        background: white;
        position: absolute;
        top: 10px;
        left: 10px;
        border-radius: 50%;
        box-shadow: -6px 16px 0 -2px #ffffff, 3px 32px 0 -4px #ffffff,
          20px 34px 0 -6px #ffff;
      }
    }
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
