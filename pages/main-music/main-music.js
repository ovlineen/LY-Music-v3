// pages/main-music/main-music.js
Page({
  data: {},

  // 页面触摸事件
  onSearchTouch() {
    wx.navigateTo({
      url: "/pages/detail-search/detail-search",
    });
  },
});
