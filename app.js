// app.js
App({
  globalData: {
    statusBarHeight: 20,
    currentHeight: 500,
  },

  onLaunch() {
    const windowInfo = wx.getWindowInfo();
    this.globalData.statusBarHeight = windowInfo.statusBarHeight;
    this.globalData.currentHeight =
      windowInfo.screenHeight - this.globalData.statusBarHeight - 44;
  },
});
