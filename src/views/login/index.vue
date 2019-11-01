<template>
  <div class="login-page">
    <m-form :model="user" :label-width="80" :rules="formValidate">
      <m-form-item label="Username:" prop="username">
        <m-input v-model="user.username" type="text" clearable></m-input>
      </m-form-item>
      <m-form-item label="Password:" prop="password">
        <m-input v-model="user.password" type="password"></m-input>
      </m-form-item>
    </m-form>

    <m-button
      style="margin-top: 16px"
      type="cool"
      size="small"
      round
      @click="doLogin"
      >Login in</m-button
    >

    <div class="tip">
      <p>用户名：admin</p>
      <p>密码：admin</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import MInput from "@/components/Input/MInput.vue";
import MButton from "@/components/Button/MButton.vue";
import MFormItem from "@/components/FormItem/MFormItem.vue";
import MForm from "@/components/Form/MForm.vue";
@Component({
  components: { MForm, MFormItem, MButton, MInput }
})
export default class Login extends Vue {
  isLoading: boolean = false;
  user: { username?: string; password?: string } = {};
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
    if (this.user.username === "admin" && this.user.password === "admin") {
      this.isLoading = true;
      this.$router.push({ path: "/root" });
    } else {
      alert("用户名或者密码错误");
    }
  }
}
</script>

<style scoped lang="less">
.login-page {
  width: 320px;
  height: 320px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ffffff;
}
.tip {
  position: fixed;
  right: -100px;
  bottom: -100px;
  padding: 6px 12px;
  box-sizing: border-box;
  border-radius: 6px;
  text-align: right;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(252, 31, 107, 0.5);
}
</style>
