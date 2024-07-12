<template>
  <div class="home">
    <van-nav-bar title="办签人员" fixed placeholder />
    <div class="content">
      <div class="person_list">
        <template v-if="personList && personList.length">
          <div class="list" v-for="item in personList">
            <div class="title flex align-middle space-between">
              <div class="name">{{ item.name }}</div>
              <div>{{ item.type }}</div>
            </div>
            <van-cell title="签证信息表" is-link @click="iframeClick(item.brid, item.trid)">
              <template #value>
                <span :style="{ 'color': order_status[item.tr1] }">{{ item.tr1N }}</span>
              </template>
            </van-cell>
            <van-cell title="证件材料" is-link @click="upClick(item.id)">
              <template #value>
                <span :style="{ 'color': order_status[item.tr2] }">{{ item.tr2N }}</span>
              </template>
            </van-cell>
            <van-cell title="办理状态">
              <template #value>
                <span :style="{ 'color': order_status2[item.tr3] }">{{ item.tr3N }}</span>
              </template>
            </van-cell>
            <van-cell title="签证下载">
              <template #value>
                <span style="color:#0486FE" v-if="item.tr3 == 4" class="flex align-middle justify-end"><img
                    src="../../assets/image/word.png" alt="">
                  <div style="line-height: 24px;">下载</div>
                </span>
              </template>
            </van-cell>
          </div>
        </template>
      </div>
      <div class="hint_title">说明</div>
      <div class="btn flex align-middle space-between">
        <m-button :status="1" height="48px" color="#6D7278" width="175px" @close="back" title="退出" />
        <m-button :status="2" height="48px" title="添加" @close="addClick" width="175px" />
      </div>
      <!-- 退出 -->
      <van-dialog v-model:show="backShow" className="dia_close" :showConfirmButton="false" :showCancelButton="false">

        <div class="txt">确认退出当前账号？</div>
        <div class="flex align-middle space-between" style="margin: 24px;">
          <m-button height="48px" width="120px" @close="confirm" title="确认" />
          <m-button height="48px" title="返回" type="default" width="120px" @click="showToggle(false)" />
        </div>
      </van-dialog>
      <addPersonDia ref="addPerson" @refresh="getPersonList" />
    </div>
  </div>
</template>

<script lang="ts" setup name="person">
import { ref, reactive, defineAsyncComponent } from "vue";
import { useToggle } from '@vant/use';
import { useRouter } from 'vue-router';
const router = useRouter();
const addPersonDia = defineAsyncComponent(() => import('@/components/addPerson.vue'));
const MButton = defineAsyncComponent(() => import('@/components/button.vue'));
const personList = ref([
  {
    name: '张先生',
    type: '经销商',
    tr1: 1,
    tr1N: '未填写',
    tr2: 1,
    tr2N: '未上传',
    tr3: 0,
    tr3N: '',
    id: '2222',
    brid: '112',
    trid: '666'
  },
  {
    name: '张小姐',
    type: '家属',
    tr1: 2,
    tr1N: '未完成填写',
    tr2: 2,
    tr2N: '缺件',
    tr3: 0,
    tr3N: '',
    brid: '888',
    trid: '555',
    id: '3333'
  },
])
let order_status = {
  1: "#FA6401",
  2: "#FF0000",
  3: "#4CAF50",
} as any
let order_status2 = {
  1: "#FA6401",
  2: "#0486FE",
  3: "#6D7278",
  4: "#4CAF50"
} as any
const [backShow, showToggle] = useToggle(false);

// 退出
const back = () => {
  showToggle(true)
}
// 确认退出
const confirm = () => {
  showToggle(false)
}
// 新增人员
let addPerson = ref()
const addClick = () => {
  addPerson.value.openDialog()
}
// 请求数据列表
const getPersonList = () => {
  alert('需要刷新页面')
}
// 签证
const iframeClick = (brid: string, trid: string) => {
  window.open(`https://e.mmice.com.cn/visa_info/transit.aspx?cid=31&gid=99&type=2&brid=${brid}&trid=${trid}&backurl=${window.location.href}`)
}
// 上传材料
const upClick = (id: string) => {
  router.push({ name: 'uploadCertificate', params: { id: id } })
}

</script>

<style scoped lang="less">
.person_list {
  min-height: 70vh;
  font-size: 18px;

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
    height: calc(100vh - 120px);
    overflow-y: auto
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