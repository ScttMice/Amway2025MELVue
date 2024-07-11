<template>
  <div class="wrapper">
    <van-config-provider>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </van-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const routr = useRoute();
    console.log("🚀 ~ setup ~ routr:", routr)
    // const showFooter = computed(() => routr.path.split('/').length < 3);
    // return {
    //   showFooter,
    // };
  },
});
</script>
