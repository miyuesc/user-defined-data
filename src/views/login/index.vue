<template>
  <div class="login-page">
    <div class="login-form" ref="loginForm">
      <div>
        UserName: <m-input v-model="username" type="text" clearable></m-input>
      </div>
      <div>
        Password: <m-input v-model="password" type="password"></m-input>
      </div>

      <m-form :model="user" :label-width="150">
        <m-form-item
          label="UserName:"
          prop="username"
          :rules="{
            required: true,
            message: 'Username can not be empty',
            trigger: 'blur'
          }"
        >
          <m-input v-model="user.username" type="text" clearable></m-input>
        </m-form-item>
      </m-form>

      <m-button
        style="margin-top: 16px"
        type="cool"
        size="big"
        round
        @click="doLogin"
        >Login in</m-button
      >
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
  username: string = "user1231";
  password: string = "";
  isLoading: boolean = false;
  user: { username?: string; password?: string } = {};

  doLogin() {
    console.log(this.username + "&&" + this.password);
    if (this.username && this.password) {
      this.isLoading = true;
      this.$router.push({ path: "/root" });
    }
  }

  testFn(str: string) {
    console.log(str);
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
    font-size: 24px;
    align-items: center;
  }
}
</style>
