<template>
   <div class="home text-center">
        <headers title="办签人员"/>
        123
   </div>
  </template>
  
  <script lang="ts" setup name="person">
    import { ref, reactive,defineAsyncComponent } from "vue";
    const headers = defineAsyncComponent(() => import('/@/components/headers.vue'));
  </script>
  
  <style scoped lang="less">

  </style>
  