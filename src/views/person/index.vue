<template>
  <headers title="办签人员" :isBack="isBack" />
  <div class="home">
    <div class="person_list">
      <template v-if="personList && personList.length">
        <div class="list" v-for="item in personList">
          <div></div>
        </div>
      </template>
    </div>
    <div class="hint_title">说明</div>
    <div class="btn flex align-middle space-between">
      <!-- <van-button type="primary">禁用状态</van-button>
          <van-button type="success">禁用状态</van-button> -->
      <m-button :status="1" height="48px" color="#6D7278" width="175px" @close="back" title="退出" />
      <m-button :status="2" height="48px" title="添加" width="175px" />
    </div>
    <van-dialog v-model:show="backShow" title="添加确认" className="dia_close" :showConfirmButton="false"
      :showCancelButton="false">
      <div class="txt">添加后，不可修改</div>
      <div class="flex align-middle space-between" style="margin: 20px;">
        <m-button height="48px" width="120px" @close="back" title="确认" />
        <m-button height="48px" title="返回" type="default" width="120px" @click="backShow = false" />
      </div>
    </van-dialog>

  </div>
</template>

<script lang="ts" setup name="person">
import { ref, reactive, defineAsyncComponent } from "vue";
const headers = defineAsyncComponent(() => import('@/components/headers.vue'));
const MButton = defineAsyncComponent(() => import('@/components/button.vue'));
const personList = ref([

])
let isBack = ref(true)
let backShow = ref(false)
const back = () => {
  console.log(111);
  backShow.value = true
}
</script>

<style scoped lang="less">
.person_list {
  min-height: 70vh;
}

.home {
  padding: 24px;

  .hint_title {
    font-size: 18px;
  }

  .btn {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 24px
  }
}

/deep/ .dia_close {
  .txt {
    text-align: center;
    font-size: 16px;
    margin: 20px 20px 30px
  }

  .van-dialog__header {
    font-size: 18px;
  }
}
</style>