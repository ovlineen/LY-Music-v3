// pages/main-search/main-search.js
import { getSearchKeyword } from "../../services/search";
Page({
  data: {
    keyword: "",
    active: 0,
    songs: [],
    videos: [],
    videosOffest: "",
    videoHasMore: true,
    type: "1",
  },

  onLoad(options) {
    const keyword = options.keyword;
    this.setData({
      keyword,
    });

    // 发送网络请求
    this.feachSearchKeyword();
  },

  // 请求抽离
  async feachSearchKeyword() {
    const res = await getSearchKeyword(this.data.keyword, this.data.type);

    if (this.data.type == 1) {
      this.setData({
        songs: res.result.songs,
      });
    } else if (this.data.type == 1000) {
      console.log(res);
    } else if (this.data.type == 1014) {
      const res = await getSearchKeyword(
        this.data.keyword,
        this.data.type,
        this.data.videosOffest,
        10
      );

      const newVideos = [...this.data.videos, ...res.result.videos];
      this.setData({ videos: newVideos });
      this.data.videosOffest = this.data.videos.length;
      this.data.videoHasMore = res.result.hasMore;
    }
  },

  // tab 标签事件
  onTabTouch(e) {
    const type = e.detail.name;
    this.setData({ type });
    this.feachSearchKeyword();
  },

  // 视频点击事件
  onVideoItemTouch(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail-video/detail-video?id=${id}`,
    });
  },

  onVideoMoreTouch() {
    if (this.data.videoHasMore) {
      this.feachSearchKeyword();
    } else {
      wx.showToast({
        title: "没有更多数据",
        icon: "error",
        duration: "1500",
      });
    }
  },
});
