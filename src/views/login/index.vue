<template>
  <div class="login-page">
    <form class="login-form" ref="loginForm">
      <m-input type="text" label="Username"></m-input>
      <m-input type="password" label="password"></m-input>
      <button
        :class="isLoading ? 'do-login' : 'login-button'"
        @click="doLogin()"
      ></button>
    </form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import MInput from "@/components/MInput.vue";
@Component({
  components: {MInput}
})
export default class Login extends Vue {
  username: string = "";
  password: string = "";
  isLoading: boolean = false;

  doLogin() {
    if (this.username && this.password) {
      this.isLoading = true;
      setTimeout(() => {
        this.$router.push({ path: "/home" });
        this.isLoading = false;
      }, 1800);
    }
    if (!this.username) {
      alert("账号不能为空！");
      return;
    }
    if (!this.password) {
      alert("密码不能为空！");
      return;
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
  width: 400px;
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
      height: 56px;
      text-align: left;
      .form-input__content {
        border: none;
        /*width: calc(100% - 100px);*/
        width: 100%;
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
      margin-top: 32px;
      /*transform: translateX(-50%);*/
      background: cornflowerblue;
      border-radius: 4px;
      border: none;
      color: #ffffff;
      font-size: 24px;
      box-shadow: 0 0 8px #5364ed;
      transition: ease-in-out 0.36s;
      &:focus {
        outline: none;
        content: none;
      }
      &::before {
        content: "Sign in";
      }
    }
    .do-login {
      width: 60px;
      height: 60px;
      padding: 12px;
      margin-top: 32px;
      margin-left: calc(50% - 30px);
      border-radius: 50%;
      border: none;
      color: #ffffff;
      font-size: 24px;
      background: cornflowerblue;
      transition: ease-in-out 0.36s;
      animation: rotate 0.5s infinite linear;
      position: relative;
      &:focus {
        outline: none;
      }
      &:before {
        content: "";
        width: 12px;
        height: 12px;
        background: white;
        position: absolute;
        top: 10px;
        left: 14px;
        border-radius: 50%;
        box-shadow: -8px 19px 0 -1px #ffffff, 6px 33px 0 -2px #ffffff,
          23px 30px 0 -3px #ffff, 29px 16px 0 -4px #ffffff;
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
