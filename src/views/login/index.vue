<template>
  <div class="login">
    <h2>登录</h2>

  </div>
</template>

<script lang="ts" setup name="LoginPage">
  import router from '@/router';
  import { reactive, ref } from 'vue';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const formData = reactive({
    name: '',
    pwd: '',
  });
  const ruleForm = ref<any>(null);
  const submit = () => {
    ruleForm.value.validate().then(async ({ valid, errors }: any) => {
      if (valid) {
        const userInfo = await userStore.login();
        if (userInfo) {
          router.push({ path: '/home' });
        }
      } else {
        console.log('error submit!!', errors);
      }
    });
  };
</script>

<style scoped lang="scss">
  .login {
    padding: 20px;

    h2 {
      letter-spacing: 10px;
      text-align: center;
    }

    .nut-form-item {
      margin-bottom: 20px;
      border-radius: 20px;
      background: #f2f3f5;

      input {
        background: transparent;
      }
    }
  }
</style>
