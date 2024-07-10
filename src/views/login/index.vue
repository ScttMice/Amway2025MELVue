<template>
  <div class="login home text-center">
    <header class="header" style="width: 100%; text-align: center">
      <img alt="" src="@/assets/logo.png" />
    </header>
    <strong class="title1">澳大利亚签证办理</strong>
    <p class="title2">安利2025墨尔本专案</p>
    <van-form @submit="onSubmit">
      <div class=" mg-r-l-16 text-left">
        <label class="mg-b16" style="display: inline-block;">手机号码</label>
        <van-field class="border-bottom1" style="padding:0 0 8px 0;" border v-model="form.phone" name="手机号"
          placeholder="手机号" right-icon="phone-o" :rules="[{ required: true, message: '请填写手机号' }]">
          <template #label>
            <van-field class="pd0" :label="form.phoneCode + '+'" v-model="form.phoneCode" input-align="top"
              right-icon="arrow-down" />
          </template>
        </van-field>
      </div>

      <div style="margin-top:28px;" class="mg16">
        <van-button square block type="primary" loading-type="circular" loading-size="24px" loading-text="发送验证码"
          :loading="loading" native-type="submit">
          发送验证码
        </van-button>
      </div>
    </van-form>


    <van-picker title="标题" :columns="columns" @confirm="onConfirm" @cancel="onCancel" @change="onChange" />
  </div>
</template>

<script lang="ts" setup name="LoginPage">
import router from '@/router';
import { reactive, ref } from 'vue';
import { useToggle } from '@vant/use';
import { PickerConfirmEventParams, showToast } from 'vant';
// import { useUserStore } from '@/store/modules/user';

// const userStore = useUserStore();
let form = reactive({
  phone: '',
  phoneCode: '18'
})
const ruleForm = ref<any>(null);

const [loading, loadingToggle] = useToggle();

const columns = [
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
];

const onConfirm = ({ selectedValues }: PickerConfirmEventParams) => {
  showToast(`当前值: ${selectedValues.join(',')}`);
};
const onChange = ({ selectedValues }: PickerConfirmEventParams) => {
  showToast(`当前值: ${selectedValues.join(',')}`);
};
const onCancel = () => showToast('取消');

const onSubmit = () => {
  loadingToggle(true)
  ruleForm.value.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      const userInfo = await userStore.login();
      if (userInfo) {
        router.push({ path: '/home' });
      }
    } else {
      console.log('error submit!!', errors);
    }
    loadingToggle(false)
  });
};
</script>

<style scoped lang="less">
.login {
  // padding: 20px;

  .text-color {
    color: v-bind(color);
    font-size: 43px
  }

  .header {
    margin: 70px 0 40px;
  }

  .title1 {
    color: #05917F;
    font-size: 24px;
  }

  .title2 {
    font-size: 20px;
    margin: 30px 0 70px;
  }

  /deep/ .van-button {
    border-radius: 6px;
    font-size: 18px;
  }

}
</style>
