<template>
    <div class="header_content">
        <div class="navHeader flex align-middle space-between">
            <div>
                <img v-if="isBack" @click="goBack" src="../assets/image/left.png" alt="">
            </div>
            <div>
                <div v-if="title">{{ title }}</div>
            </div>
            <div></div>
        </div>
    </div>
   </template>
   
   <script lang="ts" setup>
   import { ref } from "vue";
   import { useRouter } from 'vue-router';
    const router = useRouter();
    const props = defineProps({
        // 列表内容
        isBack: {
            type: Boolean ,
            default: true, 
        },
        title: {
            type: String,
            default: '',
        }
    });
    const goBack = () => {
        router.go(-1)
    }
   </script>
   
   <style scoped lang="less">
        .header_content {
            width: 100%;
            background-color: #05917F;
            height: 50px;
            color: #fff;
            font-size: 18px;
            padding: 7px 12px;
            height: 50px;
            box-sizing: border-box;
            font-weight: bold;
            div {
                height: 32px;
                line-height: 32px;
            }
        }
   </style>
   