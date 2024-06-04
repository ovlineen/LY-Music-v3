// pages/detial-song/detail-song.js
import recomendStore from "../../stores/recommendStore";
Page({
  data: {
    title: "热歌榜",
    recommendData: [],
  },

  onLoad(options) {
    const type = options.type;
    if (type == "recommend") {
      recomendStore.onState("recommendData", this.handleRecommend);
    }

    wx.setNavigationBarTitle({
      title: this.data.title,
    });
  },

  handleRecommend(value) {
    this.setData({
      recommendData: value,
    });
  },
});
