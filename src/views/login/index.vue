<template>
  <div class="login home text-center">
    <header class="header" style="width: 100%; text-align: center">
      <img alt="" src="@/assets/logo.png" />
    </header>

    <strong class="title1">澳大利亚签证办理</strong>

    <p class="title2">安利2025墨尔本专案</p>

    <van-form @submit="onSubmit" ref="loginForm">
      <div class="form-item mg-r-l-16 text-left">
        <label class="mg-b16 font14 color-rgb94" style="display: inline-block;">手机号码</label>
        <van-field class="border-bottom1" type="tel" style="padding:0 0 8px 0;" border v-model="form.phone" name="手机号"
          placeholder="手机号" right-icon="phone-o"
          :rules="[{ required: true, message: '请填写手机号' }, { validator, message: '手机格式不正确' }]">
          <template #label>
            <van-field @click="showPickerToggle(true)" readonly class="pd0 font14" v-model="activeCode"
              input-align="top" right-icon="arrow-down" />
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

    <div class="login-tips mg-r-l-16 ">
      <div class="login-tips-item flex">
        <label>开放时间：</label>
        <p>2024年9月30日至12月30日</p>
      </div>
      <div class="login-tips-item flex">
        <label>服务电话：</label>
        <p>021-00000000</p>
      </div>
      <div class="login-tips-item flex">
        <label>服务时间：</label>
        <p>周一至周五09:30-18:00 (国定节假日除外)</p>
      </div>
    </div>

    <div class="login-footer text-center">
      <unline-text size="14px" color="#333333">登录遇到问题?</unline-text>
    </div>

    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker v-model="form.phoneCode" :columns-field-names="{ value: 'id' }" :columns="columns"
        @confirm="onConfirm" @cancel="showPickerToggle(false)">
      </van-picker>
    </van-popup>
  </div>
</template>

<script lang="ts" setup name="LoginPage">
import { reactive, ref, computed } from 'vue';
import { useToggle } from '@vant/use';
import { FormInstance, PickerConfirmEventParams, PickerOption } from 'vant';
import country from "@/json/country.json";
import { type LoginData } from "@/api/user";
import validate from "@/utils/ys-validate";
// import { useUserStore } from '@/store/modules/user';

// const userStore = useUserStore();
type LoginForm = {
  phoneCode: number[]
} & Omit<LoginData, 'phoneCode'>

const loginForm = ref<FormInstance>();

const [loading, loadingToggle] = useToggle();
const [showPicker, showPickerToggle] = useToggle(false);

const form = reactive<LoginForm>({
  phone: '',
  phoneCode: [86]
})

const columns: PickerOption[] = country.map(item => ({
  ...item,
  text: item.name + ' + ' + item.id
}));


const activeCode = computed(() => '+ ' + form.phoneCode[0]);

const validator = () => validate.isAllPhone(form.phone, form.phoneCode[0]);

const onConfirm = ({ selectedValues }: PickerConfirmEventParams) => {
  form.phoneCode = selectedValues as number[];
  showPickerToggle(false)
};

const onSubmit = async () => {
  await loginForm.value?.validate();
  loadingToggle(true)
  try {

  } finally {
    setTimeout(() => {
      loadingToggle(false)
    }, 3000)
    // loadingToggle(false)
  }

};
</script>

<style scoped lang="less">
.login {
  // padding: 20px;

  .header {
    margin: 70px 0 40px;
  }


  &-tips {
    margin-top: 40px;
    font-size: 16px;
    color: rgb(94, 94, 94);

    &-item {
      margin-bottom: 4px;
    }
  }

  &-footer {
    margin-top: 177px;
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
