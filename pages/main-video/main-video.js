// pages/main-video/main-video.js
import { getTopMv } from "../../services/video"; // 更正服务名称
Page({
  data: {
    mvInfoData: [],
    mvOffset: 0,
    hasMore: true,
  },

  onLoad() {
    this.fetchMvInfo();
  },

  async fetchMvInfo() {
    if (!this.data.hasMore) return;
    const res = await getTopMv(this.data.mvOffset);
    const newMvInfoData = [...this.data.mvInfoData, ...res.data];

    this.setData({
      mvInfoData: newMvInfoData,
    });

    this.data.mvOffset = this.data.mvInfoData.length;
    this.data.hasMore = res.hasMore;
  },

  onReachBottom() {
    this.fetchMvInfo();
  },
});
