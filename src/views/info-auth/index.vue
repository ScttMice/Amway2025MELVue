<template>
    <div class="page" @scroll="onScroll" style="background-color: #EFEFEF">
        <div class="page-header">
            <van-nav-bar placeholder fixed title="信息授权" :border="false" />
        </div>

        <div class="page-body" style="padding-bottom: 132px;">

        </div>

        <div class="page-footer pd24">
            <div class="mg-b20">
                <van-checkbox style="line-height: 36px;" icon-size="16px" shape="square" v-model="checked">
                    <!-- <van-checkbox :disabled="soll < 200" style="line-height: 36px;" icon-size="16px" shape="square"
                        v-model="checked"> -->
                    <span class="font14" style="vertical-align: middle;">我已经阅读并同意以上授权</span>
                </van-checkbox>
            </div>
            <van-button @click="toNext" block type="primary" loading-type="circular" loading-size="24px"
                :disabled="!checked">
                下一步
            </van-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { putStatement } from "@/api/user";
import { showToast } from 'vant';
const router = useRouter();
// const soll = ref<number>(0);
const checked = ref<boolean>(false);

const onScroll = (e: Event) => {
    console.log(e);
}

const toNext = () => {
    putStatement().then(res => {
        if(res.code == 0) {
            router.push({
                name: 'person'
            })
        }else {
            showToast(res.message)
        }
    }) 
}
</script>

<style scoped lang="less"></style>