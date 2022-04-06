<template>
  <header class="popup-title">
    <div class="popup-cover">
      <img :src="cover" alt="cover" />
    </div>
    <div v-if="!userInfoLoading" class="popup-user">
      <img :src="info.user.avatar" alt="avatar" class="popup-user-avatar" />
      <svg
        t="1649167470854"
        class="popup-user-switch"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1352"
        @click="handleSwitch"
      >
        <path
          d="M320.945 179.846H825.1c48.077 0 80.562 22.09 98.752 58.472 9.097 19.491 12.995 40.28 12.995 54.574l-1.3 7.796-83.16 292.357c-3.898 15.593-19.49 23.39-35.082 19.49-15.593-3.897-23.39-19.49-19.49-35.083l83.159-292.357-1.3 7.796c0-6.497-1.3-18.191-6.497-28.586-7.796-16.892-22.089-25.987-46.778-25.987H317.046l40.281 40.28c11.694 11.694 11.694 29.886 0 40.28-11.694 11.695-29.885 11.695-40.281 0l-87.057-87.057c-11.695-11.695-11.695-29.885 0-40.281l87.057-88.357c11.694-11.695 29.886-11.695 40.281 0 11.694 11.694 11.694 29.886 0 40.28l-36.382 36.383zM713.636 840.154H209.479c-48.077 0-80.561-22.089-98.752-58.472-9.095-19.49-12.994-40.28-12.994-54.573l1.3-7.795 83.16-292.359c3.897-15.593 19.49-23.389 35.083-19.491 15.592 3.898 23.388 19.491 19.49 35.083l-81.861 292.357 1.3-7.796c0 6.497 1.299 18.191 6.497 28.586 7.796 16.892 22.089 25.987 46.777 25.987h509.354l-40.281-40.28c-11.694-11.693-11.694-29.886 0-40.28 11.693-11.693 29.886-11.693 40.281 0l87.057 87.058c11.694 11.693 11.694 29.886 0 40.281l-88.356 88.356c-11.695 11.693-29.886 11.693-40.281 0-11.693-11.694-11.693-29.885 0-40.28l36.383-36.382z"
          fill="#808080"
          p-id="1353"
        ></path>
        <path
          d="M426.094 632.331c-16.568 0-30-13.432-30-30V349.845c0-16.568 13.432-30 30-30s30 13.432 30 30v252.486c0 16.568-13.432 30-30 30zM552.588 632.331c-16.568 0-30-13.432-30-30V437.84c0-16.568 13.432-30 30-30s30 13.432 30 30v164.491c0 16.568-13.432 30-30 30zM679.082 632.331c-16.568 0-30-13.432-30-30v-91.994c0-16.568 13.432-30 30-30s30 13.432 30 30v91.994c0 16.568-13.432 30-30 30z"
          fill="#33DEB4"
          opacity=".4"
          p-id="1354"
        ></path>
        <path
          d="M386.094 672.331c-16.568 0-30-13.432-30-30V389.845c0-16.568 13.432-30 30-30s30 13.432 30 30v252.486c0 16.568-13.431 30-30 30zM512.588 672.331c-16.568 0-30-13.432-30-30V477.84c0-16.568 13.432-30 30-30s30 13.432 30 30v164.491c0 16.568-13.432 30-30 30zM639.082 672.331c-16.568 0-30-13.432-30-30v-91.994c0-16.568 13.432-30 30-30s30 13.432 30 30v91.994c0 16.568-13.432 30-30 30z"
          fill="#33DEB4"
          p-id="1355"
        ></path>
      </svg>
      <div class="popup-user-info">
        <span class="popup-user-name">{{ info.user.name }}</span>
        <span class="popup-user-fans">{{ info.user.fans }}</span>
      </div>
      <div class="popup-user-sign">
        {{ info.user.sign }}
      </div>
    </div>
  </header>
  <div v-if="!videoLoading" class="popup-main-title">动态</div>
  <main v-if="!videoLoading" class="popup-main">
    <div class="popup-content">
      <div
        v-for="item in videoList"
        :key="item.aid"
        class="popup-article"
        @click="handleClick(item)"
      >
        <div class="popup-article-cover">
          <img :src="item.pic" alt="cover" />
          <span class="popup-article-time">{{ item.length }}</span>
        </div>
        <div class="popup-article-title">{{ item.title }}</div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { LiveBroadcastUid } from '../config/const';
import type { LiveBroadcastInfo, Skin, VideoInfo } from '../type';
import images from '../config/image';
import { setStore, getStoreKey } from '../../../libs/chrome';
export default defineComponent({
  name: 'PopupView',
  setup() {
    const info = reactive<LiveBroadcastInfo>({
      theme: {
        skin: 'Diana'
      },
      user: {
        avatar: '',
        name: '',
        sign: '',
        fans: 0
      }
    });

    const videoList = ref<VideoInfo[]>([]);
    const uid = computed(() => {
      return LiveBroadcastUid[info.theme.skin];
    });

    const cover = computed(() => {
      const list = images[info.theme.skin];
      const index = Math.floor(Math.random() * list.length);
      return list[index];
    });
    const handleSwitch = () => {
      const list: Skin[] = ['Ava', 'Carol', 'Diana', 'Eileen', 'Bella'];
      const index = list.findIndex((x) => info.theme.skin === x) + 1;
      info.theme.skin = list[index > list.length - 1 ? 0 : index];
      setStore({ aSoulSkin: info.theme.skin });
      handleQuery();
    };

    /**
     * 跳转的视频地址
     * @param item
     */
    const handleClick = (item: VideoInfo) => {
      window.open(`https://www.bilibili.com/video/${item.bvid}`);
    };
    const userInfoLoading = ref(true);
    const videoLoading = ref(true);
    const handleQuery = () => {
      userInfoLoading.value = true;
      getVideoList();
      fetch(`https://api.bilibili.com/x/web-interface/card?mid=${uid.value}`, {
        headers: { 'cache-control': 'no-cache' }
      })
        .then((res) => res.json())
        .then(({ data }) => {
          info.user.avatar = data.card.face;
          info.user.name = data.card.name;
          info.user.fans = data.card.fans;
          info.user.sign = data.card.sign;
        })
        .finally(() => {
          userInfoLoading.value = false;
        });
    };

    const getVideoList = () => {
      videoLoading.value = true;
      fetch(
        `https://api.bilibili.com/x/space/arc/search?mid=${uid.value}&pn=1&ps=10&index=1&jsonp=jsonp`,
        {
          headers: { 'cache-control': 'no-cache' }
        }
      )
        .then((res) => res.json())
        .then(({ data }) => {
          videoList.value = data.list.vlist;
        })
        .finally(() => {
          videoLoading.value = false;
        });
    };
    onMounted(async () => {
      const { aSoulSkin } = await getStoreKey(['aSoulSkin']);
      info.theme.skin = aSoulSkin || 'Diana';
      handleQuery();
    });
    return {
      info,
      cover,
      handleSwitch,
      userInfoLoading,
      videoLoading,
      videoList,
      handleClick
    };
  }
});
</script>
