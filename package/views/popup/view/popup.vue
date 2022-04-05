<template>
  <header class="popup-title">
    <div class="popup-cover">
      <img :src="bg" alt="cover" />
    </div>
    <div class="popup-user">
      <img :src="avatar" alt="avatar" class="popup-user-avatar" />
      <span class="popup-user-name">a-soul</span>
    </div>
  </header>
  <main class="popup-main"></main>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from '../hook/store';
import bg from '../../../public/Carol/gif/13.gif';
export default defineComponent({
  name: 'PopupView',
  setup() {
    const store = useStore();
    const avatar = ref('');
    onMounted(() => {
      fetch(
        `https://api.bilibili.com/x/space/acc/info?mid=${store.theme.mid}`,
        {
          headers: { 'cache-control': 'no-cache' }
        }
      )
        .then((res) => res.json())
        .then((data) => {
          avatar.value = data.data.face;
          console.log(data);
        });
    });
    return {
      store,
      avatar,
      bg
    };
  }
});
</script>
