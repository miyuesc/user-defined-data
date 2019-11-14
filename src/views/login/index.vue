<template>
  <div class="login-page">
    <div class="sign-in-container" :class="signInStatus ? 'hidden2' : 'show1'">
      <h2 class="container-title">Sign in</h2>
      <div class="login-icons">
        <i class="ri-github-fill"></i>
        <i class="ri-wechat-fill"></i>
        <i class="ri-qq-fill"></i>
      </div>
      <m-form :model="user" :label-width="100" :rules="formValidate">
        <m-form-item label="Username:" prop="username">
          <m-input v-model="user.username" type="text" clearable></m-input>
        </m-form-item>
        <m-form-item label="Password:" prop="password">
          <m-input v-model="user.password" type="password"></m-input>
        </m-form-item>
      </m-form>
      <p class="forget">Forgot your password?</p>
      <m-button style="margin-top: 16px" type="cool" size="small" round @click="doLogin">Sign in</m-button>
    </div>
    <div class="sign-up-container" :class="signInStatus ? 'show2' : 'hidden1'">
      <h2 class="container-title">Sign up</h2>
      <div class="login-icons">
        <i class="ri-github-fill"></i>
        <i class="ri-wechat-fill"></i>
        <i class="ri-qq-fill"></i>
      </div>
      <m-form :model="signUpForm" :label-width="100" :rules="formValidate">
        <m-form-item label="Username:" prop="username">
          <m-input v-model="signUpForm.username" type="text" clearable></m-input>
        </m-form-item>
        <m-form-item label="Password:" prop="password">
          <m-input v-model="signUpForm.password" type="password"></m-input>
        </m-form-item>
        <m-form-item label="Email:" prop="email">
          <m-input v-model="signUpForm.email" type="mail"></m-input>
        </m-form-item>
      </m-form>
      <m-button style="margin-top: 16px" type="cool" size="small" round @click="doSign">Sign up</m-button>
    </div>
    <div class="overlay-container" :style="{ left: signInStatus ? 0 : '50%' }">
      <div class="left-overplay" :class="signInStatus ? 'show1' : 'hidden2'">
        <p class="overplay-title">Welcome Back!</p>
        <p class="overplay-text">To keep connected with us please login with your personal info</p>
        <p class="change-button" :class="signInStatus ? 'show1' : 'hidden2'" @click="signInStatus = !signInStatus">
          sign in
        </p>
      </div>
      <div class="right-overplay" :class="signInStatus ? 'hidden1' : 'show2'">
        <p class="overplay-title">Hello, Friend!</p>
        <p class="overplay-text">Enter your personal details and start journey with us</p>
        <p class="change-button" :class="signInStatus ? 'hidden1' : 'show2'" @click="signInStatus = !signInStatus">
          sign up
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import { doSignIn, doSignUp } from "@/services";
@Component({
  // components: { MForm, MFormItem, MButton, MInput }
})
export default class Login extends Vue {
  signInStatus: boolean = false;
  user: { username?: string; password?: string } = {
    username: "admin",
    password: "admin"
  };
  signUpForm: { username?: string; password?: string; email?: string } = {};
  formValidate: any = {
    username: [
      {
        required: true,
        message: "The username cannot be empty",
        trigger: "blur"
      }
    ],
    password: [
      {
        required: true,
        message: "The password cannot be empty",
        trigger: "blur"
      }
    ]
  };

  doLogin() {
    if (this.user.username && this.user.password) {
      doSignIn(this.user.username, this.user.password).then((s: any) => {
        this.$router.push({ path: "/root" });
      });
    }
  }
  doSign() {
    if (this.signUpForm.username && this.signUpForm.password && this.signUpForm.email) {
      doSignUp(this.signUpForm.username, this.signUpForm.password, this.signUpForm.email).then((res: any) => {
        this.$router.push({ path: "/root" });
      });
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 768px;
  height: 480px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.1);
  .sign-in-container,
  .sign-up-container {
    width: 50%;
    position: absolute;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 24px;
    top: 0;
    bottom: 0;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 20px;
    .login-icons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 50%;
      height: 48px;
      margin-top: 24px;
      align-items: center;
      i {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid darkgrey;
        line-height: 36px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  /deep/ .m-form-item-label {
    font-family: pingfangSS, "Avenir", Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 16px;
  }
  /deep/ .m-form-item {
    height: 48px;
    margin-top: 26px;
  }
  /deep/ input {
    color: #000000 !important;
  }
  .sign-in-container {
    left: 0;
    .forget {
      line-height: 48px;
      font-size: 16px;
      text-align: right;
      width: 80%;
      color: darkgrey;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .sign-up-container {
    right: 0;
  }
  .container-title {
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-weight: 700;
  }
  .overlay-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: #fc2f70;
    color: #ffffff;
    z-index: 9;
    transition: all ease-in-out 0.6s;
  }
  .left-overplay,
  .right-overplay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 48px 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 24px;
    font-weight: 800;
    .change-button {
      display: block;
      width: 200px;
      height: 48px;
      border-radius: 24px;
      border: 1px solid #ffffff;
      line-height: 42px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .show1 {
    animation: show1 0.6s;
  }
  .show2 {
    animation: show2 0.6s;
  }
  .hidden1 {
    animation: hidden1 0.6s;
    color: rgba(1, 1, 1, 0);
  }
  .hidden2 {
    animation: hidden2 0.6s;
    color: rgba(1, 1, 1, 0);
  }
}
@keyframes show1 {
  0%,
  50% {
    opacity: 0;
    transform: translateX(20%);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes show2 {
  0%,
  50% {
    opacity: 0;
    transform: translateX(-20%);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes hidden1 {
  0%,
  50% {
    opacity: 1;
    transform: translateX(0);
    color: rgba(1, 1, 1, 0);
  }
  50%,
  100% {
    transform: translateX(-20%);
    opacity: 0;
    z-index: -1;
    display: none;
  }
}
@keyframes hidden2 {
  0%,
  50% {
    opacity: 1;
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(20%);
    opacity: 0;
    z-index: -1;
    display: none;
  }
}
</style>
