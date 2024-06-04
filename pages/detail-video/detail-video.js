// pages/detail-video/detail-video.js
import { getMvURL, getDetail } from "../../services/video";

Page({
  data: {
    id: "",
    mvURL: "",
    mvDetailData: {},
  },

  onLoad(options) {
    const id = options.id;
    this.data.id = id;

    // 发送请求
    this.feachMvURL();
    this.feachMvDetail();
  },

  async feachMvURL() {
    const res = await getMvURL(this.data.id);
    this.setData({
      mvURL: res.data.url,
    });
  },

  async feachMvDetail() {
    const res = await getDetail(this.data.id);
    this.setData({
      mvDetailData: res.data,
    });
  },
});
