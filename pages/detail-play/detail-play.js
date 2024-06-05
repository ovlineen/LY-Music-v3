// pages/detail-play/detail-play.js
import { getSongDetail } from "../../services/play";

const app = getApp();

Page({
  data: {
    id: 0,
    songData: {},
    statusHeight: 20,
    currentPage: 0,
    currentHeight: 500,
  },

  onLoad(options) {
    const id = options.id;
    this.setData({
      id,
      statusHeight: app.globalData.statusBarHeight,
      currentHeight: app.globalData.currentHeight,
    });

    this.feachSongDetail();
  },

  async feachSongDetail() {
    const res = await getSongDetail(this.data.id);
    this.setData({
      songData: res.songs[0],
    });
  },

  // 页面切换事件
  onSwiperChange(e) {
    this.setData({
      currentPage: e.detail.current,
    });
  },
});
