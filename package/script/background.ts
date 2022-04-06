import { createNotifications, getChromeUrl, getStoreKey } from '../libs/chrome';
import { UUID } from '../libs/utils';
import { LiveBroadcastUid } from '../views/popup/config/const';
import { VideoInfo } from '../views/popup/type';
const notice = (user = 'Diana') => {
  createNotifications(UUID(), {
    type: 'basic',
    title: 'A-SOUL',
    iconUrl: getChromeUrl(`assets/${user}.png`),
    message: `${user}有新动态了，快去看看吧`
  });
};
chrome.alarms.create('notice', {
  periodInMinutes: 60
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'notice') {
    const { Ava, Diana, Carol, Eileen, Bella } = await getStoreKey([
      'aSoulSkin',
      'Ava',
      'Diana',
      'Carol',
      'Eileen',
      'Bella'
    ]);
    const ava = await isHaveNews(LiveBroadcastUid.Ava, Ava);
    const diana = await isHaveNews(LiveBroadcastUid.Diana, Diana);
    const carol = await isHaveNews(LiveBroadcastUid.Carol, Carol);
    const eileen = await isHaveNews(LiveBroadcastUid.Eileen, Eileen);
    const bella = await isHaveNews(LiveBroadcastUid.Bella, Bella);
    if (!ava) notice('Ava');
    if (!diana) notice('Diana');
    if (!carol) notice('Carol');
    if (!eileen) notice('Eileen');
    if (!bella) notice('Bella');
  }
});

/**
 * 新消息
 * @param uid
 * @param aid
 * @returns
 */
function isHaveNews(uid: string, aid: number) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.bilibili.com/x/space/arc/search?mid=${uid}&pn=1&ps=10&index=1&jsonp=jsonp`,
      {
        headers: { 'cache-control': 'no-cache' }
      }
    )
      .then((res) => res.json())
      .then(({ data }) => {
        const isNew = data.list.vlist.some((x: VideoInfo) => x.aid === aid);
        resolve(isNew);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
