<template>
    <div class="header_content">
        <div class="navHeader">
            <img v-if="isBack" src="../assets/image/left.png" alt="">
            <div v-if="title">{{ title }}</div>
        </div>
    </div>
   </template>
   
   <script lang="ts" setup>
   import { ref, reactive,defineAsyncComponent } from "vue";
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
   </script>
   
   <style scoped lang="less">
 
   </style>
   