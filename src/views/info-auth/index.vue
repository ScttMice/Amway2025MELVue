<template>
    <div class="page" @scroll="onScroll" style="background-color: #EFEFEF">
        <div class="page-header">
            <van-nav-bar placeholder fixed title="信息授权" :border="false" />
        </div>

        <div class="page-body" style="padding-bottom: 132px;">

        </div>

        <div class="page-footer pd24">
            <div class="mg-b20">
                <van-checkbox :disabled="soll < 200" style="line-height: 36px;" icon-size="16px" shape="square"
                    v-model="checked">
                    <span class="font14" style="vertical-align: middle;">我已经阅读并同意以上授权</span>
                </van-checkbox>
            </div>
            <van-button block type="primary" loading-type="circular" loading-size="24px" :disabled="!checked">
                下一步
            </van-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";


const soll = ref<number>(0);
const checked = ref<boolean>(false);


const onScroll = (e: Event) => {
    console.log(e);
}
</script>

<style scoped lang="less"></style>