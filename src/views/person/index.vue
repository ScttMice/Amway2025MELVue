<template>
  <div class="home">
    <van-nav-bar title="办签人员" fixed placeholder />
    <div class="content">
      <div class="person_list">
        <template v-if="personList && personList.length">
          <div class="list" v-for="item in personList">
            <div class="title flex align-middle space-between">
              <div class="name">{{ item.brName }}</div>
              <div>{{ item.trTypeName }}</div>
            </div>
            <!--  v-if="item.trVisas !== 2 && item.trVisas !== 3" -->
            <van-cell title="签证信息表" is-link @click="iframeClick(item.brid, item.trid)">
              <template #value>
                <span :style="{ 'color': order_status[item.trVisainfoStatus] }">{{ item.trVisainfoStatusName }}</span>
              </template>
            </van-cell>
            <!-- item.trVisainfoStatus == 3 || item.trVisas == 2 -->
            <van-cell title="证件材料" is-link @click="upClick(item.trid)"  v-if="item.trVisainfoStatus == 3">
              <template #value>
                <span :style="{ 'color': order_status[item.trPickupStatus] }">{{ item.trPickupStatusName }}</span>
              </template>
            </van-cell>
            <van-cell title="办理状态" v-if="item.trPickupStatus == 3">
              <template #value>
                <span :style="{ 'color': order_status2[item.trVisaResult] }">{{ item.trVisaStepStatusName }}</span>
              </template>
            </van-cell>
            <van-cell title="签证下载" v-if="item.trPickupStatus == 3">
              <template #value>
                <span style="color:#0486FE" v-if="item.trVisaResult == 5" @click="upLoad(item.visaFile)"
                  class="flex align-middle justify-end"><img src="../../assets/image/word.png" alt="">
                  <div style="line-height: 24px;">下载</div>
                </span>
                <span v-else>出签后可下载</span>
              </template>
            </van-cell>
          </div>
        </template>
      </div>
      <div class="hint_title">说明</div>
      <!-- <div style="height: 72px;"></div>
      <div class="btn flex align-middle space-between" style="background-color: #fff;">
        <m-button :status="1" color="#6D7278" width="45%" @close="back" title="退出" />
        <m-button :status="2" title="添加" @close="addClick" width="45%" />
      </div> -->
      <!-- 退出 -->
      <van-dialog v-model:show="backShow" className="dia_close" :showConfirmButton="false" :showCancelButton="false">

        <div class="txt">确认退出当前账号？</div>
        <div class="flex align-middle space-between" style="margin: 24px">
          <m-button width="45%" @close="confirm" title="确认" />
          <m-button title="返回" type="default" width="45%" @click="showToggle(false)" />
        </div>
      </van-dialog>
      <addPersonDia ref="addPerson" @refresh="getList" />
    </div>
  </div>
</template>

<script lang="ts" setup name="person">
import { ref, defineAsyncComponent, onBeforeMount } from "vue";
import { useToggle } from '@vant/use';
import { useRouter } from 'vue-router';
import { getPersonList } from '@/api/user'
import { removeLocalStorage } from '@/utils/storage'
const router = useRouter();
const addPersonDia = defineAsyncComponent(() => import('@/components/addPerson.vue'));
const MButton = defineAsyncComponent(() => import('@/components/button.vue'));
const personList = ref([] as EmptyArrayType)
let order_status = {
  1: "#FA6401",
  2: "#FF0000",
  3: "#4CAF50",
} as EmptyObjectType
let order_status2 = {
  1:"#6D7278",
  2: "#FA6401",
  3: "#0486FE",
  4: "#E02020",
  5: "#4CAF50"
} as EmptyObjectType
const [backShow, showToggle] = useToggle(false);

// 退出
// const back = () => {
//   showToggle(true)
// }
// 确认退出
const confirm = () => {
  showToggle(false)
  removeLocalStorage('anliMelToken')
  router.push({ name: 'login' })
}
// 新增人员
let addPerson = ref()
// const addClick = () => {
//   addPerson.value.openDialog()
// }
// 请求数据列表
const getList = () => {
  getPersonList().then(res => {
    if (res.code == 0) {
      personList.value = res.data
    }
  })
}
// 签证
const iframeClick = (brid: string, trid: string) => {
  window.open(`https://e.mmice.com.cn/visa_info/transit.aspx?cid=18&gid=112&type=2&brid=${brid}&trid=${trid}&backurl=${window.location.href}`)
}
// 上传材料
const upClick = (id: number) => {
  router.push({ name: 'uploadCertificate', params: { id: id } })
}
// 下载文件
const upLoad = (url: string) => { //直接将地址传进来即可
  const x = new window.XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob'; //转换返回的格式
  x.onload = () => {
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = url;
    a.click();
  };
  x.send();
}

onBeforeMount(() => {
  getList()
})
</script>

<style scoped lang="less">
.person_list {
  // min-height: 70vh;
  font-size: 18px;
  overflow-y: auto;
  .list {
    width: 100%;
    border: 1px solid rgba(5, 145, 127, .3);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-bottom: 30px;

    .title {
      padding: 13px 24px;
      line-height: 24px;
      background-color: rgba(5, 145, 127, .3);
      color: #5e5e5e;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      margin-bottom: 16px;

      .name {
        font-weight: bold;
        color: #000;
      }
    }

    :deep(.van-cell) {
      margin-bottom: 24px;
      font-size: 18px;
      color: #5e5e5e;
      padding: 20px 24px;

      &:last-child {
        margin-bottom: 0
      }
    }
  }
}

.home {
  .content {
    padding: 30px 24px;
    // height: calc(100vh - 120px);
    // overflow-y: auto
  }

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

:deep(.dia_close) {
  .txt {
    text-align: center;
    font-size: 16px;
    margin: 40px 24px 60px
  }

  .van-dialog__header {
    font-size: 18px;
  }
}

:deep(.van-nav-bar .van-nav-bar__title) {
  color: #fff;
}
</style>