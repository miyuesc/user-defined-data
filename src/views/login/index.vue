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
      size="big"
      round
      @click="doLogin"
      >Login in</m-button
    >
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
    if (this.user.username && this.user.password) {
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
</style>
