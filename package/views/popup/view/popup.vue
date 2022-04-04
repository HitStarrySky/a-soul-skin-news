<template>
  <header class="popup-title">
    <div class="popup-cover">
      <img src="../../../public/Carol/gif/11.gif" alt="" />
    </div>
    <div class="popup-user">
      <img
        src="../../../public/Carol/gif/7.gif"
        alt="avatar"
        class="popup-user-avatar"
      />
      <span class="popup-user-name">a-soul</span>
    </div>
  </header>
  <main class="popup-main"></main>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../hook/store';
export default defineComponent({
  name: 'PopupView',
  setup() {
    const store = useStore();
    return {
      store
    };
  }
});
</script>
