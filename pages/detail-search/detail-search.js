// pages/detail-search/detail-search.js
import { getSearchHot } from "../../services/search";

Page({
  data: {
    searchValue: "",
    hotSearchData: [],
    associationData: [],
  },

  onLoad() {
    this.feachSearchHot();
  },

  async feachSearchHot() {
    const res = await getSearchHot();
    this.setData({
      hotSearchData: res.result.hots,
    });
  },

  // 热门关键词触摸事件
  onSearchHotTouch(e) {
    const keyword = e._relatedInfo.anchorRelatedText.trim();
    wx.navigateTo({
      url: `/pages/main-search/main-search?keyword=${keyword}`,
    });
  },
});
